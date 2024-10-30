const ResponseBody = require('../../../shared/model/responseBody.model');
const { createProducto, viewProductos, updateProducto, deleteProducto } = require('../controller/producto.controller');

const createProductoAPI = async (req, res) => {
  let { nombre,	lugarDeUso,	tipo, precio } = req.body;
  let message;

  try {
    let response = await createProducto({	nombre,	lugarDeUso,	tipo, precio });
    message = new ResponseBody(true, 200, response);
  } catch (error) {
    if (error.statusCode) {
      message = new ResponseBody(error.ok, error.statusCode, error.data);
    } else {
      console.log(error);
      message = new ResponseBody(false, 500, 'Ocurrió un error al procesar la solicitud.');
    }
  }

  return res.json(message);

}

const viewProductosAPI = async (req, res) => {
  let message;

  try {
    let response = await viewProductos();
    message = new ResponseBody(true, 200, response);
  } catch (error) {
    if (error.statusCode) {
      message = new ResponseBody(error.ok, error.statusCode, error.data);
    } else {
      console.log(error);
      message = new ResponseBody(false, 500, 'Ocurrió un error al procesar la solicitud.');
    }
  }

  return res.json(message);
}

const updateProductoAPI = async (req, res) => {
  let {	nombre,	lugarDeUso,	tipo, precio, id } = req.body;
  let message;

  if (!id) {
    return res.json(new ResponseBody(false, 400, 'El ID del usuario es requerido.'));
  }

  try {
    let response = await updateProducto({ nombre,	lugarDeUso,	tipo, precio, id });
    message = new ResponseBody(true, 200, response);
  } catch (error) {
    if (error.statusCode) {
      message = new ResponseBody(error.ok, error.statusCode, error.data);
    } else {
      console.log(error);
      message = new ResponseBody(false, 500, 'Ocurrió un error al procesar la solicitud.');
    }
  }

  return res.json(message);
}

const deleteProductoAPI = async (req, res) => {
  let { id } = req.body;
  let message;

  if (!id) {
    return res.json(new ResponseBody(false, 400, 'El ID del producto es requerido.'));
  }

  try {
    let response = await deleteProducto({ id });
    message = new ResponseBody(true, 200, response);
  } catch (error) {
    if (error.statusCode) {
      message = new ResponseBody(error.ok, error.statusCode, error.data);
    } else {
      console.log(error);
      message = new ResponseBody(false, 500, 'Ocurrió un error al procesar la solicitud.');
    }
  }

  return res.json(message);
}


module.exports = {
  createProductoAPI,
  viewProductosAPI,
  updateProductoAPI,
  deleteProductoAPI,
};