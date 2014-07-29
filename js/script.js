function fnAjax (sType, oData) {//ajax函数封装
	var random = Math.random();
	$.ajax({
		type: sType, 
		url: "action.json?random="+random,
		data: oData,
		success: function(data){
			//请求成功与否 确定于服务返回的status是否正确，1 指代正确响应并处理请求
			if (data.status==1) {
				console.log("success");
			}else{
				console.log("fail");
			}
		}
	});
	
}

function fnPraise() {//点赞事件处理 发送请求并存入本地 改变按钮样式
	var el = $("#btnPraise");
	if (el.hasClass("unpraised")) {
		el.removeClass("unpraised");
		el.addClass("praised");
		var oData = {type:"plusone"};
		var sType = "GET";
		fnAjax(sType, oData);
		if (('localStorage' in window) && window['localStorage'] !== null) {
			localStorage.setItem("praiseStatus", 1);
		};
	}else if(el.hasClass("praised")){
		el.removeClass("praised");
		el.addClass("unpraised");
		var oData = {type:"minusone"};
		var sType = "GET";
		fnAjax(sType, oData);
		if (('localStorage' in window) && window['localStorage'] !== null) {
			localStorage.setItem("praiseStatus", 0);
		};
	}else{
		console.log("点赞button类名出错");
		return;
	}
}

function fnShare () {//点赞事件处理 发送请求并存入本地
	var reason = $('#shareReason').val();
	var data = {type: "share", reason: reason};
	var sType = "POST"
	fnAjax(sType, data);
	localStorage.setItem("shareReason", data.reason);
	$('#shareModal').modal('hide');
}

$("#btnShare").click(fnShare);
$("#btnPraise").click(fnPraise);

var btnPraise = $("#btnPraise");
// 用HTML5 localStorage把plusone状态 取出
if ( localStorage.getItem("praiseStatus") == 1 ) {
	btnPraise.removeClass('unpraised');
	btnPraise.addClass('praised');
}else{
	btnPraise.removeClass('praised');
	btnPraise.addClass('unpraised');
}
//localStorage 把分享理由取出
if (localStorage.getItem("shareReason")) {
	$('#shareReason').val(localStorage.getItem("shareReason"));
};
