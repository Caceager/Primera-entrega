const carrito = document.getElementById("carrito");
const productos = document.getElementById("productos");

const botonCarrito = document.getElementById("botonCarrito");
const botonProductos = document.getElementById("botonProductos");
const idCarrito = document.getElementById("carritoId").getAttribute("idCarrito");
const logOutForm = document.getElementById('logout');

botonCarrito.addEventListener('click', () => {
   productos.classList.add("hidden");
   carrito.classList.remove("hidden");
   botonCarrito.classList.add("selected");
   botonProductos.classList.remove("selected");

});
botonProductos.addEventListener('click', () => {
    carrito.classList.add("hidden");
    productos.classList.remove("hidden");
    botonProductos.classList.add("selected");
    botonCarrito.classList.remove("selected");

});

const productosTotales = Array.from(document.getElementsByClassName("addToCart"));
const productosCarrito = Array.from(document.getElementsByClassName("deleteFromCart"));

async function eliminarDelCarrito(idProducto) {
    await fetch(`/api/carrito/${idCarrito}/productos/${idProducto}`, {method: 'delete'});
}
function agregarAlCarritoFront(producto) {
    const container = document.createElement('container');
    container.classList.add("iblock");
    const deleteButton = document.createElement('div');
    deleteButton.id = producto.id;
    deleteButton.classList.add("deleteFromCart");
    deleteButton.innerText = "Eliminar del carrito";

    container.innerHTML = `<div class="book">
                <div class="title">${producto.nombre}</div>
                <div class="synop">${producto.descripcion}</div>
                <div class="details">
                    <div class="fa fa-heart"></div>
                    ${producto.precio}
                    <div class="fa fa-eye"></div>
                    stock: ${producto.stock}
                </div>
            </div>`;
    container.appendChild(deleteButton);
    deleteButton.addEventListener('click', async(event) => {
        const id = event.target.id;
        await eliminarDelCarrito(id);
        event.target.parentNode.remove();

    });
    carrito.appendChild(container);
}
async function agregarAlCarrito(id) {
    await fetch(`/api/carrito/${idCarrito}/productos/${id}`, {method: 'post'});
}
productosTotales.forEach( (producto) => {
    producto.addEventListener('click', async(event) => {
        alert(`Se ha agregado [${producto.nombre}] al carrito.`);
        await agregarAlCarrito(event.target.id);
        agregarAlCarritoFront({
            nombre: event.target.getAttribute("title"),
            precio: event.target.getAttribute("precio"),
            descripcion: event.target.getAttribute("descripcion"),
            stock: event.target.getAttribute("stock"),
            id: event.target.id
        });
    });
});
productosCarrito.forEach( (producto) => {
    producto.addEventListener('click', async(event) => {
        const id = event.target.id;
        await eliminarDelCarrito(id);
        event.target.parentNode.remove();

    });
})