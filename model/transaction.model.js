class Transaction {

    constructor(conn) {
        this.conn = conn;
    }

    async start() {
        try {
            await this.conn.query('START TRANSACTION');
            console.log('TRANSACTION STARTED');
        } catch (error) { throw new Error(error); }
    }

    async commit() {
        try {
            await this.conn.query('COMMIT');
            console.log('TRANSACTION COMMITTED');
        } catch (error) { throw new Error(error); }
    }

    async rollback() {
        try {
            await this.conn.query('ROLLBACK');
            console.log('TRANSACTION ROLLBACKED');
        } catch (error) { throw new Error(error); }
    }
}

module.exports = Transaction;