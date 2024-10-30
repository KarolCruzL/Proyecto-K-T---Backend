const Router = require('express');

// API middlewares
const { createProductoAPI, viewProductoAPI, updateProductoAPI, deleteProductoAPI} = require('../api/Productos.api');

// Inicializar Productos
const router = Router();

// Methods POST
router.post('/Productos/createProducto', createProductoAPI);

// Methods GET
router.get('/Productos/viewProducto', viewProductoAPI);

// Rutas put
router.put('/Productos/updateProducto', updateProductoAPI);

// Rutas delete
router.delete('/Productos/deleteProducto', deleteProductoAPI);

module.exports = router;