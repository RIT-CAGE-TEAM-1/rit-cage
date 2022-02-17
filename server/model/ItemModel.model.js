const pool = require('./db');

class ItemModelModel {

    static async getAll(connection=null) {
        try {
            const mysql = connection? connection : pool;

            const stmt = 'SELECT * FROM item_model';
            const results = await mysql.query(stmt);

            return results[0];
        } catch (error) { throw new Error(error); }
    }

    static async get(id, connection=null) {
        try {
            const mysql = connection? connection : pool;

            const stmt = 'SELECT * FROM item_model WHERE item_id = ?';
            const results = await mysql.query(stmt, [ id ]);

            return results[0];
        } catch (error) { throw new Error(error); }
    }

    static async getByName(searchQuery, connection=null) {
        try {
            const mysql = connection? connection : pool;

            const stmt = 'SELECT FROM item_model WHERE model_name = ?';
            const results = await mysql.query(stmt, [ searchQuery ]);

            return results[0];
        } catch (error) {
            throw new Error(error);
        }
    }
}

module.exports = ItemModelModel;