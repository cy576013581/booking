/**
 * Created by cy on 2016/10/12.
 */
var username;
var roomid=1;
var roomname;
var LocString;
var weeks = new Array();
var week = new Array();
var section = new Array();
weeks=["一","二","三","四","五","六","七","八","九","十","十一","十二"
       ,"十三","十四","十五","十六","十七","十八","十九","二十"];
week=["一","二","三","四","五","六","日"];
section=["第一大节","第二大节","午间","第三大节","第四大节","晚间"];
var flag = false;

mui.init({
	  gestureConfig:{
	   tap: true, //默认为true
	   doubletap: true, //默认为false
	   longtap: true, //默认为false
	   swipe: true, //默认为true
	   drag: true, //默认为true
	   hold:false,//默认为false，不监听
	   release:false//默认为false，不监听
	  }
	});

$(document).ready(function(){
	if(sessionStorage.getItem("username") == null){
		window.location.href="index.html";
	}
	$("#loading").show();
	$("#shapeloading").show();
    setDate();
    username = sessionStorage.getItem("username");
    $(".icon_back").on("click",function(){
    	window.location.href="main.html?action=1";
    });
    LocString = window.location.href;
    roomid = decodeURI(GetQueryString("roomid"));
    roomname = decodeURI(GetQueryString("roomname"));
//    alert("roomid="+roomid+"roomname="+roomname);
    setInfo();
    getData();
    setClick();
    setTaphold();
    getClass();
    
    $(".sel_classname").on("change",getCourse);
    $("#loading").hide();
	$("#shapeloading").hide();
});

/*'
 * 从服务端获取这个机房所有的预定信息并显示
 */
function getData(){
//	alert(weeks+":"+roomid);
    $.ajax({ //使用ajax与服务器异步交互
        url:"Getschedule?s="+new Date().getTime(), //后面加时间戳，防止IE辨认相同的url，只从缓存拿数据
        type:"post",
        data: {roomid:roomid,act:"getScheduleSpeed"}, //$('#yourformid').serialize()；向后台发送的form表单中的数据
        dataType:"json", //接收返回的数据方式为json
        error:function(XMLHttpRequest,textStatus,errorThrown){
            mui.toast("网络错误！");
        }, //错误提示
        
        success:function(data){ //data为交互成功后，后台返回的数据;
//        	alert(data.length);
        	for (var i = 0; i < data.length; i++) {
//        		alert(data[i].classname);
        		if(data[i].username == username){
        			$("#"+data[i].station).text("✔");
        			$("#"+data[i].station).val(data[i].id+"-"+data[i].username+"-"+data[i].classname+"-"+data[i].coursename);
        		}else{
        			$("#"+data[i].station).text("█");
        			$("#"+data[i].station).val(data[i].username+"-"+data[i].classname+"-"+data[i].coursename);
        		}
        		
        	}
        	getCourse();
        }
    });
}

function getClass(){
//	alert(weeks+":"+roomid);
    $.ajax({ //使用ajax与服务器异步交互
        url:"GetClassInfo?s="+new Date().getTime(), //后面加时间戳，防止IE辨认相同的url，只从缓存拿数据
        type:"post",
        data: {username:username,act:"getClass"}, //$('#yourformid').serialize()；向后台发送的form表单中的数据
        dataType:"json", //接收返回的数据方式为json
        error:function(XMLHttpRequest,textStatus,errorThrown){
            mui.toast("网络错误！");
        }, //错误提示
        
        success:function(data){ //data为交互成功后，后台返回的数据;
        	$(".sel_classname").empty();
        	var cla = new Array();
        	var index=0;
        	for (var i = 0; i < data.length; i++) {
//        		alert(data[i].classname);
        		var option = $("<option>"+ data[i].classname +"</option>");
        		$(".sel_classname").append(option);
        	}
        	getCourse();
        }
    });
}

function getCourse(){
//	alert(weeks+":"+roomid);
	var classname = $(".sel_classname").children('option:selected').val();
//	alert(classname);
    $.ajax({ //使用ajax与服务器异步交互
        url:"GetClassInfo?s="+new Date().getTime(), //后面加时间戳，防止IE辨认相同的url，只从缓存拿数据
        type:"post",
        data: {username:username,act:"getCourse",classname:encodeURI(classname)}, //$('#yourformid').serialize()；向后台发送的form表单中的数据
        dataType:"json", //接收返回的数据方式为json
        error:function(XMLHttpRequest,textStatus,errorThrown){
            mui.toast("网络错误！");
        }, //错误提示
        
        success:function(data){ //data为交互成功后，后台返回的数据;
//        	alert(data.length);
        	var cla = new Array();
        	var index=0;
        	$(".sel_coursename").empty();
        	for (var i = 0; i < data.length; i++) {
        		var option = $("<option>"+ data[i].coursename +"</option>");
        		$(".sel_coursename").append(option);
        	}
        }
    });
    flag = false;
}

