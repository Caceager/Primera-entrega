const express = require('express');
require("./server/config.js");
const productRouter = require('./controllers/productoController.js');
const cartRouter = require('./controllers/carritoController.js');
const userRouter = require('./controllers/usuarioController.js');
const passport = require("passport");
const {engine} = require("express-handlebars");
const session = require("express-session");

const app = express();
app.use(session({
    secret: "secreto",
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

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

require("./server/auth")(passport);

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
