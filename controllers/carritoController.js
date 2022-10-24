const express = require('express');
const cartRouter = express.Router();
const CarritoModel = require("../containers/Carrito");

cartRouter.post('/', async (req, res)=>{
   res.send(`ID del carrito creado: ${await CarritoModel.createCart()}`);
});

cartRouter.post('/:id/productos/:idProd', async (req, res)=>{
    try{
        await CarritoModel.addToCart(req.params.id, req.params.idProd);
        res.send({Success: 'Producto agregado al carrito.'});
    }
    catch(e){
        if(e === 'ProductIdNotFound') res.send({Error: 'ID del producto no encontrada.'})
        else if(e === 'CartIdNotFound') res.send({Error: 'ID del carrito no encontrada.'})
        else res.send(e);
    }

});

cartRouter.get('/:id/productos', async (req, res) =>{
    try{
        res.send(await CarritoModel.viewCart(req.params.id));
    }
    catch(e){
        if(e === 'CartIdNotFound') res.send({Error: 'ID del carrito no encontrada.'});
        else res.send({Error: 'Se ha producido un error.'});
    }
});

cartRouter.delete('/:id', async (req, res) =>{
   try{
       await CarritoModel.deleteCart(req.params.id);
       res.send({Success: 'Carrito eliminado.'});
   }
   catch(e){
       if(e === 'CartIdNotFound') res.send({Error: 'ID del carrito no encontrada.'});
       else res.send(e);
   }

});

cartRouter.delete('/:id/productos/:idProd', async (req, res) =>{
    try{
        await CarritoModel.deleteFromCart(req.params.id, req.params.idProd);
        res.send({Success: 'Producto eliminado del carrito.'});
    }
    catch(e){
        res.send(e);
    }

});

module.exports = cartRouter;