/*
 * 设计单元格长按删除课程事件
 */
function setTaphold() {
	mui(".schedule_body").on('longtap','.data',function(){
//	$(".data").addEventListener("longtap",function(){
//	$(".data").on("taphold",function(){
		var text = $(this).text();
		var value = $(this).val();
		var station = $(this).attr("id");
		var info = [];
		if (text==="✔") {
			swal({
        	    title: "Are you sure?",
        	    text: "你确定要删除这次预定吗？",
        	    type: "warning",
        	    showCancelButton: true,
        	    confirmButtonColor: "#DD6B55",
        	    confirmButtonText: "删除",
        	    cancelButtonText: "返回",
        	    closeOnConfirm: false,
        	}, function () {
        		info = value.split("-");
				$.ajax({ //使用ajax与服务器异步交互
        	        url:"Booking?s="+new Date().getTime(), //后面加时间戳，防止IE辨认相同的url，只从缓存拿数据
        	        type:"POST",
        	        data: {bookingid:info[0],act:"delbooking"}, //$('#yourformid').serialize()；向后台发送的form表单中的数据
//        	        dataType:"json", //接收返回的数据方式为json

        	        error:function(XMLHttpRequest,textStatus,errorThrown){
        	            mui.toast("网络错误！");
        	        }, //错误提示
        	        success:function(data){ //data为交互成功后，后台返回的数据
        	        	$("#"+station).text("");
        	        	$("#"+station).attr("value","");
        	        	mui.toast("您的预定已经成功删除！");
        	        	swal.close();
        	        }
        	    });
        	});
			
			
		}
	});
}

/*
 * 设置获取单元格点击事件
 */
