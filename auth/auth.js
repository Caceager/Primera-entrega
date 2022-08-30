const passport = require("passport");
const {Strategy: LocalStrategy} = require("passport-local");
const {usuarios : container} = require('../daos/main.js');
const {carrito} = require("../daos/main");
const session = require("express-session");
const bcrypt = require("bcryptjs");
const communication = require("../communication");

const sess = session({
    secret: "secreto",
    resave: false,
    saveUninitialized: false,
});

passport.serializeUser((req, user, done) => {
    done(null, user.id);
});
passport.deserializeUser(async (req, id, done) => {
    const usuario = await container.findById(id);
    req.user = usuario;
    done(null, usuario);
});
passport.use("registro", new LocalStrategy({
    username: 'username',
    password: 'password',
    nombre: 'nombre',
    direccion: 'direccion',
    edad: 'edad',
    foto: 'foto',
    telefono: 'telefono',
    passReqToCallback: true
}, async (req, email, password, done) => {
    if( await container.exists(req.body.username)) {
        done("Ya existe");
    }
    else {
        try {
            const passHash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
            const user = await container.createUser({
                ...req.body,
                password: passHash,
                idCarrito: await carrito.createCart(),
            });
            done(null, user);
            await communication.informarNuevoUsuario(user);
        }
        catch (e) {
            done(e);
        }
    }
}));

passport.use("logueo", new LocalStrategy( async (email, pass, done) => {
    if (!email || !pass) done("Email o contraseña no introducido.");
    const user = await container.findUser(email);
    if(!user) return done("Usuario no encontrado.");
    if(!bcrypt.compareSync(pass, user.password)) return done("Contraseña incorrecta.");

    return done(null, user);

}));


const passportInit = {
    init: passport.initialize(),
    sess: passport.session(),
};

const registro = passport.authenticate("registro",{
    successRedirect: "/usuarios/profile",
    passReqToCallback: true
} );
const logueo = passport.authenticate("logueo", {
    successRedirect: "/usuarios/profile",
    passReqToCallback: true
});
module.exports = {registro, logueo, passportInit, sess}