
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
function fnPraise() {
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

function fnShowModal () {
	var obj = new Object();
	obj.win = window;
	if (('localStorage' in window) && window['localStorage'] !== null) {
		obj.sReason = localStorage.getItem("shareReason");
	};
    var random = Math.random();

	var returnValue = window.showModalDialog("form.html?g="+random, obj) || "";
	console.log(returnValue);

	if (('localStorage' in window) && window['localStorage'] !== null) {
		localStorage.setItem("shareReason", returnValue);
	};
}


$("#btnShare").click(fnShowModal);
$("#btnPraise").click(fnPraise);
var btnPraise = $("#btnPraise");

if ( localStorage.getItem("praiseStatus") == 1 ) {
	btnPraise.removeClass('unpraised');
	btnPraise.addClass('praised');
}else{
	btnPraise.removeClass('praised');
	btnPraise.addClass('unpraised');
}