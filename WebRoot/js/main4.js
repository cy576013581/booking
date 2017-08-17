/**
 * Created by cy on 2016/7/27.
 */
var username;
$(document).ready(function(){
	/*if(sessionStorage.getItem("username") == null){
		window.location.href="index.html";
	}*/
	username = sessionStorage.getItem("username");
	getbookingSum();
	getnoticeSum();
});

function getbookingSum(){
	$.ajax({ //使用ajax与服务器异步交互
        url:"Mybooking?s="+new Date().getTime(), //后面加时间戳，防止IE辨认相同的url，只从缓存拿数据
        type:"post",
        data: {username:username,act:"getbookingSum"}, //$('#yourformid').serialize()；向后台发送的form表单中的数据
        dataType:"text", //接收返回的数据方式为json
        error:function(XMLHttpRequest,textStatus,errorThrown){
            mui.toast("网络错误！");
        }, //错误提示
        
        success:function(data){ //data为交互成功后，后台返回的数据;
//        	alert(data);
        	$("#bookingsum").text(data);
        	
        }
    });
}


function getnoticeSum(){
	$.ajax({ //使用ajax与服务器异步交互
        url:"Mybooking?s="+new Date().getTime(), //后面加时间戳，防止IE辨认相同的url，只从缓存拿数据
        type:"post",
        data: {act:"getnoticeSum"}, //$('#yourformid').serialize()；向后台发送的form表单中的数据
        dataType:"text", //接收返回的数据方式为json
        error:function(XMLHttpRequest,textStatus,errorThrown){
            mui.toast("网络错误！");
        }, //错误提示
        
        success:function(data){ //data为交互成功后，后台返回的数据;
//        	alert(data);
        	$("#noticesum").text(data);
        	
        }
    });
}
