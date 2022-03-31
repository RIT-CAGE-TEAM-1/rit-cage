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

app.get('/export-common-csv',function(req,res){
  db.query("SELECT im.model_name, COUNT(DISTINCT ri.reservation_item_id) AS count FROM reservation_item ri JOIN item i ON i.item_model_id = ri.item_model_id JOIN item_model im ON im.item_model_id = i.item_model_id GROUP BY im.model_name ORDER BY 2 DESC;", function (err, reservation, fields) {
    if (err) throw err;
    console.log("Most commonly reserved:");
     
    const jsonUsers = JSON.parse(JSON.stringify(reservation));
    console.log(jsonUsers);
 
    // Convert JSON to CSV data
    const csvFields = ['model_name','count'];
    const json2csvParser = new Json2csvParser({ csvFields });
    const csv = json2csvParser.parse(reservation);
 
    console.log(csv);
 
     res.setHeader("Content-Type", "text/csv");
     res.setHeader("Content-Disposition", "attachment; filename=mostCommonlyReserved_" + fileName);
 
     res.status(200).end(csv);
  });
});
 
app.listen(3000, function () {
    console.log('Log app is running on port 3000');
});
 
module.exports = app;