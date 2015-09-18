var fileList;
$(function() {
	//阻止浏览器默认行。 
	$(document).on({
		dragleave : function(e) { //拖离 
			e.preventDefault();
		},
		drop : function(e) { //拖后放 
			e.preventDefault();
		},
		dragenter : function(e) { //拖进 
			e.preventDefault();
		},
		dragover : function(e) { //拖来拖去 
			e.preventDefault();
		}
	});
	//处理
	var box = $('.drop_area'); //拖拽区域 
	box[0].addEventListener("drop", function(e) {
		e.preventDefault(); //取消默认浏览器拖拽效果 
		fileList = e.dataTransfer.files; //获取文件对象 
		//检测是否是拖拽文件到页面的操作 
		if (fileList.length == 0) {
			return false;
		}
		//检测文件是不是图片 
		for(var fl=0; fl<fileList.length; fl++) {
			if (fileList[fl].type.indexOf('image') === -1) {
				alert("您拖的不是图片！");
				return false;
			}			
		}

		//拖拉图片到浏览器，可以实现预览功能 
		//$(".img-box").empty();
		for(var fl=0; fl<fileList.length; fl++) {
			if(0 == fl%9) {
				$(".img-box").append("<div class='clear'></div>");
			}
			var img = (window.URL||window.webkitURL).createObjectURL(fileList[fl]);
			var filename = fileList[fl].name; //图片名称 
			/*var filesize = Math.floor((fileList[fl].size) / 1024);
			if (filesize > 500) {
				alert("上传大小不能超过500K.");
				return false;
			}*/
			var str = "<div class='img-sim'><img src='" + img + "'></div>";
			$(".img-box").append(str);			
		}

		//上传 
		/*xhr = new XMLHttpRequest();
		xhr.open("post", "../php/upload.php", true);
		xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");

		var fd = new FormData();
		fd.append('mypic', fileList[0]);

		xhr.send(fd);*/
	}, false);
	$("#btn-upload").click(function() {
		for(var i=0; i<fileList.length; i++) {
			xhr = new XMLHttpRequest();
			xhr.open("post", "../test/upload", true);
			xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
			var fd = new FormData();
			fd.append('mypic', fileList[i]);
			xhr.send(fd);
		}
	})
})