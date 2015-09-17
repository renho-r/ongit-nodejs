var express = require('express');
var router = express.Router();
var qiniu = require('qiniu');
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  //PutPolicy();
  qiniu.conf.ACCESS_KEY = '';
  qiniu.conf.SECRET_KEY = '';
  var uptoken = new qiniu.rs.PutPolicy('sy-qn-pt').token();
  console.log(uptoken);
  var extra = new qiniu.io.PutExtra();
  console.log(extra);

  var target_path = 'h:\\a1.jpg';
  console.log(target_path);
  //使用同步方式重命名一个文件
  var readStream = fs.createReadStream('h:\\a.jpg');
  var writeStream = fs.createWriteStream(target_path);
  readStream.pipe(writeStream, function(){
    fs.unlinkSync('h:\\');
  });
  fs.readFile(target_path, function(err, data){
            console.log("data length is " + data.length);
            qiniu.io.put(uptoken, 'img/' + 'a1.jpg', data, extra, function(err, ret) {
                if(!err) {
                    // 上传成功， 处理返回值
//                    console.log(ret.key, ret.hash);
                    res.send(JSON.stringify({
                        "error" : 0,
                        "url" : qiniu_config.domain + ret.key
                    }));
                    console.log("上传成功！");
                } else {
                    // 上传失败， 处理返回代码
                   console.log(err);
                    // http://developer.qiniu.com/docs/v6/api/reference/codes.html
                    res.send(JSON.stringify({
                        "error" : 1,
                        "message" : "上传失败"
                    }));
                    console.log("上传失败！");
                }
                res.end();
                fs.unlinkSync(target_path);
            });
        });
});

module.exports = router;