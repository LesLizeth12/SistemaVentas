const personaRepository = require('../repositories/PersonaRepository');

class PersonaService{
    getAllPersons(){
        return personaRepository.findAll();
    }
    getPersonById(id){
        return personaRepository.findById(id);
    }
    createPerson(data){
        return personaRepository.create(data);
    }
    updatePerson(id, data){
        return personaRepository.update(id, data);
    }
    deletePerson(id){
        return personaRepository.delete(id);
    }
    getAllClients(){
        return personaRepository.findAllClients();
    }
    /*
    getAllStaff(){
        return personaRepository.findAllStaff();
    }
        */
    restoreCliente(id){
        return personaRepository.restore(id);
    }
}
module.exports=new PersonaService();