const {fbase: db} = require("./firebaseConnect.js");

class Productos{
    constructor(){
        this.getLatestID();
    }
    async getLatestID(){
        try{
            const query = db.collection("productos").orderBy("id", "desc").limit(1);
            this.actualId = (await query.get()).docs[0].data().id;
        }
        catch (e) {
            throw(e);
        }

    }
    async getAll(){
        try{
            const query = db.collection("productos");
            const productos = (await query.get()).docs;

            return productos.map(producto => producto.data());
        }
        catch (e) {
            throw(e);
        }
    }
    async getById(id){
        try{
            const query = db.collection("productos").doc(String(id));
            const productGet = await query.get();
            if(productGet.exists){
                const producto = productGet.data();
                return producto;
            }
            else{
                throw {Error: "El producto no existe"};
            }
        }
        catch (e) {
            throw (e);
        }

    }
    async addProduct(product){
        try{
            this.actualId++;
            product.id = this.actualId;
            product.timestamp = Date.now();
            const query = db.collection('productos');
            const nuevoProducto = query.doc(String(product.id));
            await nuevoProducto.create(product);
        }
        catch (e) {
            throw (e);
        }

    }
    async modifyProduct(id, modification){
        try{
            const query = db.collection("productos").doc(String(id));
            const productGet = await query.get();
            if(productGet.exists){
                await query.update(modification);
            }
            else{
                throw {Error: "El producto no existe"};
            }
        }
        catch (e) {
            throw (e);
        }
    }
    async deleteProduct(id){
        try{
            const query = db.collection("productos").doc(String(id));
            const productGet = await query.get();
            if(productGet.exists){
                await query.delete();
            }
            else{
                throw {Error: "El producto no existe"};
            }
        }
        catch (e) {
            throw (e);
        }
    }
}

module.exports = {productos: Productos};