const CrudRepository = require('../lib/crudRepository');

const Persona = require('../models/Persona');

class PersonaRepository extends CrudRepository{
    constructor(){
        super(Persona);
    }
}
module.exports = new PersonaRepository();