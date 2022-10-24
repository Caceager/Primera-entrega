const database = process.env.DB;
const {carrito: Carrito} = require(`./carrito/carrito-${database}.js`);
const {productos: Productos} = require(`./productos/productos-${database}.js`);
const {usuarios: Usuarios} = require(`./usuarios-${database}.js`);

const mongoose = require("mongoose");

async function ConectarMongo() {
    console.log('Iniciando conexion a mongodb');
    try{
        console.log(process.env.DBUrl);
        await mongoose.connect(process.env.DBUrl, {
            useNewUrlParser: true
        });
        console.log('Conexion a mongodb completada.');
    }
    catch(err){
        console.log(err);
    }
}

if(database === "mongodb") ConectarMongo();
module.exports = {carrito: Carrito, productos: Productos, usuarios: Usuarios};
