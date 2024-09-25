const getConnection = require('../../../interface/DBconn.js');

// Productos model
class User {
    constructor( nombre, lugarDeUso, tipo, precio) {
        this.nombre= nombre;
        this.lugarDeUso = lugarDeUso;
        this.tipo = tipo;
        this.precio = precio;
       
  }

  async createProducto() {
    const connection = await getConnection();
    try {
      // Ejecuta la consulta de inserción

      // id	name	user_name	keyword	rol	email	state	phone_number
      const [result] = await connection.query(`
        INSERT INTO Productos (nombre, lugarDeUso, tipo, precio)
        VALUES (?, ?, ?, ?)
      `, [this.nombre,
        this.lugarDeUso,
        this.tipo,
        this.precio]);
      // Obtén el ID del último registro insertado
      const ProductosId = result.insertId;

      return { id: ProductosId }; // Devuelve el ID del nuevo usuario
    } catch (error) {
      console.log(error);
      throw {
        ok: false,
        statusCode: 500,
        data: 'Ocurrió un error al insertar el Producto'
      };
    } finally {
      connection.release(); // Libera la conexión de vuelta al pool
    }
  }

  async viewProductos() {
    const connection = await getConnection();
    try {
      // Ejecuta la consulta de selección
      const [result] = await connection.query(`
        SELECT *
        FROM Productos
      `);
      return result; // Devuelve el resultado de la consulta
    } catch (error) {
      console.log(error);
      throw {
        ok: false,
        statusCode: 500,
        data: 'Ocurrió un error al obtener los Productos'
      };
    } finally {
      connection.release(); // Libera la conexión de vuelta al pool
    }
  }

  async updateProductos(ProductosId) {
    const connection = await getConnection();
    try {
      // Ejecuta la consulta de actualización
      await connection.query(`
        UPDATE Productos
        SET nombre = ?,
        lugarDeUso = ?,
        tipo = ?,
        precio = ?,
        WHERE id = ?
      `, [this.nombre,
        this.lugarDeUso,
        this.tipo,
        this.precio, ProductosId]);
      return { id: ProductosId }; // Devuelve el ID del usuario actualizado
    } catch (error) {
      console.log(error);
      throw {
        ok: false,
        statusCode: 500,
        data: 'Ocurrió un error al actualizar el Producto'
      };
    } finally {
      connection.release(); // Libera la conexión de vuelta al pool
    }
  }

  async deleteProductos(ProductosId) {
    const connection = await getConnection();
    try {
      // Ejecuta la consulta de eliminación
      await connection.query(`
        DELETE FROM Productos
        WHERE id = ?
      `, [ProductosId]);
      return { id: ProductosId }; // Devuelve el ID del usuario eliminado
    } catch (error) {
      console.log(error);
      throw {
        ok: false,
        statusCode: 500,
        data: 'Ocurrió un error al eliminar el Producto'
      };
    } finally {
      connection.release(); // Libera la conexión de vuelta al pool
    }
  }
}
module.exports = Productos;