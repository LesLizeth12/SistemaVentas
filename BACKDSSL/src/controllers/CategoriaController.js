const express = require('express');
const categoriaService=require('../services/CategoriaService');
const router=express.Router();

router.get('/',async(req,res)=>{
    const categorias=await categoriaService.getAllCategorias();
    res.json(categorias);
});

router.get('/:id/',async(req,res)=>{
    const categoria=await categoriaService.getCategoriaById(req.params.id);
    if(categoria){
        res.json(categoria);
    }else{
        res.status(404).json({message:'categoria no found'});
    }
});

router.post('/',async(req,res)=>{
    const newCategoria=await categoriaService.createCategoria(req.body);
    res.status(201).json(newCategoria);
});

router.put('/:id',async(req,res)=>{
    const updateCategoria=await categoriaService.updateCategoria(req.params.id,req.body);
    if(updateCategoria)
        res.status(201).json(updateCategoria);
    else
    res.status(404).json({message:'Categoria not updated'});
});

router.delete('/:id',async(req,res)=>{
    const deletedCategoria=await categoriaService.deleteCategoria(req.params.id);
    if(deletedCategoria){
        res.status(204).send();
    }else{
        res.status(404).json({message:'Categoria dont delete'});
    }
});

router.put('/restore/:id',async(req,res)=>{
    const restoredCategoria=await categoriaService.restoreCategoria(req.params.id);
    if(restoredCategoria){
        res.status(204).send();
    }else{
        res.status(404).json({message:'Categoria dont restore'});
    }
});

module.exports=router;