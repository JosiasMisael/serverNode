const { response, request } = require("express");
const bcryptjs = require('bcryptjs')
const Usuario = require('../models/Usuario/usuario');

const usuarioGet =(req= request, res= response) => {
    //Obtener datos de query params de datos no obligatorios por lo cual no se especifica en al URL
    const {q, nombre, datos } = req.query;
    res.json({
      msg: 'API get',
      q,nombre,datos
    });
}

const usuarioPost = async(req= request, res =response) => {

  const {nombre,correo, password,rol} = req.body;
  const usuario = new Usuario({nombre, correo, password, rol});
   //Encriptar la contraseña
   const salt = bcryptjs.genSaltSync();
   usuario.password = bcryptjs.hashSync(password, salt);

  await usuario.save();
    //Obtener datos de un post que se manda por un formulario
    res.json({usuario});
}

const usuarioPut = (req=request, res=response) => {
    //obtener parametros especificos en URL
    const id = req.params.id;
    res.json({
      msg: 'API put',
      id
    });
}

const usuarioPatch =(req=request, res=response) => {
    res.json({
      msg: 'API patch'
    });
}

const usuarioDelete = (req=request, res=response) => {
    res.json({
      msg: 'API delete'
    });
}

module.exports ={
    usuarioGet, usuarioPost, usuarioPut, usuarioPatch, usuarioDelete
}