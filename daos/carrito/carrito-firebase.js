const {carrito : Carrito} = require('../../contenedores/firebase-carrito.js');

class CarritoDAO extends Carrito{
    constructor(){
        super();
    }
}

module.exports ={carrito: CarritoDAO};