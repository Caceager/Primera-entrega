const {productos : Productos} = require('../../containers/persistency/mongodb-productos.js');

class ProductosDAO extends Productos{
    constructor(){
        super();
    }

    validateProduct(requestObject) {
        const {nombre, precio, imagen, stock, codigo, descripcion} = requestObject;

        if (!nombre || !precio || !imagen || !stock || !codigo || !descripcion) {
            throw({Error: 'Error en el formato del producto'});
        }
        return requestObject;
    }
}

module.exports ={productos: ProductosDAO};
