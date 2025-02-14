require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const categoriaController = require('./controllers/CategoriaController');
const productoController=require('./controllers/ProductoController');
const detalleventaController=require('./controllers/DetalleVentaController');
const ventaController=require('./controllers/VentaController');
const usuarioController=require('./controllers/UsuarioController');
const tipoUsuarioController=require('./controllers/TipoUsuarioController');
const personaController=require('./controllers/PersonaController');


const app =express();
app.use(express.json());
app.use(helmet());

app.use(helmet.referrerPolicy({
    policy: 'strict-origin-when-cross-origin'
}));

app.use((req, res,next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE,OPTIONS');
    next();
})

app.use('/api/categoria',categoriaController);
app.use('/api/producto',productoController);
app.use('/api/detalleventa',detalleventaController);
app.use('/api/venta',ventaController);
app.use('/api/usuario',usuarioController);
app.use('/api/tipousuario',tipoUsuarioController);
app.use('/api/persona',personaController);


const port=process.env.port || 3000;

app.listen(port,()=>{
    console.log(`servidor corriendo en http://localhost:${port}`); //AltGr+cierre de llave=comilla simple al reves
})
