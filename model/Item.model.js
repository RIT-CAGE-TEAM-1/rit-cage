const pool = require('./db');

class ItemModel {
    static async createOne(item, connection=null) {
        try {
            const mysql = connection? connection : pool;

            const stmt = `INSERT INTO item(
                    item_category_id, 
                    item_type_id, 
                    item_model_id,
                    barcode,
                    comments, 
                    tags,
                    available,
                    active,
                    location,
                    serial,
                    item_condition
                ) VALUES (?,?,?,?,?,?,?,?,?,?,?)`;
            await mysql.query(stmt, item);
        } catch (error) { throw new Error(error); }
    }

    static async createMany(items, connection=null) {
        try {
            const mysql = connection? connection : pool;

            const stmt = `INSERT INTO item(
                    item_category_id, 
                    item_type_id, 
                    item_model_id,
                    barcode,
                    comments, 
                    tags,
                    available,
                    active,
                    location,
                    serial,
                    item_condition
                ) VALUES ?`;

                await mysql.query(stmt, [ items ]);
        } catch (error) { throw new Error(error) }
    }

    static async getEventsAndLogs(itemModelId, connection=null) {
        try {
            const mysql = connection? connection : pool;

            const stmt = `SELECT 
                r.status, 
                i.item_model_id, 
                i.serial, 
                i.item_condition, 
                r.reservation_date
            FROM item i
            RIGHT JOIN reservation_item ri ON i.item_id = ri.item_id
            RIGHT JOIN reservation r ON r.reservation_id = ri.reservation_id 
            WHERE r.reservation_date >= curdate() 
            ORDER BY r.reservation_date`;
            const results = await mysql.query(stmt, [ itemModelId ]);

            return results[0];
        } catch (error) { throw new Error(error); }
    }

    static async get(id, connection=null) {
        try {
            const mysql = connection? connection : pool;

            const stmt = 'SELECT * FROM item WHERE item_id = ?';
            const results = await mysql.query(stmt, [ id ]);

            return results[0];
        } catch (error) { throw new Error(error); }
    }

    static async update(id, updatedItem, connection=null) {
        try {
            const mysql = connection? connection : pool;

            const stmt = 'UPDATE item SET ? WHERE item_id = ?';
            await mysql.query(stmt, [ updatedItem, id ]);

            return;
        } catch (error) { throw new Error(error); }
    }

    static async delete(id, connection=null) {
        try {
            const mysql = connection? connection : pool;

            const stmt = 'DELETE FROM item WHERE item_id = ?';
            await mysql.query(stmt, [ id ]);
        } catch (error) { throw new Error(error); }
    }

    static async getByName(searchQuery, connection=null) {
        try {
            const mysql = connection? connection : pool;

            const stmt = 'SELECT FROM item WHERE'
        } catch (error) {
            throw new Error(error);
        }
    }
}

module.exports = ItemModel;