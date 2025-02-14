const CrudRepository = require('../lib/crudRepository');
const Categoria = require('../models/Categoria');

class CategoriaRepository extends CrudRepository{
    constructor(){
        super(Categoria);
    }
}
module.exports = new CategoriaRepository();