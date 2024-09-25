const User = require('../models/User.model.js');
async function createUser(options) {
  const user = new User(
    options.nombreCompleto,
    options.tipoDocumento,
    options.documento,
    options.contraseña,
    options.gmail,
    options.rol,
    options.estado,
    options.direccion,
    options.telefono
  );

  let userResult;

  try {
    userResult = await user.createUser();
  } catch (error) {
    if (error.statusCode) throw error;
    console.log(error);
    throw {
      ok: false,
      statusCode: 500,
      data: 'Ocurrió un error al crear el usuario'
    };
  }

  return {
    message: 'Usuario creado exitosamente',
  };
}

async function viewUsers() {
  const user = new User();
  let userResult;

  try {
    userResult = await user.viewUsers();
  } catch (error) {
    if (error.statusCode) throw error;
    console.log(error);
    throw {
      ok: false,
      statusCode: 500,
      data: 'Ocurrió un error al obtener los usuarios'
    };
  }

  return userResult;
}

async function updateUser(options) {
  const user = new User(
    options.nombreCompleto,
    options.tipoDocumento,
    options.documento,
    options.contraseña,
    options.gmail,
    options.rol,
    options.estado,
    options.direccion,
    options.telefono
  );

  try {
    userResult = await user.updateUser(options.id);
  } catch (error) {
    if (error.statusCode) throw error;
    console.log(error);
    throw {
      ok: false,
      statusCode: 500,
      data: 'Ocurrió un error al actualizar el usuario'
    };
  }

  return {
    message: 'Usuario actualizado exitosamente',
  };
}

async function deleteUser(options) {
  const user = new User();

  try {
    userResult = await user.deleteUser(options.id);
  } catch (error) {
    if (error.statusCode) throw error;
    console.log(error);
    throw {
      ok: false,
      statusCode: 500,
      data: 'Ocurrió un error al eliminar el usuario'
    };
  }

  return {
    message: 'Usuario eliminado exitosamente',
  };
}

module.exports = {
  createUser,
  viewUsers,
  updateUser,
  deleteUser
};