const express = require('express');
const cartRouter = express.Router();
const {carrito : Carrito} = require('./objetos.js');


const middleWareAutentication = (req, res, next) =>{
    req.user ={
        username: 'Usuario',
        isAdmin: true
    };
    next();
}
const middleWareAuth = (req, res, next) =>{
    if (req.user.isAdmin) next();
    else res.status(403).send({Error: 'Acceso denegado.'});
}


const carrito = new Carrito();
console.log()
cartRouter.post('/', middleWareAutentication, (req, res)=>{
   res.send(`ID del carrito creado: ${carrito.createCart()}`);
});

cartRouter.post('/:id/productos/:idProd', middleWareAutentication, (req, res)=>{
    try{
        carrito.addToCart(req.params.id, req.params.idProd);
        res.send({Success: 'Producto agregado al carrito.'});
    }
    catch(e){
        if(e == 'ProductIdNotFound') res.send({Error: 'ID del producto no encontrada.'})
        else if(e == 'CartIdNotFound') res.send({Error: 'ID del carrito no encontrada.'})
        else res.send({Error: 'Se ha producido un error.'});
    }

});

cartRouter.get('/:id/productos', middleWareAutentication, (req, res) =>{
    try{
        res.send(carrito.viewCart(req.params.id));
    }
    catch(e){
        if(e == 'CartIdNotFound') res.send({Error: 'ID del carrito no encontrada.'});
        else res.send({Error: 'Se ha producido un error.'});
    }
});

cartRouter.delete('/:id', middleWareAutentication, (req, res) =>{
   try{
       carrito.deleteCart(req.params.id);
       res.send({Success: 'Carrito eliminado.'});
   }
   catch(e){
       if(e == 'CartIdNotFound') res.send({Error: 'ID del carrito no encontrada.'});
       else res.send({Error: 'Se ha producido un error.'});
   }

});

cartRouter.delete('/:id/productos/:idProd', middleWareAutentication, (req, res) =>{
    try{
        carrito.deleteFromCart(req.params.id, req.params.idProd);
        res.send({Success: 'Producto eliminado del carrito.'});
    }
    catch(e){
        if(e == 'CartIdNotFound') res.send({Error: 'ID del carrito no encontrada.'});
        else if(e =='ProductIdNotFound') res.send({Error: 'ID del producto no encontrada.'});
        else res.send({Error: 'Se ha producido un error.'});
    }

});

module.exports = cartRouter;
