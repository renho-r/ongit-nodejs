var express = require('express');
var router = express.Router();
var multiparty  = require('multiparty');
var fs = require('fs');

/* GET home page. */
router.post('/upload', function(req, res, next) {
	var form = new multiparty.Form({uploadDir: './public/files/'});
	form.parse(req, function(err, fields, files) {
		console.info(err);
		console.info("filesname:" + files.mypic);
		for(var i in files.mypic) {
			console.info("i:" + i + files.mypic[i]);
		}

        var inputFile = files.mypic[0];
        var uploadedPath = inputFile.path;
        var dstPath = './public/files/img/' + inputFile.originalFilename;
    	//重命名为真实文件名
    	fs.rename(uploadedPath, dstPath, function(err) {
          	if(err){
            	console.log('rename error: ' + err);
          	} else {
            	console.log('rename ok');
          	}
        });
	});
	res.send('renho');









	//生成multiparty对象，并配置下载目标路径
    // var form = new multiparty.Form({uploadDir: './public/files/img/'});
    //下载后处理
    // form.parse(req, function(err, fields, files) {
    // 	console.info(err);
    // 	console.info(fields);
    // 	console.info(files);
      	/*var filesTmp = JSON.stringify(files,null,2);
  
      	if(err){
        	console.log('parse error: ' + err);
      	} else {
	        console.log('parse files: ' + filesTmp);
	        var inputFile = files.inputFile[0];
	        var uploadedPath = inputFile.path;
	        var dstPath = './public/files/img/' + inputFile.originalFilename;
        	//重命名为真实文件名
        	fs.rename(uploadedPath, dstPath, function(err) {
	          	if(err){
	            	console.log('rename error: ' + err);
	          	} else {
	            	console.log('rename ok');
	          	}
	        });
        }*/
    // });
  
    // res.writeHead(200, {'content-type': 'text/plain;charset=utf-8'});
    // res.write('received upload:\n\n');
    // res.end(util.inspect({fields: fields, files: filesTmp}));
 	/*if (req.files && req.files.mypic != 'undifined') {  
        var temp_path = req.files.mypic.path;  
        if (temp_path) { 
            fs.readFile(temp_path, 'utf-8', function(err, content) {  
                //文件的内容  
                console.log('content',content);  
                // 删除临时文件  
                fs.unlink(temp_path);  
            });  
        }  
    }*/
});

module.exports = router;