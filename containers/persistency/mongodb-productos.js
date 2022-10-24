const mongoose = require('mongoose');
const products = require('../mongoModels/modeloProductos.js');


class Productos{
    constructor(){
        this.getLatestID();
    }

    async getLatestID() {
        const last_product = await products.findOne({}, {}, { sort: { 'id' : -1 } });
        this.actualId = last_product?.id || 0;
    }


    async getAll(){
        const productos = await products.find({});
        return productos;
    }
    async getById(id){
        const result = await products.findOne({id: id});
        console.log(result);
        return result;
    }
    async addProduct(product){
        this.actualId++;
        product.timestamp = Date.now();
        product.id = this.actualId;
        const productoSaveModel = new products(product);
        await productoSaveModel.save();
        console.log(productoSaveModel);
    }

    async modifyProduct(id, modification){
        const query = {id: id}
        const update = {
            nombre: modification.nombre,
            precio:modification.precio,
            imagen: modification.imagen,
            descripcion: modification.descripcion,
            codigo: modification.codigo,
            stock: modification.stock,
        }
        const result = await products.findOneAndUpdate(query, update);
        if (result == null) throw {Error: "Producto no encontrado."};
    }

    async deleteProduct(id){
        try{
            await products.findOneAndDelete({id: id});
        }
        catch(e){
            throw(e);
        }
    }

}

module.exports = {productos: Productos};
