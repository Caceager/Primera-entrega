const express = require('express');
const productRouter = express.Router();
const {productos : Productos} = require('./daos/main.js');
productRouter.use(express.json());
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



const container = new Productos();


productRouter.get('/', middleWareAutentication, async (req, res) =>{
    res.type('json').send(JSON.stringify(await container.getAll(), null, 2));
});

productRouter.get('/:id', middleWareAutentication, async (req, res) =>{
    try{
        const result = await container.getById(req.params.id);
        if (result == null) throw {Error: "Producto no encontrado."};
        res.type('json').send(JSON.stringify(result, null, 2));
    }
    catch(e){
        res.send(e);
    }

});

productRouter.post('/', middleWareAutentication, middleWareAuth, async (req, res)=>{
    try{
        const nombre = req.body.nombre;
        const precio = req.body.precio;
        const imagen = req.body.imagen;
        const stock = req.body.stock;
        const codigo = req.body.codigo;
        const descripcion = req.body.descripcion;

        console.log(req.body);

        if(nombre == undefined || precio == undefined || imagen == undefined || stock == undefined
            || codigo == undefined || descripcion == undefined) throw 'Error en el formato del producto';

        await container.addProduct({nombre: nombre, precio: precio, imagen: imagen, stock: stock, codigo: codigo, descripcion: descripcion});
        res.send({Success: "Producto agregado."});
    }
    catch(e){
       res.send(e);
    }
});

productRouter.put('/:id', middleWareAutentication, middleWareAuth, async (req, res)=>{
    try{
        const nombre = req.body.nombre;
        const precio = req.body.precio;
        const imagen = req.body.imagen;
        const stock = req.body.stock;
        const codigo = req.body.codigo;
        const descripcion = req.body.descripcion;
        try{
            if(nombre == undefined || precio == undefined || imagen == undefined || stock == undefined
                || codigo == undefined || descripcion == undefined){
                throw({Error: 'Error en el formato del producto'});
            }
            await container.modifyProduct(req.params.id, {nombre: nombre, precio: precio, imagen: imagen, stock: stock, codigo: codigo, descripcion: descripcion});
            res.send({Success: "Producto modificado."});
        }
        catch(e){ res.send(e); console.log(e)}

    }
    catch(e){
        throw e;
    }
});

productRouter.delete('/:id', middleWareAutentication, middleWareAuth, async (req, res) =>{
    try{
        if(await container.getById(req.params.id) == null){
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