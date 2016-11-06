/**
 * Created by cy on 2016/7/4.
 */

var weeks=1;
var roomid=1;
var roomname;
var LocString;





$(document).ready(function(){
	$("#loading").show();
	$("#shapeloading").show();
    $(".icon_back").on("click",back);
    setNull();
    
    LocString = window.location.href;
    roomid = decodeURI(GetQueryString("roomid"));
    roomname = decodeURI(GetQueryString("roomname"));
    
    $(".classname").text(roomname);
    $(".sel_week").on("change",getWeek);
    getDataByWeek();
    
    $(".schedule_body").on("swipeleft",doSwipeleft);
    $(".schedule_body").on("swiperight",doSwiperight);
    
    $("#loading").hide();
	$("#shapeloading").hide();
});

function doSwipeleft(){
	var nowweek = $(".sel_week").children('option:selected').val();
	$(".schedule_layout").fadeOut(100);
	if(nowweek<20){
		$(".sel_week").val(nowweek-(-1));
		getWeek();
	}
	$(".schedule_layout").fadeIn(1000);
}
function doSwiperight(){
	var nowweek = $(".sel_week").children('option:selected').val();
//	alert(nowweek+"right");
	$(".schedule_layout").fadeOut(100);
	if(nowweek>1){
		$(".sel_week").val(nowweek-1);
		getWeek();
	}
	$(".schedule_layout").fadeIn(1000);
}



function GetQueryString(str){
	 var rs=new RegExp("(^|)"+str+"=([^&]*)(&|$)","gi").exec(LocString),tmp;
	 if(tmp=rs)return tmp[2];
	 return "没有这个参数";
	 }

//获取选择的周数
function getWeek(){
	weeks = $(".sel_week").children('option:selected').val();
	setNull();
//	alert(weeks);
	getDataByWeek();
	
}
//返回函数
function back(){
	window.history.back(-1); 
}
var i =2;

function setNull() {
	for (var int = 1; int < 8; int++) {
		for (var int2 = 1; int2 < 7; int2++) {
			$("#lesson"+int+int2).text("空");
		}
	}
}
function getDataByWeek(){
//	alert(weeks+":"+roomid);
    $.ajax({ //使用ajax与服务器异步交互
        url:"Getschedule?s="+new Date().getTime(), //后面加时间戳，防止IE辨认相同的url，只从缓存拿数据
        type:"post",
        data: {week:weeks,roomid:roomid,act:"getSchedule"}, //$('#yourformid').serialize()；向后台发送的form表单中的数据
        dataType:"json", //接收返回的数据方式为json

        error:function(XMLHttpRequest,textStatus,errorThrown){
//            alert(XMLHttpRequest.status);
//            alert(XMLHttpRequest.readyState);
//            alert(textStatus);
//            alert(errorThrown);
//            alert("网络错误，登录失败！");
        }, //错误提示
        
        success:function(data){ //data为交互成功后，后台返回的数据
        	var day = data[0].date1;
        	$("#month_first").text(data[0].month);
        	$(".date1").text(data[0].date1);
        	$(".date2").text(data[0].date2);
        	$(".date3").text(data[0].date3);
        	$(".date4").text(data[0].date4);
        	$(".date5").text(data[0].date5);
        	$(".date6").text(data[0].date6);
        	$(".date7").text(data[0].date7);
//        	alert(data.length);
        	for (var int = 1; int < data.length; int++) {
        		var lesson = "lesson";
        		var date = data[int].classtime;
        		var section = data[int].section;
        		var riqi = date.split("-");
        		
        		var num = riqi[riqi.length-1]-day+1;
//        		alert(num);
        		lesson = lesson + num + section;
        		var str=data[int].username+"-"+data[int].classname+"-"+data[int].coursename;
        		$("#"+lesson).text(str);
//        		$("#"+lesson).css("backgroundColor","red");
			}
        }
    });
}