function setClick() {
	$(".data").on("click",function(){
		var strclass = $(this).attr("id");
		var str = [];
		str = strclass.split("-");
		$(".weeks").text(weeks[str[1]-1]);
		$(".week").text(week[str[2]-1]);
		$(".section").text(section[str[3]]);//获取当前单元格的时间
		var text = $(this).text();
		var value = $(this).val();
		var info = [];
		if (text==="✔") {
//			alert("✔");
			info = value.split("-");
			$(".teachername").val(info[1]);
			$(".sel_classname").empty();
			var option1 = $("<option>"+info[2]+"</option>");
			$(".sel_classname").append(option1);
			$(".sel_coursename").empty();
			var option2 = $("<option>"+info[3]+"</option>");
			$(".sel_coursename").append(option2);
			
		} else if(text==="█"){
			info = value.split("-");
			$(".teachername").val(info[0]);
			$(".sel_classname").empty();
			var option1 = $("<option>"+info[1]+"</option>");
			$(".sel_classname").append(option1);
			$(".sel_coursename").empty();
			var option2 = $("<option>"+info[2]+"</option>");
			$(".sel_coursename").append(option2);
		}else  if(text===""){
			$(".teachername").val(username);
			if($(".sel_classname option").length ==1 && $(".sel_coursename option").length ==1){
				$(".sel_classname").empty();
				$(".sel_coursename").empty();
				getClass();
			}
			
			if(flag){//不是第一次
				var classname = $(".sel_classname").children('option:selected').val();
    			var coursename = $(".sel_coursename").children('option:selected').val();
    			var weekes1 = str[1];
    			var week1 = str[2];
    			var section1 = str[3];
    			$.ajax({ //使用ajax与服务器异步交互
    		        url:"Booking?s="+new Date().getTime(), //后面加时间戳，防止IE辨认相同的url，只从缓存拿数据
    		        type:"post",
    		        data: {act:"bookingBySpeed",username:username,classname:classname,coursename:coursename,weeks:weekes1,week:week1,section:section1,roomid:roomid}, 
    		        dataType:"json", //接收返回的数据方式为json
    		        error:function(XMLHttpRequest,textStatus,errorThrown){
    		            mui.toast("网络错误！");
    		        }, //错误提示
    		        success:function(data){ //data为交互成功后，后台返回的数据;
    		        	var state = data.state;
    		        	var nowweek = $(".sel_week").children('option:selected').val();
    		        	if(state == "success"){
    		        		mui.toast("预定成功！");
    		        		$("#"+strclass).text("✔");
    		        		$("#"+strclass).val(data.id+"-"+username+"-"+classname+"-"+coursename);
    		        	}else if(state == "error"){
    		        		mui.toast("预定失败，该时间段已有人预定！");
    		        	}
    		        	swal.close();
    		        }
    		    });
				
			}else{//第一次
				swal({
	        	    title: "你确定要预定这个节课吗?",
	        	    text: "之后预定相同班级的课程将不再提示",
	        	    type: "warning",
	        	    showCancelButton: true,
	        	    confirmButtonColor: "#DD6B55",
	        	    confirmButtonText: "预定",
	        	    cancelButtonText: "返回",
	        	    closeOnConfirm: false,
	        	}, function () {
	        		var classname = $(".sel_classname").children('option:selected').val();
        			var coursename = $(".sel_coursename").children('option:selected').val();
        			var weekes = str[1];
        			var week = str[2];
        			var section = str[3];
        			$.ajax({ //使用ajax与服务器异步交互
        		        url:"Booking?s="+new Date().getTime(), //后面加时间戳，防止IE辨认相同的url，只从缓存拿数据
        		        type:"post",
        		        data: {act:"bookingBySpeed",username:username,classname:classname,coursename:coursename,weeks:weekes,week:week,section:section,roomid:roomid}, 
        		        dataType:"json", //接收返回的数据方式为json
        		        error:function(XMLHttpRequest,textStatus,errorThrown){
        		            mui.toast("网络错误！");
        		        }, //错误提示
        		        success:function(data){ //data为交互成功后，后台返回的数据;
        		        	var state = data.state;
        		        	var nowweek = $(".sel_week").children('option:selected').val();
        		        	if(state == "success"){
        		        		$("#"+strclass).text("✔");
        		        		$("#"+strclass).val(data.id+"-"+username+"-"+classname+"-"+coursename);
        		        		mui.toast("预定成功！");
        		        	}else if(state == "error"){
        		        		mui.toast("预定失败，该时间段已有人预定！");
        		        	}
        		        	swal.close();
        		        	flag = true;
        		        }
        		    });
	        	});
			}
			
		}
	});
}

/*
 * 设置显示信息
 */
function setInfo() {
	$(".roomname").val(roomname);
	$(".teachername").val(username);
}


/*
 * 设置切换回普通视图
 */
function switchClick() {
	$("#loading").show();
	$("#shapeloading").show();
//	$("#switch_tospeed").attr("href","booking.html?roomid="+roomid+"&roomname="+roomname);
	window.location.href="booking.html?roomid="+roomid+"&roomname="+roomname;
}
function GetQueryString(str){
	 var rs=new RegExp("(^|)"+str+"=([^&]*)(&|$)","gi").exec(LocString),tmp;
	 if(tmp=rs)return tmp[2];
	 return "没有这个参数";
}


/*
* 用js生成一个学期的空课表
* */


function setDate(){
    var table = $(".schedule_body");
    for (var i=1;i<=20;i++){
       for (var j=1;j<=7;j++){
           var tool = 1;
           var tr = $("<tr></tr>");
           var td_time = $("<td class='time' id='time"+(i)+(j)+"'>第"+weeks[i-1]+"周/周"+week[j-1]+"</td>");
           var td1= $("<td class='data' id='data-"+(i)+"-"+(j)+"-"+(tool++)+"'></td>");
           var td2= $("<td class='data' id='data-"+(i)+"-"+(j)+"-"+(tool++)+"'></td>");
           var td3= $("<td class='data' id='data-"+(i)+"-"+(j)+"-"+(tool++)+"'></td>");
           var td4= $("<td class='data' id='data-"+(i)+"-"+(j)+"-"+(tool++)+"'></td>");
           var td5= $("<td class='data' id='data-"+(i)+"-"+(j)+"-"+(tool++)+"'></td>");
           var td6= $("<td class='data' id='data-"+(i)+"-"+(j)+"-"+(tool++)+"'></td>");
           tr.append(td_time);
           tr.append(td1);
           tr.append(td2);
           tr.append(td3);
           tr.append(td4);
           tr.append(td5);
           tr.append(td6);
           table.append(tr);
       }
    }
}