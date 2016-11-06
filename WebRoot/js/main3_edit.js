/**
 * Created by cy on 2016/7/27.
 */
var act;
var value;
var name;
var LocString;
var username;
$(document).ready(function(){
	LocString = window.location.href;
	$(".icon_back").on("click",function(){
    	window.history.back(-1); 
    });
	act = decodeURI(GetQueryString("act"));
	value = decodeURI(GetQueryString("value"));
	username = sessionStorage.getItem("username");
	if(act=="password"){
		$("#txt_title").text("修改密码");
	}else if(act=="depart"){
		$("#txt_title").text("修改所属部门");
		$("#inputcontent").val(value);
	}else if(act=="phone"){
		$("#txt_title").text("修改联系方式");
		$("#inputcontent").val(value);
	}
	
	$("#btn_ok").on("click",submit);
});

function submit() {
	var content=$("#inputcontent").val();
	$.ajax({ //使用ajax与服务器异步交互
        url:"Account?s="+new Date().getTime(), //后面加时间戳，防止IE辨认相同的url，只从缓存拿数据
        type:"POST",
        data: {username:username,act:"updateAccount",type:act,value:content}, //$('#yourformid').serialize()；向后台发送的form表单中的数据
//        dataType:"json", //接收返回的数据方式为json

        error:function(XMLHttpRequest,textStatus,errorThrown){
        	mui.toast("网络错误！");
        }, //错误提示

        success:function(data){ //data为交互成功后，后台返回的数据
        	mui.toast("修改成功！");
        	window.history.back(-1); 
        	
        }
    });
}

function GetQueryString(str){
	 var rs=new RegExp("(^|)"+str+"=([^&]*)(&|$)","gi").exec(LocString),tmp;
	 if(tmp=rs)return tmp[2];
	 return "没有这个参数";
}