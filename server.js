const express = require('express');
require("./config.js");
const productRouter = require('./productos.js');
const cartRouter = require('./carrito.js');
const userRouter = require('./usuarios.js');
const mongoose = require("mongoose");
const {NODE_ENV} = require("./config");

const { usuarios } = require("./daos/main.js");
const {engine} = require("express-handlebars");

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

app.engine(
    "hbs",
    engine({
        extname: ".hbs",
        defaultLayout: 'index.hbs',
        layoutsDir: './views'
    })
);
app.set('view engine', 'hbs');
app.set('views', './views');

app.use('/api/productos', productRouter);
app.use('/api/carrito', cartRouter);
app.use('/usuarios', userRouter);

app.get('/', (req, res) => {
   res.redirect('/usuarios/profile');
});
app.get('/login', (req, res) => {
    res.redirect('/usuarios/login');
});
app.get('/register', (req, res) => {
    res.redirect('/usuarios/register');
});
app.get('/*', (req, res) => {
    res.redirect('/');
});
const port = process.env.PORT;
const host = process.env.HOST;
app.listen(port, ()=>{
    console.log(`Server started on ${host}:${port} using ${process.env.DB}`);
});