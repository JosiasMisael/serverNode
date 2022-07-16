const Usuario = require('../models/Usuario/usuario');
const Rol = require('../models/Role/rol');

const correoExistente = async (correo)=>{
    const emailExist = await Usuario.findOne({correo});
    if (emailExist) {
        throw new Error('El correo ya existe')
    }
}

const rolValido =async(rol)=>{
    const rolExist = await Rol.findOne({rol});
    if (!rolExist) {
        throw new Error(`El rol ${rol} no valido`)
    } 
}

module.exports ={
    correoExistente,
    rolValido
}