const express = require('express');
const userRouter = express.Router();
const ProductoModel = require("../containers/Productos");
const passport = require("passport")
const path = require("path");
const UsuarioModel = require("../containers/Usuarios");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './public/images');
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
});
const upload = multer({storage}).single('image');



userRouter.use(express.json());

userRouter.get("/register", (req, res) => {
    if (req.user) return res.redirect("/usuarios/profile");
    res.sendFile(path.resolve(__dirname + "/../public/register.html"));
});

userRouter.get("/login", (req, res) => {
    if (req.user) return res.redirect("/usuarios/profile");
    res.sendFile(path.resolve(__dirname + "/../public/login.html"));
});

userRouter.get("/profile", async (req, res) => {
    if (!req.user) return res.redirect("/usuarios/login");
    const {user, cart} = await UsuarioModel.getUserInfo(req.user);

    const products = JSON.parse(JSON.stringify(await ProductoModel.getAll()));
    res.render('profile.hbs', {'datos': user, 'productos': products, 'carrito': cart, layout: false});
});

userRouter.post('/buyCart', async (req, res) => {
    if (!req.user) return res.send(new Error("Error, el carrito no existe."));
    try {
        await UsuarioModel.comprarCarrito(req.user);
        res.sendFile(path.resolve(__dirname+"/../public/successBuy.html"));
    }
    catch (e) {
        if(e.ErrorCode === "NotificationError") {
            res.send(e);
        }
        else {
            res.send("Se ha producido un error desconocido.");
            console.log(e);
        }
    }
});


const passportOptions = {
    successRedirect: "/usuarios/profile",
    passReqToCallback: true
}
userRouter.post('/nuevoUsuario', passport.authenticate("registro", {passReqToCallback: true}), async (req, res) => {
    res.sendStatus(200);
});

userRouter.post('/postImage', upload, async(req, res) => {
    res.sendStatus(200);
});
userRouter.post('/login', passport.authenticate("logueo", passportOptions));

userRouter.post('/logout', (req, res) => {
    if (!req.user) return res.redirect("/usuarios/login");
    req.user = undefined;
    req.session.destroy();
    res.redirect("/");
});


module.exports = userRouter;
