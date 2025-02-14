const detalleventaRepository = require('../repositories/DetalleventaRepository');

class DetalleventaService{
    getAllDetalleVentas(){
        return detalleventaRepository.findAll();
    }
    getDetalleVentaById(id){
        return detalleventaRepository.findById(id);
    }
    createDetalleVenta(detalleventaData){
        return detalleventaRepository.create(detalleventaData);
    }
    updateDetalleVenta(id, detalleventaData){
        return detalleventaRepository.update(id, detalleventaData);
    }
    deleteDetalleVenta(id){
        return detalleventaRepository.delete(id);
    }

    getDetalleVentaByIdVenta(id){
        return detalleventaRepository.findByIdVenta(id);
    }
}
module.exports=new DetalleventaService();