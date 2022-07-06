const express = require('express');
require("./config.js");
const productRouter = require('./productos.js');
const cartRouter = require('./carrito.js');


const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

app.use('/api/productos', productRouter);
app.use('/api/carrito', cartRouter);

const port = process.env.PORT;

app.listen(port, ()=>{
    console.log(`Server started on port ${port} using ${process.env.DB}`);
});