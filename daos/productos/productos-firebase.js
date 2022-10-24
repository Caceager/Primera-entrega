const {productos : Productos} = require('../../containers/persistency/firebase-productos.js');

class ProductosDAO extends Productos{
    constructor(){
        super();
    }
}

module.exports ={productos: ProductosDAO};
