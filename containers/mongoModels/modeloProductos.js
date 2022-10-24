const mongoose = require('mongoose');

const productCollection = 'productos';

const ProductSchema = new mongoose.Schema({
    id: {type: Number, require: true},
    nombre: {type: String, require: true, max: 100},
    precio: {type: Number, require: true},
    imagen: {type: String, require: true, max: 100},
    descripcion: {type: String, require: true, max: 200},
    codigo: {type: String, require: true, max: 20},
    stock: {type: Number, require: true},
    timestamp: {type: Date, require: true}
})

const products = mongoose.model(productCollection, ProductSchema);

module.exports = products;

