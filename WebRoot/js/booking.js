/**
 * Created by cy on 2016/7/4.
 */

var weeks=1;
var roomid=1;
var roomname;
var LocString;
var username;


$(document).ready(function(){
	if(sessionStorage.getItem("username") == null){
		window.location.href="index.html";
	}
	$("#loading").show();
	$("#shapeloading").show();
	username = sessionStorage.getItem("username");
    $(".icon_back").on("click",function(){
    	window.location.href="main.html?action=1";
    });
    LocString = window.location.href;
    roomid = decodeURI(GetQueryString("roomid"));
    roomname = decodeURI(GetQueryString("roomname"));
//    alert(roomid);
    getWeek();
    $(".classname").text(roomname);
    $(".sel_week").on("change",getWeek);
    $("#selectClass").on("change",getCourse);
    $(".schedule_body").on("swipeleft",doSwipeleft);
    $(".schedule_body").on("swiperight",doSwiperight);
    
    $("#seeBooking").on("click",getAlready);//点击已预订
    
    $("#switch_tospeed").on("click",switchClick);
    $("#loading").hide();
	$("#shapeloading").hide();
});

function getAlready() {
	$("#list_readyBooking").children().filter('li').remove();
	$.ajax({ //使用ajax与服务器异步交互
        url:"Booking?s="+new Date().getTime(), //后面加时间戳，防止IE辨认相同的url，只从缓存拿数据
        type:"post",
        data: {username:username,act:"getAlready",roomid:roomid}, //$('#yourformid').serialize()；向后台发送的form表单中的数据
        dataType:"json", //接收返回的数据方式为json
        error:function(XMLHttpRequest,textStatus,errorThrown){
            alert("网络错误！");
        }, //错误提示
        
        success:function(data){ //data为交互成功后，后台返回的数据;
        	
        		for (var i = 0; i < data.length; i++) {
        			(function(i) {
	//            		alert(data[i].station);
	//            		alert(data[i].week);
	            		var strdate = data[i].classtime.substring();
	            		var date = strdate.substring(5,strdate.length);
	    				var ul= $("#list_readyBooking");
	    				var li = $("<li></li>");
	
	    				var a = $("<a name="+data[i].station+" value="+data[i].week+">"+date+"/"+data[i].classname+"/"+data[i].coursename+"</a>");
	    				a.on("click",function(){
	    					var week = a.attr("value");
	    					var station = a.attr("name");
//	    					alert(week+"-"+station);
	    					$(".sel_week").val(week);
	    					getWeek();
	    					$("#popupBasic").popup("close");
	    					$("#"+station).css("background","red");
	    				});
	    				li.append(a);
	    				ul.append(li);
        			})(i);
    			}
        	
        }
    });
}

function doSwipeleft(){
	var nowweek = $(".sel_week").children('option:selected').val();
//	alert(nowweek+"left");
	if(nowweek<20){
		$(".sel_week").val(nowweek-(-1));
		getWeek();

	}
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
//	alert("weeks:"+weeks);
	setNull();
	setClick();
//	alert(weeks);
	getDataByWeek();
	
}

var i =2;

function setClick() {//设置每节课的点击事件
	for (var int = 1; int < 8; int++) {
		for (var int2 = 1; int2 < 7; int2++) {
			
			(function(int,int2){
				$("#lesson"+int+int2).click(function(){
					var id = $(this).attr("id");
					id = id.substring(id.length-2);
					$(this).attr("name",id);
					if($(this).text() == "空"){//没有被预定
						$("body").append("<div id='mask'></div>");
				        $("#mask").addClass("mask").fadeIn("slow");
				        $("#SelectBox").fadeIn("slow");
				        getClass();
				        
					}
				});
				
				$("#lesson"+int+int2).on("taphold",function(){
					if($(this).text() != "空"){
						if($(this).text().split("-")[0] == username){
							var bookingid = $(this).attr("value");
		                	swal({
		                	    title: "Are you sure?",
		                	    text: "你确定要删除这次预定吗？",
		                	    type: "warning",
		                	    showCancelButton: true,
		                	    confirmButtonColor: "#DD6B55",
		                	    confirmButtonText: "Yes, delete!",
		                	    cancelButtonText: "No, cancel!",
		                	    closeOnConfirm: false,
		                	}, function () {
		    					$.ajax({ //使用ajax与服务器异步交互
		                	        url:"Booking?s="+new Date().getTime(), //后面加时间戳，防止IE辨认相同的url，只从缓存拿数据
		                	        type:"POST",
		                	        data: {bookingid:bookingid,act:"delbooking"}, //$('#yourformid').serialize()；向后台发送的form表单中的数据
//		                	        dataType:"json", //接收返回的数据方式为json

		                	        error:function(XMLHttpRequest,textStatus,errorThrown){
		                	            alert("网络错误！");
		                	        }, //错误提示
		                	        success:function(data){ //data为交互成功后，后台返回的数据
		                	        	$("#lesson"+int+int2).text("空");
		                	        	$("#lesson"+int+int2).attr("value","");
		                	        	mui.toast("您的预定已经成功删除！");
		                	        	swal.close();
		                	        }
		                	    });
		                	});
						}
					}
					
                });	
			})(int,int2);
			
		}
	}
}

