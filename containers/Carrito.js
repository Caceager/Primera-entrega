const {carrito} = require("../daos/main");

class CarritoModel extends carrito{
    constructor() {
        super();
    }
}

const carritoInstance = new CarritoModel();

module.exports = carritoInstance;
