const {usuarios : Usuarios} = require('../containers/persistency/mongodb-usuarios.js');

class UsuariosDAO extends Usuarios{
    constructor(){
        super();
    }
}

module.exports ={usuarios: UsuariosDAO};
