const ResponseBody = require('../../../shared/model/responseBody.model');
const { createUser, viewUsers, updateUser, deleteUser } = require('../controller/auth.controller');

const createUserAPI = async (req, res) => {
  let { nombreCompleto, tipoDocumento,	documento,	contraseña,	gmail,	rol, estado, direccion,	telefono } = req.body;
  let message;

  try {
    let response = await createUser({ nombreCompleto, tipoDocumento,	documento,	contraseña,	gmail,	rol, estado, direccion,	telefono });
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

const viewUsersAPI = async (req, res) => {
  let message;

  try {
    let response = await viewUsers();
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

const updateUserAPI = async (req, res) => {
  let {nombreCompleto, tipoDocumento,	documento,	contraseña,	gmail,	rol, estado, direccion,	telefono, id} = req.body;
  let message;

  if (!id) {
    return res.json(new ResponseBody(false, 400, 'El ID del usuario es requerido.'));
  }

  try {
    let response = await updateUser({ nombreCompleto, tipoDocumento,	documento,	contraseña,	gmail,	rol, estado, direccion,	telefono, id });
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

const deleteUserAPI = async (req, res) => {
  let { id } = req.body;
  let message;

  if (!id) {
    return res.json(new ResponseBody(false, 400, 'El ID del usuario es requerido.'));
  }

  try {
    let response = await deleteUser({ id });
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
  createUserAPI,
  viewUsersAPI,
  updateUserAPI,
  deleteUserAPI,
};