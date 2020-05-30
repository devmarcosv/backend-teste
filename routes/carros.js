const router = require('express').Router();

const carroController = require('../controllers/carroController.js');
const revisaoController = require('../controllers/revisaoController.js');

const { check } = require('express-validator');

router.get('/', carroController.index);
router.get('/visualizar/:id', carroController.view);

router.post('/cadastrar',
	[
        check('placa', 'Placa veiculo é obrigatório').not().isEmpty(),
        check('nome_carro', 'Veiculo é obrigatório').not().isEmpty(),
        check('cor_carro', 'Cor veiculo é obrigatório').not().isEmpty(),
        check('ano_carro', 'Ano veiculo é obrigatório').not().isEmpty(),
        check('marca_carro', 'Marca veiculo é obrigatório').not().isEmpty(),
        check('combustivel_carro', 'Combustivel veiculo é obrigatório').not().isEmpty(),
        check('dono_carro', 'Dono do veiculo é obrigatório').not().isEmpty(),
	],
	carroController.add
);

router.post('/editar/:id',
	[
        check('placa', 'Placa veiculo é obrigatório').not().isEmpty(),
        check('nome_carro', 'Veiculo é obrigatório').not().isEmpty(),
        check('cor_carro', 'Cor veiculo é obrigatório').not().isEmpty(),
        check('ano_carro', 'Ano veiculo é obrigatório').not().isEmpty(),
        check('marca_carro', 'Marca veiculo é obrigatório').not().isEmpty(),
        check('combustivel_carro', 'Combustivel veiculo é obrigatório').not().isEmpty(),
        check('dono_carro', 'Dono do veiculo é obrigatório').not().isEmpty(),
	],
	carroController.edit
);

router.delete('/deletar/:id',carroController.deletar);

/// Revisões

router.get('/revisoes', revisaoController.index);
router.get('/revisao/:id', revisaoController.view);

router.post('/revisao/cadastrar',
	[
        check('data_revisao', 'Data é obrigatório').not().isEmpty(),
        check('descricao_revisao', 'Descrição é obrigatório').not().isEmpty(),
        check('valor_revisao', 'Valor é obrigatório').not().isEmpty(),
        check('carro_revisao', 'Carro é obrigatório').not().isEmpty()
	],
	revisaoController.add
);

router.post('/revisao/editar/:id',
	[
        check('data_revisao', 'Data é obrigatório').not().isEmpty(),
        check('descricao_revisao', 'Descrição é obrigatório').not().isEmpty(),
        check('valor_revisao', 'Valor é obrigatório').not().isEmpty(),
        check('carro_revisao', 'Carro é obrigatório').not().isEmpty()
	],
	revisaoController.edit
);

router.delete('/revisao/deletar/:id',revisaoController.deletar);

module.exports = router;