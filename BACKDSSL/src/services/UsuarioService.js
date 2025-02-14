const usuarioRepository = require('../repositories/UsuarioRepository');

class UsuarioService{
    getAllUsers(){
        return usuarioRepository.findAll();
    }
    getUserById(id){
        return usuarioRepository.findById(id);
    }
    createUser(data){
        return usuarioRepository.create(data);
    }
    updateUser(id, data){
        return usuarioRepository.update(id, data);
    }
    deleteUser(id){
        return usuarioRepository.delete(id);
    }

    restoreUser(id){
        return usuarioRepository.restore(id);
    }

    getUserByUsername(username){
        return usuarioRepository.findByUsername(username);
    }
}
module.exports=new UsuarioService();