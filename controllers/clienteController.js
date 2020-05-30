
const clienteModel = require('../model/cliente.js');
const { validationResult } = require('express-validator');

module.exports.add = (req,res)=>{
	let errors = validationResult(req);

	if (!errors.isEmpty()) {
		res.status(417).json({
			status: false,
			validation: errors.array()
		});
	}else{
        clienteModel.add(req.body, (error, result)=>{
            if(error){
                res.status(500).json({
                    status: true,
                    message: error
                })
            }else{
                res.json({
                    status: true,
                    message: 'Cliente cadastrado com sucesso'
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
        clienteModel.edit(req.body, req.params.id, (error, result)=>{
            if(error){
                res.status(500).json({
                    status: true,
                    message: error
                })
            }else{
                res.json({
                    status: true,
                    message: 'Cliente alterada com sucesso'
                })
            }
        });
    } 
}

module.exports.index = (req,res)=>{
    clienteModel.index((error, result)=>{

        if(error){
            res.status(500).json({
                status: false,
                message: error
            })
        }else{
            res.json({
                status: true,
                clientes: result.rows
            })
        }
    });
}

module.exports.view = (req,res)=>{
    clienteModel.view(req.params.id,(error, result)=>{
        if(error){
            res.status(500).json({
                status: true,
                message: error
            })
        }else{
            res.json({
                status: true,
                cliente: result.rows
            })
        }
    });
}

module.exports.deletar = (req,res)=>{
    clienteModel.delete(req.params.id,(error, result)=>{
        if(error){
            res.status(500).json({
                status: true,
                message: error
            })
        }else{
            res.json({
                status: true,
                cliente: "Cliente deletado com successo "
            })
        }
    });
}