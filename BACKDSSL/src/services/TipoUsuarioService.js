const tipoUsuarioRepository = require('../repositories/TipoUsuarioRepository');

class TipoUsuarioService{
    getAllTipoUsers(){
        return tipoUsuarioRepository.findAll();
    }
    getTipoUserById(id){
        return tipoUsuarioRepository.findById(id);
    }
    createTipoUser(data){
        return tipoUsuarioRepository.create(data);
    }
    updateTipoUser(id, data){
        return tipoUsuarioRepository.update(id, data);
    }
    deleteTipoUser(id){
        return tipoUsuarioRepository.delete(id);
    }

    restoreTipoUser(id){
        return tipoUsuarioRepository.restore(id);
    }
}
module.exports=new TipoUsuarioService();