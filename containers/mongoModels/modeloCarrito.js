const mongoose = require('mongoose');

const cartCollection = 'carritos';

const ProductSchema = new mongoose.Schema({
    id: {type: Number, require: true},
    timestamp: {type: Date, require: true},
    productos: {type: String, require: true}
})

const carts = mongoose.model(cartCollection, ProductSchema);

module.exports = carts;

