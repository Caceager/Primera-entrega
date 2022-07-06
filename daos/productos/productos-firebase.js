const {productos : Productos} = require('../../contenedores/firebase-productos.js');

class ProductosDAO extends Productos{
    constructor(){
        super();
    }
}

module.exports ={productos: ProductosDAO};