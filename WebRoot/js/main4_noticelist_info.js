/**
 * Created by cy on 2016/7/4.
 */
//$(".list_layout").load("schedule.html #schedule_layout",null,function(){alert("加载成功")});
var LocString;
var id;
$(document).ready(function(){
	if(sessionStorage.getItem("username") == null){
		window.location.href="index.html";
	}
	$("#loading").show();
	$("#shapeloading").show();
	
	LocString = window.location.href;
	id = decodeURI(GetQueryString("id"));
	$(".icon_back").on("click",back);
	getInfo();
	
	$("#loading").hide();
	$("#shapeloading").hide();
});
function back(){
	window.history.back(-1); 
}
function GetQueryString(str){
	 var rs=new RegExp("(^|)"+str+"=([^&]*)(&|$)","gi").exec(LocString),tmp;
	 if(tmp=rs)return tmp[2];
	 return "没有这个参数";
}
function getInfo(){
    $.ajax({ //使用ajax与服务器异步交互
        url:"Mybooking?s="+new Date().getTime(), //后面加时间戳，防止IE辨认相同的url，只从缓存拿数据
        type:"POST",
        data: {act:"getnoticeById",id:id}, //$('#yourformid').serialize()；向后台发送的form表单中的数据
        dataType:"json", //接收返回的数据方式为json

        error:function(XMLHttpRequest,textStatus,errorThrown){
            //alert(XMLHttpRequest.status);
            //alert(XMLHttpRequest.readyState);
            //alert(textStatus);
            //alert(errorThrown);
            alert("网络错误！");
        }, //错误提示

        success:function(data){ //data为交互成功后，后台返回的数据
        	$("#text_title").text(data.title);
        	$("#releasetime").text(data.releasetime);
        	/*$("#text_content").text(data.content);*/
        	var p = $("<p id='text_content'>"+data.content+"</p>");
        	$(".box_body").append(p);
        }
    });
}




