// 对Date的扩展，将 Date 转化为指定格式的String 
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
// 例子： 
// (new Date()).format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
// (new Date()).format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
Date.prototype.format = function(fmt) { //author: meizz 
  var o = { 
    "M+" : this.getMonth()+1,                 //月份 
    "d+" : this.getDate(),                    //日 
    "h+" : this.getHours(),                   //小时 
    "m+" : this.getMinutes(),                 //分 
    "s+" : this.getSeconds(),                 //秒 
    "q+" : Math.floor((this.getMonth()+3)/3), //季度 
    "S"  : this.getMilliseconds()             //毫秒 
  }; 
  if(/(y+)/.test(fmt)) 
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
  for(var k in o) 
    if(new RegExp("("+ k +")").test(fmt)) 
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length))); 
  return fmt; 
}
Date.prototype.fromString = function(str) {
  return new Date(str.replace(/-/g, "/")); 
}
Date.prototype.addMonth = function(d, expr) {
  if(!d) {
    d = this;
  }
  var ty = d.getFullYear();
  var tm = d.getMonth();
  var dy = parseInt(ty) + parseInt(parseInt(expr)/12);
  var dm = parseInt(tm) + parseInt(parseInt(expr)%12);
  if(dm > 11) {
    dy++;
    dm -= 12;
  }
  if(dm < 0) {
    dy--;
    dm += 12;
  }
  var bD = new Date(d.getTime());
  bD.setFullYear(dy);
  bD.setMonth(dm);
  return bD;
}

Date.prototype.addDay = function(d, expr) {
  if(!d) {
    d = this;
  }
  var num = parseInt(expr);
  var exprNum = num * 24 * 60 * 60;
  var dT = d.getTime()/1000;
  var bT = parseInt(dT) + parseInt(exprNum);
  var bD = new Date(bT * 1000);
  return bD;
}