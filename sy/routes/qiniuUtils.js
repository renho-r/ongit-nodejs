/**
 * 上传请求
 * @param req
 * @param res
 */
exports.doUpload = function(req, res){
    //console.log(req.files);
    if(req.files['imgFile'].size == 0){
        //使用同步方式删除一个文件
        fs.unlinkSync(req.files[i].path);
        console.log(' Successsfully removed an empty file!');
    } else {
        var target_path = '&lt; 我本地存图片的路径 &gt;' + req.files['imgFile'].name;
        console.log(target_path);
        //使用同步方式重命名一个文件
        var readStream = fs.createReadStream(req.files['imgFile'].path);
        var writeStream = fs.createWriteStream(target_path);
        readStream.pipe(writeStream, function(){
            fs.unlinkSync(req.files[i].path);
        });
        qiniu.conf.ACCESS_KEY = qiniu_config.AK;//qiniu_config是我的配置文件
        qiniu.conf.SECRET_KEY = qiniu_config.SK;
        var uptoken = new qiniu.rs.PutPolicy(qiniu_config.bucket).token();
        var extra = new qiniu.io.PutExtra();
        console.log( "file is exists ? " + fs.existsSync(target_path));
        fs.readFile(target_path, function(err, data){
            console.log("data length is " + data.length);
            qiniu.io.put(uptoken, 'img/' + req.files['imgFile'].name, data, extra, function(err, ret) {
                if(!err) {
                    // 上传成功， 处理返回值
//                    console.log(ret.key, ret.hash);
                    res.write(JSON.stringify({
                        "error" : 0,
                        "url" : qiniu_config.domain + ret.key
                    }));
                    console.log("上传成功！");
                } else {
                    // 上传失败， 处理返回代码
//                    console.log(err);
                    // http://developer.qiniu.com/docs/v6/api/reference/codes.html
                    res.write(JSON.stringify({
                        "error" : 1,
                        "message" : "上传失败"
                    }));
                    console.log("上传失败！");
                }
                res.end();
                fs.unlinkSync(target_path);
            });
        });
    }
};