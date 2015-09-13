var btn = document.getElementById("sendAjax");
var xmlHttp = new XMLHttpRequest();
btn.onclick = function() {
	xmlHttp.onreadystatechange = function() {
		if (0 == xmlHttp.readyState) {
			console.info("请求未初始化（在调用 open() 之前） ");
		} else if (1 == xmlHttp.readyState) {
			console.info("请求已提出（调用 send() 之前）");
		} else if (2 == xmlHttp.readyState) {
			console.info("请求已发送（这里通常可以从响应得到内容头部）");
		} else if (3 == xmlHttp.readyState) {
			console.info("请求处理中（响应中通常有部分数据可用，但是服务器还没有完成响应）");
		} else if (4 == xmlHttp.readyState) {
			console.info("请求已完成（可以访问服务器响应并使用它）");
			var jsonStr = xmlHttp.responseText;
			console.debug(JSON.parse(jsonStr));
			document.getElementById("show").innerHTML = jsonStr;
			
		}
	}
	xmlHttp.open("GET", "/backJson", true);
	xmlHttp.send(null);
}