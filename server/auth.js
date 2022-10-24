const {Strategy: LocalStrategy} = require("passport-local");
const UsuarioModel = require('../containers/Usuarios.js');
const CarritoModel = require('../containers/Carrito.js');
const bcrypt = require("bcryptjs");
const communication = require("./communication");

module.exports = (passport) => {
    passport.serializeUser((req, user, done) => {
        done(null, user.id);
    });
    passport.deserializeUser(async (req, id, done) => {
        const usuario = await UsuarioModel.findById(id);
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
        if( await UsuarioModel.checkUsernameExistance(req.body.username)) {
            done("Ya existe");
        }
        else {
            try {
                const passHash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
                const user = await UsuarioModel.createUser({
                    ...req.body,
                    password: passHash,
                    idCarrito: await CarritoModel.createCart(),
                });
                done(null, user);
                try {
                    await communication.informarNuevoUsuario(user);
                }
                catch (e) {
                    console.log({Error: "Error en módulo de comunicación.", ErrorInfo: e});
                }
            }
            catch (e) {
                done(e);
            }
        }
    }));

    passport.use("logueo", new LocalStrategy( async (email, pass, done) => {
        if (!email || !pass) done("Email o contraseña no introducido.");
        const user = await UsuarioModel.findUser(email);
        if(!user) return done("Usuario no encontrado.");
        if(!bcrypt.compareSync(pass, user.password)) return done("Contraseña incorrecta.");

        return done(null, user);
    }));
}
