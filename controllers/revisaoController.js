
const revisaoModel = require('../model/revisao.js');
const { validationResult } = require('express-validator');

module.exports.add = (req,res)=>{
	let errors = validationResult(req);

	if (!errors.isEmpty()) {
		res.status(417).json({
			status: false,
			validation: errors.array()
		});
	}else{
        revisaoModel.add(req.body, (error, result)=>{
            if(error){
                res.status(500).json({
                    status: true,
                    message: error
                })
            }else{
                res.json({
                    status: true,
                    message: 'Revisão agendada com sucesso'
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
        revisaoModel.edit(req.body, req.params.id, (error, result)=>{
            if(error){
                res.status(500).json({
                    status: true,
                    message: error
                })
            }else{
                res.json({
                    status: true,
                    message: 'Revisão alterada com sucesso'
                })
            }
        });
    } 
}

module.exports.index = (req,res)=>{
    revisaoModel.index((error, result)=>{

        if(error){
            res.status(500).json({
                status: false,
                message: error
            })
        }else{
            res.json({
                status: true,
                revisoes: result.rows
            })
        }
    });
}

module.exports.view = (req,res)=>{
    revisaoModel.view(req.params.id,(error, result)=>{
        if(error){
            res.status(500).json({
                status: true,
                message: error
            })
        }else{
            res.json({
                status: true,
                revisao: result.rows
            })
        }
    });
}

module.exports.deletar = (req,res)=>{
    revisaoModel.delete(req.params.id,(error, result)=>{
        if(error){
            res.status(500).json({
                status: true,
                message: error
            })
        }else{
            res.json({
                status: true,
                revisao: "Revisão cancelada com successo "
            })
        }
    });
}