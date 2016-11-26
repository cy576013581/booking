/**
 * Created by cy on 2016/7/27.
 */
var username;
$(document).ready(function(){
	if(sessionStorage.getItem("username") == null){
		window.location.href="index.html";
	}
	username = sessionStorage.getItem("username");
	
	goTo();
	getAccount();
});

function cancle(){
	sessionStorage.removeItem("username");
	
}

function goTo() {
	$("#a_password").on("click",function(){
		location.href="main3_edit.html?act=password&value="+$("#password").text();
	});
	$("#a_depart").on("click",function(){
		location.href="main3_edit.html?act=depart&value="+$("#depart").text();
	});
	$("#a_phone").on("click",function(){
		location.href="main3_edit.html?act=phone&value="+$("#phone").text();
	});
}

function getAccount(){
	$.ajax({ //使用ajax与服务器异步交互
        url:"Account?s="+new Date().getTime(), //后面加时间戳，防止IE辨认相同的url，只从缓存拿数据
        type:"POST",
        data: {username:username,act:"getAccount"}, //$('#yourformid').serialize()；向后台发送的form表单中的数据
        dataType:"json", //接收返回的数据方式为json

        error:function(XMLHttpRequest,textStatus,errorThrown){
            //alert(XMLHttpRequest.status);
            //alert(XMLHttpRequest.readyState);
            //alert(textStatus);
            //alert(errorThrown);
            alert("网络错误！");
        }, //错误提示

        success:function(data){ //data为交互成功后，后台返回的数据
        	$("#username").text(username);
        	$("#depart").text(data.depart);
        	$("#phone").text(data.phone);
        }
    });
}