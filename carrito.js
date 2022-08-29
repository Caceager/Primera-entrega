const express = require('express');
const cartRouter = express.Router();
const {carrito} = require('./daos/main.js');


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

console.log()
cartRouter.post('/', middleWareAutentication, async (req, res)=>{
   res.send(`ID del carrito creado: ${await carrito.createCart()}`);
});

cartRouter.post('/:id/productos/:idProd', middleWareAutentication, async (req, res)=>{
    try{
        await carrito.addToCart(req.params.id, req.params.idProd);
        res.send({Success: 'Producto agregado al carrito.'});
    }
    catch(e){
        if(e == 'ProductIdNotFound') res.send({Error: 'ID del producto no encontrada.'})
        else if(e == 'CartIdNotFound') res.send({Error: 'ID del carrito no encontrada.'})
        else res.send(e);
    }

});

cartRouter.get('/:id/productos', middleWareAutentication, async (req, res) =>{
    try{
        res.send(await carrito.viewCart(req.params.id));
    }
    catch(e){
        if(e == 'CartIdNotFound') res.send({Error: 'ID del carrito no encontrada.'});
        else res.send({Error: 'Se ha producido un error.'});
    }
});

cartRouter.delete('/:id', middleWareAutentication, async (req, res) =>{
   try{
       await carrito.deleteCart(req.params.id);
       res.send({Success: 'Carrito eliminado.'});
   }
   catch(e){
       if(e == 'CartIdNotFound') res.send({Error: 'ID del carrito no encontrada.'});
       else res.send(e);
   }

});

cartRouter.delete('/:id/productos/:idProd', middleWareAutentication, async (req, res) =>{
    try{
        await carrito.deleteFromCart(req.params.id, req.params.idProd);
        res.send({Success: 'Producto eliminado del carrito.'});
    }
    catch(e){
        res.send(e);
    }

});

module.exports = cartRouter;
