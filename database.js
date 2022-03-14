const mysql = require('mysql2');

const conn = mysql.createConnection({
    host            : '159.65.220.66',
    user            : 'iste501',
    password        : 'Iste501Cage',
    database        : 'cage'
});

conn.connect(function(err) {
  if (err) throw err;
  console.log('Database is connected successfully !');
});
module.exports = conn;