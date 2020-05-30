
const carroModel = require('../model/carro.js');
const { validationResult } = require('express-validator');

module.exports.add = (req,res)=>{
	let errors = validationResult(req);

	if (!errors.isEmpty()) {
		res.status(417).json({
			status: false,
			validation: errors.array()
		});
	}else{
        carroModel.add(req.body, (error, result)=>{
            if(error){
                res.status(500).json({
                    status: true,
                    message: error
                })
            }else{
                res.json({
                    status: true,
                    message: 'Veiculo cadastrado com sucesso'
                })
            }
        });
    } 
}

module.exports.edit = (req,res)=>{
    let errors = validationResult(req);

	if (!errors.isEmpty()) {
		res.status(417).json({
			status: false,
			validation: errors.array()
		});
	}else{
        carroModel.edit(req.body, req.params.id,  (error, result)=>{
            if(error){
                res.status(500).json({
                    status: true,
                    message: error
                })
            }else{
                res.json({
                    status: true,
                    message: 'Veiculo alterada com sucesso'
                })
            }
        });
    } 
}

module.exports.index = (req,res)=>{
    carroModel.index((error, result)=>{
        if(error){
            res.status(500).json({
                status: true,
                message: error
            })
        }else{
            res.json({
                status: true,
                veiculos: result.rows
            })
        }
    });
}

module.exports.view = (req,res)=>{
    carroModel.view(req.params.id,(error, result)=>{
        if(error){
            res.status(500).json({
                status: true,
                message: error
            })
        }else{
            res.json({
                status: true,
                veiculos: result.rows
            })
        }
    });
}

module.exports.deletar = (req,res)=>{
    carroModel.delete(req.params.id,(error, result)=>{
        if(error){
            res.status(500).json({
                status: true,
                message: error
            })
        }else{
            res.json({
                status: true,
                cliente: "Carro deletado com successo "
            })
        }
    });
}