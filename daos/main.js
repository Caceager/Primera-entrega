const database = process.env.DB;
const {carrito: Carrito} = require(`./carrito/carrito-${database}.js`);
const {productos: Productos} = require(`./productos/productos-${database}.js`);
const {usuarios: Usuarios} = require(`./usuarios-${database}.js`);

const mongoose = require("mongoose");

async function ConectarMongo() {
    console.log('Iniciando conexion a mongodb');
    try{
        await mongoose.connect('mongodb+srv://agustinMongoCH:mongoCH@cluster0.fwdkeuy.mongodb.net/?retryWrites=true&w=majority', {
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

module.exports = {carrito: new Carrito(), productos: new Productos(), usuarios: new Usuarios()};