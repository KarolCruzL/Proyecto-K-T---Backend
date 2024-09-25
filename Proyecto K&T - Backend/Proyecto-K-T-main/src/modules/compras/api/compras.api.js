const ResponseBody = require('../../../shared/model/responseBody.model');
const { createCompra, viewCompras, updateCompra, deleteCompra } = require('../controller/compras.controller');

const createCompraAPI = async (req, res) => {
  let { fecha_compra, estado, ubicacion} = req.body;
  let message;

  try {
    let response = await createCompra({  fecha_compra, estado, ubicacion });
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

const viewComprasAPI = async (req, res) => {
  let message;

  try {
    let response = await viewCompras();
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

const updateCompraAPI = async (req, res) => {
  let { fechaCompra, estado, ubicacion, idUsuario, idProducto, id } = req.body;
  let message;

  if (!id) {
    return res.json(new ResponseBody(false, 400, 'El ID del usuario es requerido.'));
  }

  try {
    let response = await updateCompra({ fechaCompra, estado, ubicacion, idUsuario, idProducto, id });
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

const deleteCompraAPI = async (req, res) => {
  let { id } = req.body;
  let message;

  if (!id) {
    return res.json(new ResponseBody(false, 400, 'El ID de la compra es requerido.'));
  }

  try {
    let response = await deleteCompra({ id });
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
  createCompraAPI,
  viewComprasAPI,
  updateCompraAPI,
  deleteCompraAPI,
};