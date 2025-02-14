const CrudRepository = require('../lib/crudRepository');

const Usuario = require('../models/Usuario');

class UsuarioRepository extends CrudRepository{
    constructor(){
        super(Usuario);
    }


    async getUsuarioByUsername(username){
        const [rows] = await this.pool.query(`select * from usuario  where username=?`, [username]);
        return rows;
    }
    
}
module.exports = new UsuarioRepository();