const {productos} = require("../daos/main");

class ProductosModel extends productos{
    constructor() {
        super();
    }
}

const productosInstance = new ProductosModel();

module.exports = productosInstance;