//获取用户的所有教课班级
function getClass(){
//	alert(weeks+":"+roomid);
    $.ajax({ //使用ajax与服务器异步交互
        url:"GetClassInfo?s="+new Date().getTime(), //后面加时间戳，防止IE辨认相同的url，只从缓存拿数据
        type:"post",
        data: {username:username,act:"getClass"}, //$('#yourformid').serialize()；向后台发送的form表单中的数据
        dataType:"json", //接收返回的数据方式为json
        error:function(XMLHttpRequest,textStatus,errorThrown){
            alert("网络错误！");
        }, //错误提示
        
        success:function(data){ //data为交互成功后，后台返回的数据;
        	$("#selectClass").empty();
        	var cla = new Array();
        	var index=0;
        	for (var i = 0; i < data.length; i++) {
//        		alert(data[i].classname);
        		var option = $("<option>"+ data[i].classname +"</option>");
        		$("#selectClass").append(option);
        	}
        	getCourse();
        }
    });
}

function getCourse(){
//	alert(weeks+":"+roomid);
	var classname = $("#selectClass").children('option:selected').val();
//	alert(classname);
    $.ajax({ //使用ajax与服务器异步交互
        url:"GetClassInfo?s="+new Date().getTime(), //后面加时间戳，防止IE辨认相同的url，只从缓存拿数据
        type:"post",
        data: {username:username,act:"getCourse",classname:encodeURI(classname)}, //$('#yourformid').serialize()；向后台发送的form表单中的数据
        dataType:"json", //接收返回的数据方式为json
        error:function(XMLHttpRequest,textStatus,errorThrown){
            alert("网络错误！");
        }, //错误提示
        
        success:function(data){ //data为交互成功后，后台返回的数据;
//        	alert(data.length);
        	var cla = new Array();
        	var index=0;
        	$("#selectCourse").empty();
        	for (var i = 0; i < data.length; i++) {
        		var option = $("<option>"+ data[i].coursename +"</option>");
        		$("#selectCourse").append(option);
        	}
        }
    });
}


function setNull() {
	for (var int = 1; int < 8; int++) {
		for (var int2 = 1; int2 < 7; int2++) {
			$("#lesson"+int+int2).text("空");
			$("#lesson"+int+int2).css("backgroundColor","transparent");
		}
	}
	$("td[name]").removeAttr("name"); 
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
//            alert("网络错误！");
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
            		
            		
//            		var num = riqi[riqi.length-1]-day+1;//严重Bug
            		var dt = new Date(date);
            		var num = dt.getDay();
            		if(num==0){
            			num=7;
            		}
//            		alert("date"+date+"num"+num);
//            		alert(num);
            		lesson = lesson + num + section;
            		var str=data[int].username+"-"+data[int].classname+"-"+data[int].coursename;
//            		alert(lesson+data[int].username+"-"+data[int].classname+"-"+data[int].coursename);
            		$("#"+lesson).text(str);
            		$("#"+lesson).attr("value",data[int].id);
            		
			}
        }
    });
}
function switchClick() {
	$("#loading").show();
	$("#shapeloading").show();
//	$("#switch_tospeed").attr("href","bookingSpeed.html?roomid="+roomid+"&roomname="+roomname);
	window.location.href="bookingSpeed.html?roomid="+roomid+"&roomname="+roomname;
}


