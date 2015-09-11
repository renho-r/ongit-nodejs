var mysql = require('mysql');  
      
var TEST_DATABASE = 'b2core';  
var TEST_TABLE = 'tb_user';  
  
//创建连接  
var client = mysql.createConnection({
  'host': '127.0.0.1',
  'port': '3306',
  user: 'root',  
  password: '',  
});  

client.connect();
client.query("use " + TEST_DATABASE);

client.query(  
  'SELECT * FROM ' + TEST_TABLE,  
  function selectCb(err, results, fields) {  
    if (err) {  
      throw err;  
    }  
      
      if(results)
      {
          for(var i = 0; i < results.length; i++)
          {
              console.log("%d\t%s\t%s", results[i].id, results[i].username, results[i].email);
          }
      }    
    client.end();  
  }  
);