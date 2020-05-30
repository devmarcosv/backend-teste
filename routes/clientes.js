const router = require('express').Router();
const clienteController = require('../controllers/clienteController.js');
const { check } = require('express-validator');

router.get('/', clienteController.index);
router.get('/:id', clienteController.view);

router.post('/cadastrar',
	[
        check('nome_cliente', 'Nome é obrigatório').not().isEmpty(),
        check('sexo_cliente', 'Sexo é obrigatório').not().isEmpty(),
        check('idade_cliente', 'Idade é obrigatório').not().isEmpty()
	],
	clienteController.add
);

router.post('/editar/:id',
	[
        check('nome_cliente', 'Nome é obrigatório').not().isEmpty(),
        check('sexo_cliente', 'Sexo é obrigatório').not().isEmpty(),
        check('idade_cliente', 'Idade é obrigatório').not().isEmpty()
	],
	clienteController.edit
);

router.delete('/deletar/:id',clienteController.deletar);


module.exports = router;