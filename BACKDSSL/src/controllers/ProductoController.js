const express = require('express');
const productoService=require('../services/ProductoService');
const router=express.Router();

router.get('/',async(req,res)=>{
    const productos=await productoService.getAllProductos();
    res.json(productos);
});

router.get('/:id/',async(req,res)=>{
    const producto=await productoService.getProductoById(req.params.id);
    if(producto){
        res.json(producto);
    }else{
        res.status(404).json({message:'Producto no found'});
    }
});

router.post('/',async(req,res)=>{
    const newProducto=await productoService.createProducto(req.body);
    res.status(201).json(newProducto);
});

router.put('/:id',async(req,res)=>{
    const productoId = req.params.id;
  const productoData = req.body;

  try {
    const productoActualizado = await productoService.updateProducto(productoId, productoData);
    res.status(200).json(productoActualizado);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el producto', error });
  }
});

router.delete('/:id',async(req,res)=>{
    const deletedProducto=await productoService.deleteProducto(req.params.id);
    if(deletedProducto){
        res.status(204).send();
    }else{
        res.status(404).json({message:'Producto dont delete'});
    }
});

router.get('/categoria/:categoriaId',async(req,res)=>{
    try {
        const result=await productoService.getProductosByCategoria(req.params.categoriaId);
        res.json(result);
    } catch (error) {
        if(error,message==='Categoria not found'){ //=== : evalua tipo de dato
            res.status(404).json({error:error.message});
        }else{
            res.status(500).json({error:error.message});
        }
    }
});

router.put('/restore/:id',async(req,res)=>{
    const restoredProducto=await productoService.restoreProducto(req.params.id);
    if(restoredProducto){
        res.status(204).send();
    }else{
        res.status(404).json({message:'Producto dont restore'});
    }
});
module.exports=router;