class Revisao{
    constructor(){
        this.connect = require('../utils/connect.js'); /// Importar conexão com banco de dados
        this.formatSQL = require('pg-format');
    }

    index(callback){
        this.connect.query("SELECT * FROM  marcus_vinicius.revisoes r inner join  marcus_vinicius.carros v on  r.carro_revisao = v.id", callback);
    }

    view(id,callback){
        this.connect.query(`SELECT * FROM  marcus_vinicius.revisoes r  inner join  marcus_vinicius.carros v on  r.carro_revisao = v.id  where r.id = ${id}`, callback);
    }

    add(revisao,callback){
        //Converter objeto para array
        let revisaoObj = Object.values(revisao);
        // Juntando o sql com os campos com os dados
        let sql  = this.formatSQL("insert into  marcus_vinicius.revisoes (data_revisao, descricao_revisao, valor_revisao, carro_revisao) values (%L)", revisaoObj);
        return this.connect.query(sql, callback);
    }

    edit(revisao,id,callback){
        let revisaoObj = Object.values(revisao);

        const sql = {
            text: `update marcus_vinicius.revisoes set data_revisao=$1, descricao_revisao=$2, valor_revisao=$3, carro_revisao=$4  where id = ${id}`,
            values: revisaoObj,
            rowMode: 'array',
        }
     
        return this.connect.query(sql, callback);
    }

    delete(id, callback){
        return this.connect.query(`delete from marcus_vinicius.revisoes where id = ${id} `, callback);
    }
}

module.exports = new Revisao();