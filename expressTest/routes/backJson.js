var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  var date = new Date();
  res.send({'id': 1, 'name': 'renho', 'time': date.getFullYear() + "-" + date.getMonth() + "-" + date.getDay()});
});

module.exports = router;