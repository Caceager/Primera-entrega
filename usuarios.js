const express = require('express');
const userRouter = express.Router();
const {usuarios : Usuarios} = require('./daos/main.js');
const {productos} = require("./daos/main");
const {carrito} = require("./daos/main");
const LocalStrategy = require("passport-local").Strategy;
const auth = require("./auth/auth");
const { engine } = require('express-handlebars');
const {logueo} = require("./auth/auth");

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

    console.log(user);
    const products = JSON.parse(JSON.stringify(await productos.getAll()));
    const cart = JSON.parse(JSON.stringify(await carrito.viewCart(user.idCarrito)));
    res.render('profile.hbs', {'datos': user, 'productos': products, 'carrito': cart, layout: false});
});

userRouter.post('/nuevoUsuario', auth.registro, (req, res) => {

});
userRouter.post('/login', auth.logueo);


module.exports = userRouter;