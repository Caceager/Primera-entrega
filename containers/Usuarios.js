const CarritoModel = require("../containers/Carrito");
const {usuarios} = require('../daos/main.js');
const communication = require("../server/communication");

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

class UsuarioModel extends usuarios{
    constructor() {
        super();
    }

    async getUserInfo(user) {
        const userData = user._doc;
        if (!userData) throw ({Error: "Informacion de usuario invalida."});
        const personalInfo = {
            username: userData.username,
            nombre: userData.nombre,
            direccion: userData.direccion || "Sin dirección.",
            telefono: userData.telefono || "Sin Telefono.",
            edad: userData.edad,
            urlFoto: userData.urlFoto || "defaultImage.jpg",
            idCarrito: userData.idCarrito,
        }
        const cart = JSON.parse(JSON.stringify(await CarritoModel.viewCart(personalInfo.idCarrito)));
        return {user: personalInfo, cart};

    }

    async checkUsernameExistance(username) {
        return this.exists(username);
    }

    /*
        El carrito del usuario se mantiene, pero se realiza la sumatoria
        del precio final y se vacía. Luego se envía las correspondientes
        notificaciones.
    */
    async comprarCarrito(user) {
        let precio = 0;
        const productos = await CarritoModel.viewCart(user.idCarrito);
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
        try {
            await CarritoModel.emptyCart(user.idCarrito);
        } catch (e) {
            throw(e);
        }
        const productosFormatted = formatProducts(productosParsed);
        try {
            await communication.enviarWhatsappsCompra(user.username, user.telefono, productosFormatted);
        } catch(e) {
            console.log(e);
            throw({ErrorCode: "NotificationError", ErrorMessage: "Error al notificar la compra."});
        }
    }
}

const instanceUsuarios = new UsuarioModel();

module.exports = instanceUsuarios;
