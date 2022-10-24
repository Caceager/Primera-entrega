const {carrito : Carrito} = require('../../containers/persistency/firebase-carrito.js');

class CarritoDAO extends Carrito{
    constructor(){
        super();
    }
}

module.exports ={carrito: CarritoDAO};
