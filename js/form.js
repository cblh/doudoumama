function fnAjax (sType, oData) {//ajax函数封装
    var random = Math.random();
	$.ajax({                     
	  	type: sType, 
	  	url: "action.json?random="+random,
	  	data: oData,  
 		success: function(data){
 			//请求成功与否 确定于服务返回的status是否正确，本例 1 指代正确响应并处理请求
  			if (data.status==1) {
  				console.log("success");
  			}else{
  				console.log("fail");
  			}
		}
	});
	
}
function fnShare () {
	var reason = $('textarea').val();
	var data = {type: "share", reason: reason};
	var sType = "POST"
	fnAjax(sType, data);
	window.returnValue = data.reason;
	localStorage.setItem("shareReason", data.reason);
	window.close();
	return false;
}
var obj = window.dialogArguments;
// alert("您传递的参数为：" + obj.sReason);
var text = document.getElementsByTagName('textarea')[0];
text.value = obj.sReason;
var btn = document.getElementsByTagName('button')[0];
btn.onclick = fnShare;