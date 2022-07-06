const database = process.env.DB;
const {carrito: Carrito} = require(`./carrito/carrito-${database}.js`);
const {productos: Productos} = require(`./productos/productos-${database}.js`);
const mongoose = require("mongoose");

async function ConectarMongo() {
    console.log('Iniciando conexion a mongodb');
    try{
        await mongoose.connect('mongodb://localhost:27017/ecommerce', {
            useNewUrlParser: true
        });
        console.log('Conexion a mongodb completada.');
    }
    catch(err){
        console.log(err);
    }

}





if(database == "mongodb") ConectarMongo();
//if (database == "firebase") ConectarFireBase();

const a = {Hola: 'hola'};
module.exports = {carrito: Carrito, productos: Productos, db: a};