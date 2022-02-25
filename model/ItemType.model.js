const pool = require('./db');

class ItemTypeModel {

    static async getAll(connection=null) {
        try {
            const mysql = connection? connection : pool;

            const stmt = 'SELECT * FROM item_type';

            const results = await mysql.query(stmt)

            return results[0];
        } catch(error) {
            throw new Error(error)
        }
    }
}

module.exports = ItemTypeModel;