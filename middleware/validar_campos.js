const {validationResult} = require('express-validator');
const usuario = require('../models/Usuario/usuario');

const validarCampos = (req, res, next)=>{
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json(errors);
    }  
    next();
}


module.exports ={
    validarCampos,
  
}