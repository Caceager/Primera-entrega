const mongoose = require('mongoose');

const userCollection = 'usuarios';

const ProductSchema = new mongoose.Schema({
    id: {type: Number, require: true},
    idCarrito: {type: Number, require: true},
    username: {type: String, require: true, max: 100},
    password: {type: String, require: true, max: 500},
    nombre: {type: String, require: true, max: 150},
    direccion: {type: String, require: false, max: 200},
    edad: {type: Number, require: true},
    telefono: {type: String, require: false, max: 200},
    urlFoto: {type: String, require: false, max: 200},
})

const products = mongoose.model(userCollection, ProductSchema);

module.exports = products;

