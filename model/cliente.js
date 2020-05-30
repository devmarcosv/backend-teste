class Cliente{
    constructor(){
        this.connect = require('../utils/connect.js');
        this.formatSQL = require('pg-format');
    }

    index(callback){
        this.connect.query("SELECT * FROM  marcus_vinicius.clientes c left join  marcus_vinicius.carros v  on  v.dono_carro = c.id", callback);
    }

    view(id,callback){
        this.connect.query(`SELECT * FROM  marcus_vinicius.clientes c left join  marcus_vinicius.carros v  on  v.dono_carro = c.id  where c.id = ${id}`, callback);
    }

    add(cliente,callback){
        //Converter objeto para array
        let clienteObj = Object.values(cliente);
        // Juntando o sql com os campos com os dados
        let sql  = this.formatSQL("insert into  marcus_vinicius.clientes (nome_cliente, sexo_cliente, idade_cliente) values (%L)", clienteObj);
        return this.connect.query(sql, callback);
    }

    edit(cliente,id,callback){
        let clienteObj = Object.values(cliente);

        const sql = {
            text: `update marcus_vinicius.clientes  set nome_cliente = $1, sexo_cliente  = $2, idade_cliente = $3  where id = ${id}`,
            values: clienteObj,
            rowMode: 'array',
        }
     
        return this.connect.query(sql, callback);
    }

    delete(id, callback){
        return this.connect.query(`delete from marcus_vinicius.clientes where id = ${id} `, callback);
    }
}

module.exports = new Cliente();