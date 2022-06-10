const express = require('express');
const productRouter = express.Router();
const {productos : Productos} = require('./objetos.js');
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


productRouter.get('/', middleWareAutentication, (req, res) =>{
    res.type('json').send(JSON.stringify(container.getAll(), null, 2));
});

productRouter.get('/:id', middleWareAutentication, (req, res) =>{
    res.type('json').send(JSON.stringify(container.getById(req.params.id), null, 2));
});

productRouter.post('/', middleWareAutentication, middleWareAuth, (req, res)=>{
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

        container.addProduct({nombre: nombre, precio: precio, imagen: imagen, stock: stock, codigo: codigo, descripcion: descripcion});
        res.send({Success: "Producto agregado."})
    }
    catch(e){
       throw(e);
    }
});

productRouter.put('/:id', middleWareAutentication, middleWareAuth, (req, res)=>{
    console.log(req.body.title);
    try{
        const nombre = req.body.nombre;
        const precio = req.body.precio;
        const imagen = req.body.imagen;
        const stock = req.body.stock;
        const codigo = req.body.codigo;
        const descripcion = req.body.descripcion;

        if(nombre == undefined || precio == undefined || imagen == undefined || stock == undefined
            || codigo == undefined || descripcion == undefined) throw 'Error en el formato del producto';

        container.modifyProduct(req.params.id, {nombre: nombre, precio: precio, imagen: imagen, stock: stock, codigo: codigo, descripcion: descripcion});
        res.send({Success: "Producto modificado."})
    }
    catch(e){
        throw e;
    }
});

productRouter.delete('/:id', middleWareAutentication, middleWareAuth, (req, res) =>{
    try{
        container.deleteProduct(req.params.id);
        res.send({Success: 'Producto eliminado.'});
    }
    catch(e){
        if(e == 'IdNotFound') throw 'ID no encontrada.'
        else throw 'Ha ocurrido un error.';
    }

});


module.exports = productRouter;