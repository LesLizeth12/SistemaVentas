const express = require('express');
const usuarioService =require('../services/UsuarioService');
const router=express.Router();

router.get('/',async(req,res)=>{
    const user=await usuarioService.getAllUsers();
    res.json(user);
});

router.get('/:id/',async(req,res)=>{
    const venta=await usuarioService.getUserById(req.params.id);
    if(venta){
        res.json(venta);
    }else{
        res.status(404).json({message:'Usuario no found'});
    }
});

router.post('/',async(req,res)=>{
    const newUser=await usuarioService.createUser(req.body);
    res.status(201).json(newUser);
});

router.put('/:id',async(req,res)=>{
    const updateUser=await usuarioService.updateUser(req.params.id,req.body);
    if(updateUser)
        res.status(201).json(updateUser);
    else
    res.status(404).json({message:'Usuario not updated'});
});

router.delete('/:id',async(req,res)=>{
    const deleteUser=await usuarioService.deleteUser(req.params.id);
    if(deleteUser){
        res.status(204).send();
    }else{
        res.status(404).json({message:'Usuario dont delete'});
    }
});

router.put('/restore/:id',async(req,res)=>{
    const restoredCategoria=await usuarioService.restoreUser(req.params.id);
    if(restoredCategoria){
        res.status(204).send();
    }else{
        res.status(404).json({message:'Categoria dont restore'});
    }
});

router.get('/getusername/:username/',async(req,res)=>{
    const venta=await usuarioService.getUserByUsername(req.params.username);
    if(venta){
        res.json(venta);
    }else{
        res.status(404).json({message:'Usuario no found'});
    }
});


module.exports=router;