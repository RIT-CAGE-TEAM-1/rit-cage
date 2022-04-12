const pool = require('./db');

class KitModel {

    static async create(newKit, conn=null) {
        try {
            const mysql = conn? conn : pool;

            const stmt = 'INSERT INTO kit SET ?';
            const results = await mysql.query(stmt, [ newKit ]);

            console.log("RESULTS: " + JSON.stringify(results));
            return results[0].insertId;
        } catch (error) {
            throw new Error(error);
        }
    }

    static async createKitInstance(newKitInstance, conn=null) {
        try {
            const mysql = conn? conn : pool;

            const stmt = 'INSERT INTO kit_instance SET ?';
            const results = await mysql.query(stmt, newKitInstance);

            return results[0].insertId;
        } catch (error) {
            throw new Error(error);
        }
    }

    static async createKitInstanceItem(newKitInstanceItem, conn=null) {
        try {
            const mysql = conn? conn : pool;

            const stmt = 'INSERT INTO kit_instance_item SET ?';
            await mysql.query(stmt, [ newKitInstanceItem ]);
        } catch (error) {
            throw new Error(error);
        }
    }

    static async createKitRestriction(newKitRestriction, conn=null) {
        try {
            const mysql = conn? conn : pool;

            const stmt = 'INSERT INTO kit_restriction SET ?';
            await mysql.query(stmt, [ newKitRestriction ]);
        } catch (error) {
            throw new Error(error);
        }
    }

    static async getAllOfUser(userId, conn=null) {
        try {
            const mysql = conn? conn : pool;

            const stmt = `SELECT *
            FROM kit
            LEFT JOIN kit_restriction ON kit.kit_id = kit_restriction.kit_id
            INNER JOIN kit_instance ON kit.kit_id = kit_instance.kit_id
            INNER JOIN kit_instance_item ON kit_instance.kit_instance_id = kit_instance_item.kit_instance_id
            INNER JOIN item ON kit_instance_item.item_id = item.item_id
            INNER JOIN item_model ON item.item_model_id = item_model.item_model_id
            WHERE kit.creator_id = ?`;

            const results = await mysql.query(stmt, [ userId ]);

            return results[0];
        } catch (error) {
            throw new Error(error);
        }
    }
}

/*
SELECT *
            FROM kit
            LEFT JOIN kit_restriction ON kit.kit_id = kit_restriction.kit_id
            INNER JOIN kit_instance ON kit.kit_id = kit_instance.kit_id
            INNER JOIN kit_instance_item ON kit_instance.kit_instance_id = kit_instance_item.kit_instance_id
            INNER JOIN item ON kit_instance_item.item_id = item.item_id
            INNER JOIN item_model ON item.item_model_id = item_model.item_model_id
            INNER JOIN reservation_item ON item.item_id = reservation_item.item_id
            INNER JOIN reservation ON reservation.reservation_id = reservation.reservation_id
            WHERE kit.creator_id = 115;
*/

module.exports = KitModel;