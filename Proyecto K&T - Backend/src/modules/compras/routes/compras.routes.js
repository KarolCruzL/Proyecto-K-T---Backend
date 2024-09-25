const Router = require('express');

// API middlewares
const { createComprasAPI, viewComprasAPI, updateComprasAPI, deleteComprasAPI} = require('../api/compras.api');

// Inicializar Productos
const router = Router();

// Methods POST
router.post('/Compras/createCompras', createComprasAPI);

// Methods GET
router.get('/Compras/viewCompras', viewComprasAPI);

// Rutas put
router.put('/Compras/updateCompras', updateComprasAPI);

// Rutas delete
router.delete('/Compras/deleteCompras', deleteComprasAPI);

module.exports = router;