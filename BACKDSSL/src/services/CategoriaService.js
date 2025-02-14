const categoriaRepository = require('../repositories/CategoriaRepository');

class CategoriaService{
    getAllCategorias(){
        return categoriaRepository.findAll();
    }
    getCategoriaById(id){
        return categoriaRepository.findById(id);
    }
    createCategoria(categoriaData){
        return categoriaRepository.create(categoriaData);
    }
    updateCategoria(id, categoriaData){
        return categoriaRepository.update(id, categoriaData);
    }
    deleteCategoria(id){
        return categoriaRepository.delete(id);
    }
    restoreCategoria(id){
        return categoriaRepository.restore(id);
    }
}
module.exports=new CategoriaService();