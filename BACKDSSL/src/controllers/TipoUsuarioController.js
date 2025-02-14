const express = require('express');
const tipoUsuarioService =require('../services/TipoUsuarioService');
const router=express.Router();

router.get('/',async(req,res)=>{
    const tipoUser=await tipoUsuarioService.getAllTipoUsers();
    res.json(tipoUser);
});

router.get('/:id/',async(req,res)=>{
    const tipoUser=await tipoUsuarioService.getTipoUserById(req.params.id);
    if(tipoUser){
        res.json(tipoUser);
    }else{
        res.status(404).json({message:'TipoUsuario no found'});
    }
});

router.post('/',async(req,res)=>{
    const newTipoUser=await tipoUsuarioService.createTipoUser(req.body);
    res.status(201).json(newTipoUser);
});

router.put('/:id',async(req,res)=>{
    const updateTipoUser=await tipoUsuarioService.updateTipoUser(req.params.id,req.body);
    if(updateTipoUser)
        res.status(201).json(updateTipoUser);
    else
    res.status(404).json({message:'TipoUsuario not updated'});
});

router.delete('/:id',async(req,res)=>{
    const deleteTipoUser=await tipoUsuarioService.deleteTipoUser(req.params.id);
    if(deleteTipoUser){
        res.status(204).send();
    }else{
        res.status(404).json({message:'TipoUsuario dont delete'});
    }
});

router.put('/restore/:id',async(req,res)=>{
    const restoredCategoria=await tipoUsuarioService.restoreTipoUser(req.params.id);
    if(restoredCategoria){
        res.status(204).send();
    }else{
        res.status(404).json({message:'Categoria dont restore'});
    }
});
module.exports=router;