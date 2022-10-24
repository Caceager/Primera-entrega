/*
  UNUSED;
*/

const { fbase : db} = require("./firebaseConnect");



class Carrito{
    constructor() {
        this.getLastId();
    }
    async getLastId(){
        console.log('Obteniendo ultima id del carrito...');
        const query = db.collection("carritos").orderBy("id", "desc").limit(1);
        const carrito = (await query.get());
        this.actualId = (carrito.docs[0].data().id) +1;
        console.log('Id obtenida: '+this.actualId);
    }
    async createCart(){
        const newCart = {id: this.actualId};
        newCart.timestamp = Date.now();
        this.actualId++;
        const query = db.collection('carritos');
        const nuevoCarrito = query.doc(String(newCart.id));
        await nuevoCarrito.create(newCart);
        return newCart.id;
    }
    async addToCart(id, productID){
        try{
            const queryProducto = db.collection("productos").doc(String(productID));
            const productGet = await queryProducto.get();
            if(productGet.exists){
                const product = productGet.data();
                //console.log(product)
                const FinalProduct = {
                    id: product.id,
                    precio: product.precio,
                    imagen: product.imagen,
                    descripcion: product.descripcion,
                    codigo: product.codigo,
                    stock: product.stock,
                    timestamp: product.timestamp,
                    nombre: product.nombre,
                }

                const carrito = db.collection(`carritos`).doc(String(id));
                const carritoGet = await carrito.get();
                if(!carritoGet.exists) throw {Error: "El carrito no existe"};

                const query = db.collection(`carritos/${String(id)}/productos`);
                const addProduct = query.doc(String(productID));
                await addProduct.create(FinalProduct);
            }
            else{
                throw {Error: "El producto no existe"};
            }
        }
        catch(e){
            if(e.code == 6){
                throw({Error: 'El producto ya se encuentra en el carrito'});
            }
            else{
                console.log(e);
                throw(e);
            }
        }

    }
    async viewCart(id){
        const carrito = db.collection(`carritos`).doc(String(id));
        const carritoGet = await carrito.get();
        if(carritoGet.exists){
            let productos = [];
            const query = await db.collection(`carritos/${String(id)}/productos`).get();
            const resultados = (query.docs);
            resultados.map((resultado) => {productos.push(resultado.data())});
            return(productos);
        }
        else{
            throw({Error: "El carrito no existe."});
        }
    }
    async deleteCart(id){
        const carrito = await db.collection(`carritos`).doc(String(id));
        const carritoGet = await carrito.get();
        if(carritoGet.exists){
            await carrito.delete();
        }
        else{
            throw({Error: "El carrito no existe."});
        }
    }
    async deleteFromCart(id, prodID){
        const carrito = await db.collection(`carritos`).doc(String(id));
        const carritoGet = await carrito.get();
        if(carritoGet.exists){
            const producto = await db.collection(`carritos/${String(id)}/productos`).doc(String(prodID));
            const productoGet = await producto.get();
            if(productoGet.exists){
                await producto.delete();
            }
            else{
                throw({Error: "El producto no se encuentra en el carrito."});
            }
        }
        else{
            throw({Error: "El carrito no existe."});
        }

    }
}

module.exports = {carrito: Carrito};
