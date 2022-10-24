const carts = require('../mongoModels/modeloCarrito.js');
const products = require('../mongoModels/modeloProductos');

class Carrito{
    constructor(){
        this.getLastId();
    }
    async getLastId(){
        try{
            const last_cart = await carts.findOne({}, {}, { sort: { id: -1 } });
            this.actualId = last_cart?.id || 0;
        }
        catch(e){
            throw(e);
        }
    }
    async createCart(){
        try{
            this.actualId++;
            const cart = {
                id: this.actualId,
                timestamp: Date.now(),
                productos: '[]',
            }
            const carritoSaveModel = new carts(cart);
            await carritoSaveModel.save();
            return cart.id;
        }
        catch (e) {
            throw(e);
        }

    }
    async addToCart(id, productID) {
        try {
            productID = parseInt(productID);
            const query = {id: id};
            const cart = await carts.findOne(query);
            const product = await products.findOne({id: productID});
            if (!product) throw {Error: "Producto no encontrado."};
            if (!cart) throw {Error: "Carrito no encontrado."};
            const productList = JSON.parse(cart.productos);
            productList.push(product);
            const update = {
                productos: JSON.stringify(productList),
            }
            const result = await carts.findOneAndUpdate(query, update);
            if(!product) console.log('a');
        }
        catch(e){
            throw(e);
        }
    }
    async viewCart(id){
        try{
            const cart = await carts.findOne({id: id});
            return JSON.parse(cart.productos);
        }
        catch (e) {
            throw(e);
        }

    }
    async deleteCart(id){
        try{
            await carts.findOneAndDelete({id: id});
        }
        catch(e){
            throw (e);
        }
    }
    async deleteFromCart(id, prodID){
        try{
            const carrito = await carts.findOne({id: id});
            if (!carrito) throw {Error: "Carrito no encontrado."};
            const listaProductos = JSON.parse(carrito.productos);
            const indexProducto = listaProductos.findIndex(producto => producto?.id == prodID);
            const response = listaProductos.splice(indexProducto, 1);
            if(!response[0]) throw {Error: "No se encuentra este producto en el carrito."};
            const update = {
                productos: JSON.stringify(listaProductos),
            }

            await carts.findOneAndUpdate({id: id}, update);
        }
        catch(e){
            console.log(e);
            throw(e);
        }
    }
    async emptyCart(id) {
        try{
            const carrito = await carts.findOne({id: id});
            if (!carrito) throw {Error: "Carrito no encontrado."};
            const listaProductos = [];
            const update = {
                productos: JSON.stringify(listaProductos),
            }
            await carts.findOneAndUpdate({id: id}, update);
        }
        catch (e) {
            throw e;
        }



    }

}

module.exports = {carrito: Carrito};
