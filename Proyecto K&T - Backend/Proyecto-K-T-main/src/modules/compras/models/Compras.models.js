const getConnection = require('../../../interface/DBconn.js');

// Compras model
class User {
    constructor(fecha_compra, estado, ubicacion, id_usuario, id_producto) {
        this.fecha_compra = fecha_compra;
        this.estado = estado;
        this.ubicacion = ubicacion;
        this.id_usuario = id_usuario;
        this.id_producto = id_producto;
    }

    async createCompra() {
        const connection = await getConnection();
        try {
            const [result] = await connection.query(`
                INSERT INTO Compras (fecha_compra, estado, ubicacion, id_usuario, id_producto)
                VALUES (?, ?, ?, ?, ?)
            `, [this.fecha_compra,
                this.estado,
                this.ubicacion,
                this.id_usuario,
                this.id_producto]);
            const comprasId = result.insertId;

            return { id: comprasId }; // Devuelve el ID de la nueva compra
        } catch (error) {
            console.log(error);
            throw {
                ok: false,
                statusCode: 500,
                data: 'Ocurrió un error al insertar la Compra'
            };
        } finally {
            connection.release(); // Libera la conexión de vuelta al pool
        }
    }

    async viewCompras() {
        const connection = await getConnection();
        try {
            const [result] = await connection.query(`
                SELECT *
                FROM Compras
            `);
            return result; // Devuelve el resultado de la consulta
        } catch (error) {
            console.log(error);
            throw {
                ok: false,
                statusCode: 500,
                data: 'Ocurrió un error al obtener las Compras'
            };
        } finally {
            connection.release(); // Libera la conexión de vuelta al pool
        }
    }

    async updateCompras(comprasId) {
        const connection = await getConnection();
        try {
            await connection.query(`
                UPDATE Compras
                SET fecha_compra = ?,
                    estado = ?,
                    ubicacion = ?,
                    id_usuario = ?,
                    id_producto = ?
                WHERE id = ?
            `, [this.fecha_compra,
                this.estado,
                this.ubicacion,
                this.id_usuario,
                this.id_producto,
                comprasId]);
            return { id: comprasId }; // Devuelve el ID de la compra actualizada
        } catch (error) {
            console.log(error);
            throw {
                ok: false,
                statusCode: 500,
                data: 'Ocurrió un error al actualizar la Compra'
            };
        } finally {
            connection.release(); // Libera la conexión de vuelta al pool
        }
    }

    async deleteCompras(comprasId) {
        const connection = await getConnection();
        try {
            await connection.query(`
                DELETE FROM Compras
                WHERE id = ?
            `, [comprasId]);
            return { id: comprasId }; // Devuelve el ID de la compra eliminada
        } catch (error) {
            console.log(error);
            throw {
                ok: false,
                statusCode: 500,
                data: 'Ocurrió un error al eliminar la Compra'
            };
        } finally {
            connection.release(); // Libera la conexión de vuelta al pool
        }
    }
}
module.exports = User;


