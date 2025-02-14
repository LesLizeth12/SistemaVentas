const CrudRepository = require('../lib/crudRepository');
const Producto = require('../models/Producto');

class ProductoRepository extends CrudRepository{
    constructor(){
        super(Producto);
    }

    async findProductosByIdCategoria(categoriaId){
        const[rows]=await this.pool.query(`SELECT * FROM categoria c inner join producto p on c.id=p.id_categoria where c.id=?`,[categoriaId]);
        return rows;
    }
}
module.exports = new ProductoRepository();