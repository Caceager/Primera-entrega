const express = require('express');
const userRouter = express.Router();
const {usuarios : Usuarios} = require('./daos/main.js');
const {productos} = require("./daos/main");
const {carrito} = require("./daos/main");
const LocalStrategy = require("passport-local").Strategy;
const auth = require("./auth/auth");
const { engine } = require('express-handlebars');
const {logueo} = require("./auth/auth");
const communication = require("./communication");

const container = Usuarios;

userRouter.use(auth.sess);
userRouter.use(auth.passportInit.init);
userRouter.use(auth.passportInit.sess);
userRouter.use(express.json());

userRouter.get("/register", (req, res) => {
    if (req.user) return res.redirect("/usuarios/profile");
    res.sendFile(__dirname+"/public/register.html");
});
userRouter.get("/login", (req, res) => {
    if (req.user) return res.redirect("/usuarios/profile");
    res.sendFile(__dirname+"/public/login.html");
});
userRouter.get("/exists", async (req, res) => {
    res.send(await container.exists(req.body.username));
});
userRouter.get("/profile", async (req, res) => {
    if (!req.user) return res.redirect("/usuarios/login");
    const userData = req.user._doc;
    const user = {
        username: userData.username,
        nombre: userData.nombre,
        direccion: userData.direccion || "Sin dirección.",
        telefono: userData.telefono || "Sin Telefono.",
        edad: userData.edad,
        urlFoto: userData.urlFoto || "defaultLink",
        idCarrito: userData.idCarrito,
    }

    const products = JSON.parse(JSON.stringify(await productos.getAll()));
    const cart = JSON.parse(JSON.stringify(await carrito.viewCart(user.idCarrito)));
    res.render('profile.hbs', {'datos': user, 'productos': products, 'carrito': cart, layout: false});
});

function formatProducts(productosParsed) {
    let html = "<h1>Lista de productos</h1>";
    productosParsed.forEach((producto) => {
        let divProducto = "";
        divProducto+= `<hr>`;
        divProducto+= `<p>Producto: ${producto.nombre}</p>`;
        divProducto+= `<p>Id: ${producto.id}</p>`;
        divProducto+= `<p>Precio: ${producto.precio}</p>`;
        divProducto+= `<p>Codigo: ${producto.codigo}</p>`;
        divProducto+= `<hr>`;

        html= html + divProducto;
    });
    return html;
}

userRouter.post('/buyCart', async (req, res) => {
    if (!req.user) return res.send(new Error("Error, el carrito no existe."));
    try {
        let precio = 0;
        const productos = await carrito.viewCart(req.user.idCarrito);
        const productosParsed = productos.map( (producto) => {
            const productoParsed = {
                id: producto.id,
                nombre: producto.nombre,
                precio: producto.precio,
                codigo: producto.codigo,
            };
            precio += productoParsed.precio;
            return productoParsed;
        });

        // console.log(`Se ha realizado una compra.\nIdUsuario: ${req.user.id}\n\nCompras:\n${productos}`);

        await carrito.emptyCart(req.user.idCarrito);
        const productosFormatted = formatProducts(productosParsed);
        await communication.enviarWhatsappsCompra(req.user.username, req.user.telefono, productosFormatted);
        res.sendFile(__dirname+"/public/successBuy.html");
    }
    catch (e) {
        throw e;
    }
});

userRouter.post('/nuevoUsuario', auth.registro);
userRouter.post('/login', auth.logueo);

userRouter.post('/logout', (req, res) => {
    if (!req.user) return res.redirect("/usuarios/login");
    req.user = undefined;
    req.session.destroy();
    res.redirect("/");
});


module.exports = userRouter;