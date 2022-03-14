var createError = require('http-errors');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var db = require('./database');
var Json2csvParser = require('json2csv').Parser;
const fs = require('fs');
let today = new Date().toLocaleDateString()
let fileName = today + ".csv"
var app = express();
 
app.get('/export-csv',function(req,res){
  db.query("select r.status, i.item_model_id, i.serial, i.item_condition, r.reservation_date from item i right join reservation_item ri on i.item_id = ri.item_id right join reservation r on r.reservation_id = ri.reservation_id where r.reservation_date >= curdate() order by r.reservation_date;", function (err, reservation, fields) {
    if (err) throw err;
    console.log("reservations:");
     
    const jsonUsers = JSON.parse(JSON.stringify(reservation));
    console.log(jsonUsers);
 
    // Convert JSON to CSV data
    const csvFields = ['status', 'item_model_id', 'serial', 'item_condition', 'reservation_date'];
    const json2csvParser = new Json2csvParser({ csvFields });
    const csv = json2csvParser.parse(reservation);
 
    console.log(csv);
 
     res.setHeader("Content-Type", "text/csv");
     res.setHeader("Content-Disposition", "attachment; filename=reservationLogs_" + fileName);
 
     res.status(200).end(csv);
  });
});
 
// port must be set to 8080 because incoming http requests are routed from port 80 to port 8080
app.listen(3000, function () {
    console.log('Log app is running on port 3000');
});
 
module.exports = app;