const express = require('express');
const productRouter = express.Router();
const ProductModel = require("../containers/Productos");
productRouter.use(express.json());

productRouter.get('/', async (req, res) =>{
    res.type('json').send(JSON.stringify(await ProductModel.getAll(), null, 2));
});

productRouter.get('/:id', async (req, res) =>{
    try{
        const result = await ProductModel.getById(req.params.id);
        if (result == null) throw {Error: "Producto no encontrado."};
        res.type('json').send(JSON.stringify(result, null, 2));
    }
    catch(e){
        res.send(e);
    }

});

productRouter.post('/', async (req, res)=>{
    try{
        const product = ProductModel.validateProduct(req.body);
        await ProductModel.addProduct(product);
        res.send({Success: "Producto agregado."});
    }
    catch(e){
       res.send(e);
    }
});

productRouter.put('/:id', async (req, res)=>{
    try{
        const product = container.validateProduct(req.body);
        await container.modifyProduct(req.params.id, product);
        res.send({Success: "Producto modificado."});
    } catch(e){
        res.send(e);
    }
});

productRouter.delete('/:id', async (req, res) =>{
    try{
        if(await container.getById(req.params.id) == null) {
            throw {Error: "Producto no encontrado"};
        }
        await container.deleteProduct(req.params.id);
        res.send({Success: 'Producto eliminado.'});
    }
    catch(e){
        res.send(e);
    }
});


module.exports = productRouter;
