const {carrito : Carrito} = require('../../containers/persistency/mongodb-carrito.js');

class CarritoDAO extends Carrito{
    constructor(){
        super();
    }
}

module.exports ={carrito: CarritoDAO};
