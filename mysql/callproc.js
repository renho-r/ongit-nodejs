var mysql = require('mysql');

var TEST_DATABASE = '';

//创建连接  
var client = mysql.createConnection({
  'host': '10.1.249.246',
  'port': '3306',
  'user': '',
  'password': '',
});

client.connect();
client.query('use ' + TEST_DATABASE);
client.query('CALL createTable_renho();', function(err, rows, fields) {
  if (err) {
    throw err;
  }
  client.end();
});