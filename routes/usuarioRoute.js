const {
    Router
} = require('express');
const {
    check
} = require('express-validator');
const {
    usuarioGet,
    usuarioPost,
    usuarioPut,
    usuarioPatch,
    usuarioDelete
} = require('../controller/usuarioController');
const { rolValido, correoExistente } = require('../helpers/db-validator');

const { validarCampos } = require('../middleware/validar_campos');
const router = Router();

router.get('/', usuarioGet);
router.post('/', [ 
    check('nombre','El correo no es obligatorio').not().isEmpty(),
    check('password','La contraseña tiene que tener minimo 6 digitos').isLength({min: 6}),
    check('correo').isEmail().withMessage('Correo invalido').custom(correoExistente),
    check('rol').custom(rolValido),
    check('rol','No es un rol valido').isIn(['ADMIN_ROLE','USER_ROLE']),
    validarCampos
], usuarioPost);
router.put('/:id', usuarioPut);
router.patch('/', usuarioPatch);
router.delete('/', usuarioDelete); 


module.exports = router;