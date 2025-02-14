const CrudRepository = require('../lib/crudRepository');
const Venta = require('../models/Venta');

class VentaRepository extends CrudRepository{
    constructor(){
        super(Venta);
    }
}
module.exports = new VentaRepository();