const express = require('express');
const detalleventaService=require('../services/DetalleVentaService');
const router=express.Router();

router.get('/',async(req,res)=>{
    const detalleventas=await detalleventaService.getAllDetalleVentas();
    res.json(detalleventas);
});

router.get('/venta/:idVenta/',async(req,res)=>{
    const detalleventa=await detalleventaService.getDetalleVentaByIdVenta(req.params.idVenta);
    if(detalleventa){
        res.json(detalleventa);
    }else{
        res.status(404).json({message:'Detalleventa no found'});
    }
});

router.get('/:id/',async(req,res)=>{
    const detalleventa=await detalleventaService.getDetalleVentaById(req.params.id);
    if(detalleventa){
        res.json(detalleventa);
    }else{
        res.status(404).json({message:'Detalleventa no found'});
    }
});



router.post('/',async(req,res)=>{
    const newDetalleventa=await detalleventaService.createDetalleVenta(req.body);
    res.status(201).json(newDetalleventa);
});

router.put('/:id',async(req,res)=>{
    const updateDetalleventa=await detalleventaService.updateDetalleVenta(req.params.id,req.body);
    if(updateDetalleventa)
        res.status(201).json(updateDetalleventa);
    else
    res.status(404).json({message:'Detalleventa not updated'});
});

router.delete('/:id',async(req,res)=>{
    const deletedDetalleventa=await detalleventaService.deleteDetalleVenta(req.params.id);
    if(deletedDetalleventa){
        res.status(204).send();
    }else{
        res.status(404).json({message:'Detalleventa dont delete'});
    }
});
module.exports=router;