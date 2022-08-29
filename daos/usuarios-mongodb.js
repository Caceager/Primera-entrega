const {usuarios : Usuarios} = require('../contenedores/mongodb-usuarios.js');

class UsuariosDAO extends Usuarios{
    constructor(){
        super();
    }
}

module.exports ={usuarios: UsuariosDAO};