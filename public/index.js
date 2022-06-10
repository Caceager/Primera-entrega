const cardsContainer = document.getElementById('cardsContainer');
function createCard(element){
    const card = document.createElement('div');
    card.classList=['product'];
    const nombre = document.createElement('h4');
    nombre.innerText= element.nombre;
    const precio = document.createElement('p');
    precio.innerText= 'Precio: $'+element.precio;
    const imagen = document.createElement('img');
    imagen.src= element.imagen;
    const stock = document.createElement('p');
    stock.innerText= 'Stock: '+element.stock;
    const descripcion = document.createElement('p');
    descripcion.innerText= element.descripcion;
    const codigo = document.createElement('p');
    codigo.innerText= 'Codigo: '+element.codigo;


    card.appendChild(nombre);
    card.appendChild(descripcion);
    card.appendChild(precio);
    card.append(stock);
    card.append(codigo);

    card.append(imagen);
    cardsContainer.appendChild(card);
}

fetch('/api/productos')
    .then( res => res.text())
    .then((text) => {
        result = JSON.parse(text);
        for(const element of result){
            createCard(element);
        }
    });

