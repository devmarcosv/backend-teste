class Carro{
    constructor(){
        this.connect = require('../utils/connect.js');
        this.formatSQL = require('pg-format');
    }

    index(callback){
        this.connect.query("SELECT * FROM  marcus_vinicius.carros v  left join  marcus_vinicius.clientes c on  v.dono_carro = c.id", callback);
    }

    view(id,callback){
        this.connect.query(`SELECT * FROM  marcus_vinicius.carros v  left join  marcus_vinicius.clientes c on  v.dono_carro = c.id  where c.id = ${id}`, callback);
    }

    add(carro,callback){
        //Converter objeto para array
        let carroObj = Object.values(carro);
        // Juntando o sql com os campos com os dados
        let sql  = this.formatSQL("insert into  marcus_vinicius.carros (placa, nome_carro, cor_carro, ano_carro, marca_carro, combustivel_carro, dono_carro) values (%L)", carroObj);
        return this.connect.query(sql, callback);
    }

    edit(carro,id,callback){
        let carroObj = Object.values(carro);

        const sql = {
            text: `update marcus_vinicius.carros  set placa= $1, nome_carro=$2, cor_carro=$3, ano_carro=$4, marca_carro=$5, combustivel_carro=$6, dono_carro=$7  where id = ${id}`,
            values: carroObj,
            rowMode: 'array',
        }
     
        return this.connect.query(sql, callback);
    }

    delete(id, callback){
        return this.connect.query(`delete from marcus_vinicius.carros where id = ${id} `, callback);
    }
}

module.exports = new Carro();