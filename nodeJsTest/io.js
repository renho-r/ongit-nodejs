var fs = require("fs");

//readFile();
openFile();
//fileSta();
//writeFile();

function writeFile() {
	console.log("准备写入文件");
	fs.writeFile('input.txt', '我是通过写入的文件内容！',  function(err) {
	   if (err) {
	       return console.error(err);
	   }
	   console.log("数据写入成功！");
	   console.log("--------我是分割线-------------")
	   console.log("读取写入的数据！");
	   fs.readFile('input.txt', function (err, data) {
	      if (err) {
	         return console.error(err);
	      }
	      console.log("异步读取文件数据: " + data.toString());
	   });
	});
}

function fileSta() {
	console.log("准备打开文件！");
	fs.stat('input.txt', function (err, stats) {
	   if (err) {
	       return console.error(err);
	   }
	   console.log(stats);
	   console.log("读取文件信息成功！");
	   
	   // 检测文件类型
	   console.log("是否为文件(isFile) ? " + stats.isFile());
	   console.log("是否为目录(isDirectory) ? " + stats.isDirectory());    
	});
}

function openFile() {
	// 异步打开文件
	console.log("准备打开文件！");
	fs.open('input.txt', 'r+', function(err, fd) {
	    if (err) {
	       return console.error(err);
	    }
	  	console.log("文件打开成功！");  
	  	fs.close(fd, function(err){
			if (err){
				console.log(err);
			} 
			console.log("文件关闭成功");
		});   
	});
	
}

function readFile() {
	// 异步读取
	fs.readFile('input.txt', function (err, data) {
	   if (err) {
	       return console.error(err);
	   }
	   console.log("异步读取: " + data.toString());
	});

	// 同步读取
	var data = fs.readFileSync('input.txt');
	console.log("同步读取: " + data.toString());

	console.log("程序执行完毕。");	
}

