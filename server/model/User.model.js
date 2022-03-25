const pool = require('./db');

class UserModel {

    static async getIdByUsername(username, conn=null) {
        try {
            const mysql = conn? conn : pool;

            const stmt = 'SELECT user_id FROM user WHERE username = ?';
            const results = await mysql.query(stmt, [ username ]);

            return results[0][0].user_id;
        } catch (error) {
            throw new Error(error);
        }
    }

    static async getByUsername(username, conn) {
        try {
            const mysql = conn? conn : pool;

            const stmt = 'SELECT * from user WHERE username = ?';
            const results = await mysql.query(stmt, [ username ]);

            return results[0][0];
        } catch (error) {
            throw new Error(error);
        }
    }
}

module.exports = UserModel;