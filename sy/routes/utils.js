var express = require('express');
var utils = require('./dateUtils');
var router = express.Router();

/* GET users listing. */
router.post('/', function(req, res, next) {
  res.send('renho');
});

router.post('/getThisDate', function(req, res, next) {
  //res.send(JSON.stringify({thisDate: (new Date()).format('yyyy-MM-dd hh:mm:ss.S')}));
  res.send(JSON.stringify({thisDate: '2015-10-01 00:00:00:999'}));
});
module.exports = router;
