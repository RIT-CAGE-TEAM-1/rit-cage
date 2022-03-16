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

            const stmt = `SELECT 
                item.item_id,
                item_category.category_name,
                item_type.type_name,
                item.barcode,
                item.comments,
                item.tags,
                item.available,
                item.active,
                item.location,
                item.item_condition,
                item.serial
            FROM item 
            INNER JOIN item_category USING(item_category_id)
            INNER JOIN item_type USING(item_type_id)
            WHERE item_id = ?
            LIMIT 1`;
            const results = await mysql.query(stmt, [ id ]);

            return results[0][0];
        } catch (error) { throw new Error(error); }
    }

    static async getOneAvailable(itemModelId, conn=null) {
        try {
            const mysql = conn? conn : pool;

            const stmt = `SELECT 
                item.*,
                item_category.category_name,
                item_type.type_name,
                item_model.model_name
            FROM item 
            INNER JOIN item_category USING(item_category_id)
            INNER JOIN item_type USING(item_type_id)
            INNER JOIN item_model using(item_model_id)
            WHERE item.item_model_id = ? AND available = 1 
            LIMIT 1`;

            const results = await mysql.query(stmt, [ itemModelId ]);

            return results[0][0];
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