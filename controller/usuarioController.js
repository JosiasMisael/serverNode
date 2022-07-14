const { response, request } = require("express");

const usuarioGet =(req= request, res= response) => {
    //Obtener datos de query params de datos no obligatorios por lo cual no se especifica en al URL
    const {q, nombre, datos } = req.query;
    res.json({
      msg: 'API get',
      q,nombre,datos
    });
}

const usuarioPost =(req= request, res =response) => {
    //Obtener datos de un post que se manda por un formulario
    const {nombre, edad} = req.body;
    res.json({
      msg: 'API post',
      nombre, edad
    });
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