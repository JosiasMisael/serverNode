const {
    Router
} = require('express');
const {
    check,
    param,
} = require('express-validator');
const {
    usuarioGet,
    usuarioPost,
    usuarioPut,
    usuarioDelete
} = require('../controller/usuarioController');
const {
    rolValido,
    correoExistente,
    validarId
} = require('../helpers/db-validator');

const {
    validarCampos
} = require('../middleware/validar_campos');
const router = Router();

router.get('/', usuarioGet);
router.post('/', [
    check('nombre', 'El correo no es obligatorio').not().isEmpty(),
    check('password', 'La contraseña tiene que tener minimo 6 digitos').isLength({
        min: 6
    }),
    check('correo').isEmail().withMessage('Correo invalido').custom(correoExistente),
    check('rol').custom(rolValido),
    check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    validarCampos
], usuarioPost);

router.put('/:id', [
    param('id').exists().isMongoId().withMessage('No es un ID valido').custom(validarId),
    check('rol').custom(rolValido),
    validarCampos
], usuarioPut);
router.delete('/:id', [
    param('id').exists().isMongoId().withMessage('No es un ID valido').custom(validarId),
], usuarioDelete);


module.exports = router;