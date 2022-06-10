const express = require('express');
const productRouter = require('./productos.js');
const cartRouter = require('./carrito.js');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));


app.use('/api/productos', productRouter);
app.use('/api/carrito', cartRouter);

const port = 8081;


app.listen(port, ()=>{
    console.log(`Server started on port ${port}`);
});