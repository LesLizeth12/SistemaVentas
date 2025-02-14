const CrudRepository = require('../lib/crudRepository');
const DetalleVenta = require('../models/DetalleVenta');

class DetalleVentaRepository extends CrudRepository{
    constructor(){
        super(DetalleVenta);
    }
}
module.exports = new DetalleVentaRepository();