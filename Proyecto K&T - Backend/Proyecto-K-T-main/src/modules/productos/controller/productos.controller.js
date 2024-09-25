const Productos = require('../models/Productos.models.js');
async function createProducto(options) {
  const productos = new Productos(
    options.nombre,
    options.lugarDeUso,	
    options.tipo,
    options.precio,
    
  );

  let productosResult;

  try {
    productosResult = await productos.createProducto();
  } catch (error) {
    if (error.statusCode) throw error;
    console.log(error);
    throw {
      ok: false,
      statusCode: 500,
      data: 'Ocurrió un error al crear el producto'
    };
  }

  return {
    message: 'Producto creado exitosamente',
  };
}

async function viewProductos() {
  const productos = new Productos();
  let productosResult;

  try {
    productosResult = await productos.viewProductos();
  } catch (error) {
    if (error.statusCode) throw error;
    console.log(error);
    throw {
      ok: false,
      statusCode: 500,
      data: 'Ocurrió un error al obtener los productos'
    };
  }

  return productosResult;
}

async function updateProducto(options) {
  const productos = new Productos(
    options.nombre,
    options.lugarDeUso,	
    options.tipo,
    options.precio,
  );

  try {
    productosResult = await productos.updateProducto(options.id);
  } catch (error) {
    if (error.statusCode) throw error;
    console.log(error);
    throw {
      ok: false,
      statusCode: 500,
      data: 'Ocurrió un error al actualizar el producto'
    };
  }

  return {
    message: 'Producto actualizado exitosamente',
  };
}

async function deleteProducto(options) {
  const productos = new Productos();

  try {
    productosResult = await productos.deleteProducto
    (options.id);
  } catch (error) {
    if (error.statusCode) throw error;
    console.log(error);
    throw {
      ok: false,
      statusCode: 500,
      data: 'Ocurrió un error al eliminar el producto'
    };
  }

  return {
    message: 'producto eliminado exitosamente',
  };
}

module.exports = {
  createProducto,
  viewProductos,
  updateProducto,
  deleteProducto,
};