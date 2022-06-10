const fs = require('fs');
class Carrito{
    constructor() {
        this.filename = 'carrito.txt';
        this.content = this.readFile();
    }
    readFile(){
        let container;
        try{
            container = JSON.parse(fs.readFileSync(this.filename));
            this.actualId = container[container.length-1].id +1;

        }
        catch{
            container = [];
            fs.writeFileSync(this.filename, '[]');
            this.actualId = 1;
        }

        return container;
    }
    createCart(){
        const newCart = {id: this.actualId};
        this.actualId++;
        this.content.push(newCart);
        fs.writeFileSync(this.filename, JSON.stringify(this.content));
        newCart.timestamp = Date.now();
        return newCart.id;
    }
    addToCart(id, productID){
        const cartContent = JSON.parse(fs.readFileSync(this.filename));
        const targetCart = cartContent.find(x => x.id == id);
        if (targetCart == undefined) throw 'CartIdNotFound'

        const allProducts = JSON.parse(fs.readFileSync('container.txt'));
        const targetObject = allProducts.find(x => x.id == productID);
        if (targetObject == undefined) throw 'ProductIdNotFound'

        if(targetCart.products == undefined){
            targetCart.products = [targetObject];
        }
        else{
            targetCart.products.push(targetObject);
        }
        fs.writeFileSync(this.filename, JSON.stringify(cartContent));

    }
    viewCart(id){
        const cartContent = JSON.parse(fs.readFileSync('carrito.txt'));

        const content = cartContent.find(x => x.id == id);
        if(content == undefined) throw('CartIdNotFound');
        return content;
    }
    deleteCart(id){
        const cartContent = JSON.parse(fs.readFileSync('carrito.txt'));
        const index = cartContent.findIndex(x => x.id == id);
        if(index < 0) throw('CartIdNotFound');

        cartContent.splice(index, 1);
        fs.writeFileSync(this.filename, JSON.stringify(cartContent));
    }
    deleteFromCart(id, prodID){
        const cartContent = JSON.parse(fs.readFileSync('carrito.txt'));
        const cartObject = cartContent.find(x => x.id == id);
        if(cartObject == undefined) throw('CartIdNotFound');

        const cartProductList = cartObject.products;
        const indexToDelete = cartProductList.findIndex(x => x.id == prodID);
        if (indexToDelete < 0) throw 'ProductIdNotFound'


        cartObject.products.splice(indexToDelete, 1);

        fs.writeFileSync(this.filename, JSON.stringify(cartContent));

    }
}


class Productos{
    constructor(){
        this.filename = 'container.txt'
        this.content = this.readFile();

    }

    readFile(){
        let container;
        try{
            container = JSON.parse(fs.readFileSync(this.filename));
            this.actualId = container[container.length-1].id +1;

        }
        catch{
            container = [];
            fs.writeFileSync(this.filename, '[]');
            this.actualId = 1;
        }

        return container;
    }

    getAll(){
        return this.content;
    }
    getById(id){
        const result = this.content.find(x => x.id == id);
        return result;
    }
    addProduct(product){
        product.id = this.actualId;
        this.actualId++;
        this.content.push(product);
        product.timestamp = Date.now();

        fs.writeFileSync(this.filename, JSON.stringify(this.content));
    }

    modifyProduct(id, modification){
        const index = this.content.indexOf(this.getById(id));
        const product = index >=0 ? this.content[index] : undefined;

        if (product == undefined) throw 'Id no encontrada.';

        product.nombre = modification.nombre;
        product.precio = modification.precio;
        product.imagen = modification.imagen;
        product.descripcion = modification.descripcion;
        product.codigo = modification.codigo;
        product.stock = modification.stock;

        fs.writeFileSync(this.filename, JSON.stringify(this.content));
    }

    deleteProduct(id){
        const index = this.content.indexOf(this.getById(id));

        if(index == -1) throw 'IdNotFound';
        else{
            this.content.splice(index, 1);
        }
        fs.writeFileSync(this.filename, JSON.stringify(this.content));

    }

}



module.exports = {carrito: Carrito, productos: Productos};