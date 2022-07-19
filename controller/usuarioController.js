const { response, request } = require("express");
const bcryptjs = require('bcryptjs')
const Usuario = require('../models/Usuario/usuario');

const usuarioGet =async(req= request, res= response) => {
    //Obtener datos de query params de datos no obligatorios por lo cual no se especifica en al URL
    const {limite = 5, desde = 0 } = req.query;

    /*const usuarios = await Usuario.find({estado: true}).skip(Number(desde)).limit(Number(limite));
    const total = await Usuario.countDocuments({estado: true});*/

    const [total, usuarios] = await Promise.all([
      Usuario.countDocuments({estado: true}),
      Usuario.find({estado: true}).skip(Number(desde)).limit(Number(limite))
   ])
    res.json({
      total, usuarios
    });
}

const usuarioPost = async(req= request, res =response) => {

  //Obtener datos de un post que se manda por un formulario
  const {nombre,correo, password,rol} = req.body;
  const usuario = new Usuario({nombre, correo, password, rol});
   //Encriptar la contraseña
   const salt = bcryptjs.genSaltSync();
   usuario.password = bcryptjs.hashSync(password, salt);

  await usuario.save();
    res.json(usuario);
}

const usuarioPut =async(req=request, res=response) => {
    //obtener parametros especificos en URL
    const id = req.params.id;
    const {password, google, correo, ...usuario} = req.body;
    if (password) {
      const salt = bcryptjs.genSaltSync();
      usuario.password = bcryptjs.hashSync(password, salt);
    }
    const user = await Usuario.findByIdAndUpdate(id, usuario)
    res.json({
      user
    });
}

const usuarioPatch =(req=request, res=response) => {
    res.json({
      msg: 'API patch'
    });
}

const usuarioDelete =async (req=request, res=response) => {
   const {id} =req.params;

   const usuario = await Usuario.findByIdAndUpdate(id, {estado: false});

    res.json(usuario);
}

module.exports ={
    usuarioGet, usuarioPost, usuarioPut, usuarioPatch, usuarioDelete
}