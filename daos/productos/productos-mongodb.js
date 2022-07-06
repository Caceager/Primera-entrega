const {productos : Productos} = require('../../contenedores/mongodb-productos.js');

class ProductosDAO extends Productos{
    constructor(){
        super();
    }
}

module.exports ={productos: ProductosDAO};