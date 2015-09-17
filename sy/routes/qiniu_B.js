var express = require('express');
var router = express.Router();
var fs = require('fs');
var qn = require('qn');
var http = require('http');

router.get('/', function(req, res, next) {
  var opt = {
   host:'proxy.asiainfo.com',
   port:'8080',
   method:'GET',//这里是发送的方法
   path:'http://up.qiniu.com/',     //这里是访问的路径
   headers:{
    //这里放期望发送出去的请求头
   }
  }
  //以下是接受数据的代码
  var body = '';
  var req = http.request(opt, function(res) {
    console.log("Got response: " + res.statusCode);
    res.on('data',function(d){
    body += d;
   }).on('end', function(){
    console.log(res.headers)
    console.log(body)
   });

  }).on('error', function(e) {
    console.log("Got error: " + e.message);
  })
  req.end();















  /*var client = qn.create({
    accessKey: '',
    secretKey: '',
    bucket: 'sy-qn-pt',
    domain: 'http://{bucket}.u.qiniudn.com',
    // timeout: 3600000, // default rpc timeout: one hour, optional
    // if your app outside of China, please set `uploadURL` to `http://up.qiniug.com/`
    //uploadURL: 'http://up.qiniu.com/',
  });
  var filepath = "h:\\a.jpg"
  // upload a file with custom key
  client.uploadFile(filepath, {key: 'qn/lib/client.js'}, function (err, result) {
    console.info(err);
    console.log(result);
    // {
    //   hash: 'FhGbwBlFASLrZp2d16Am2bP5A9Ut',
    //   key: 'qn/lib/client.js',
    //   url: 'http://qtestbucket.qiniudn.com/qn/lib/client.js'
    //   "x:ctime": "1378150371",
    //   "x:filename": "client.js",
    //   "x:mtime": "1378150359",
    //   "x:size": "21944",
    // }
  });*/
});

module.exports = router;