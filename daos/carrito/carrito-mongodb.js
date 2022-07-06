const {carrito : Carrito} = require('../../contenedores/mongodb-carrito.js');

class CarritoDAO extends Carrito{
    constructor(){
        super();
    }
}

module.exports ={carrito: CarritoDAO};