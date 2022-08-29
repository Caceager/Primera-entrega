const carts = require('../models/modeloCarrito.js');
const usuarios = require('../models/modeloUsuario');

class Usuarios{
    constructor(){
        this.getLastId();
    }
    async getLastId(){
        try{
            const last_user = await usuarios.findOne({}, {}, { sort: { id: -1 } });
            this.actualId = last_user?.id || 0;
        }
        catch(e){
            throw(e);
        }
    }
    async createUser(userData){
        try{
            this.actualId++;
            const user = {
                id: this.actualId,
                username: userData.username,
                password: userData.password,
                nombre: userData.nombre,
                direccion: userData.direccion || null,
                edad: userData.edad,
                telefono: userData.telefono || null,
                urlFoto: userData.urlFoto || null,
                idCarrito: userData.idCarrito,
            }
            const usuarioSaveModel = new usuarios(user);
            await usuarioSaveModel.save();
            console.log(usuarioSaveModel);
            return usuarioSaveModel;
        }
        catch (e) {
            throw(e);
        }
    }

    async exists(username) {
        const user = await usuarios.findOne({username});
        return  !!user;
    }

    async findById(id) {
        const user = await usuarios.findOne({id});
        return  user;
    }
    async findUser(username) {
        const user = await usuarios.findOne({username});
        return  user;
    }

}

module.exports = {usuarios: Usuarios};