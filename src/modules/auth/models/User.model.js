const getConnection = require('../../../interface/DBconn.js');

// User model
class User {
    constructor( nombreCompleto, tipoDocumento, documento, contraseña, gmail, rol, estado, direccion, telefono) {
        this.nombreCompleto = nombreCompleto;
        this.tipoDocumento = tipoDocumento;
        this.documento = documento;
        this.contraseña = contraseña;
        this.gmail = gmail;
        this.rol = rol;
        this.estado = estado;
        this.direccion = direccion;
        this.telefono = telefono;
  }

  async createUser() {
    const connection = await getConnection();
    try {
      // Ejecuta la consulta de inserción

      // id	name	user_name	keyword	rol	email	state	phone_number
      const [result] = await connection.query(`
        INSERT INTO usuarios (nombre_completo, tipo_documento, documento, contraseña, gmail, rol, estado, direccion, telefono)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [this.nombreCompleto, this.tipoDocumento, this.documento, this.contraseña, this.gmail, this.rol, this.estado, this.direccion, this.telefono]);
      // Obtén el ID del último registro insertado
      const userId = result.insertId;

      return { id: userId }; // Devuelve el ID del nuevo usuario
    } catch (error) {
      console.log(error);
      throw {
        ok: false,
        statusCode: 500,
        data: 'Ocurrió un error al insertar el usuario'
      };
    } finally {
      connection.release(); // Libera la conexión de vuelta al pool
    }
  }

  async viewUsers() {
    const connection = await getConnection();
    try {
      // Ejecuta la consulta de selección
      const [result] = await connection.query(`
        SELECT *
        FROM usuarios
      `);
      return result; // Devuelve el resultado de la consulta
    } catch (error) {
      console.log(error);
      throw {
        ok: false,
        statusCode: 500,
        data: 'Ocurrió un error al obtener los usuarios'
      };
    } finally {
      connection.release(); // Libera la conexión de vuelta al pool
    }
  }

  async updateUser(userId) {
    const connection = await getConnection();
    try {
      // Ejecuta la consulta de actualización
      await connection.query(`
        UPDATE usuarios
        SET nombre_completo = ?,
        tipo_documento = ?,
        documento = ?,
        contraseña = ?,
        gmail = ?,
        rol = ?,
        estado = ?,
        direccion = ?,
        telefono = ?
        WHERE id = ?
      `, [this.nombreCompleto, this.tipoDocumento, this.documento, this.contraseña,  this.gmail, this.rol, this.estado, this.direccion, this.telefono, userId]);
      return { id: userId }; // Devuelve el ID del usuario actualizado
    } catch (error) {
      console.log(error);
      throw {
        ok: false,
        statusCode: 500,
        data: 'Ocurrió un error al actualizar el usuario'
      };
    } finally {
      connection.release(); // Libera la conexión de vuelta al pool
    }
  }

  async deleteUser(userId) {
    const connection = await getConnection();
    try {
      // Ejecuta la consulta de eliminación
      await connection.query(`
        DELETE FROM usuarios
        WHERE id = ?
      `, [userId]);
      return { id: userId }; // Devuelve el ID del usuario eliminado
    } catch (error) {
      console.log(error);
      throw {
        ok: false,
        statusCode: 500,
        data: 'Ocurrió un error al eliminar el usuario'
      };
    } finally {
      connection.release(); // Libera la conexión de vuelta al pool
    }
  }
}
module.exports = User;