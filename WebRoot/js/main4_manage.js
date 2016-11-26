/**
 * Created by cy on 2016/7/4.
 */

var weeks=1;
var username;
var bookingid;
var elementid;
var handleindex;
$(document).ready(function(){
	if(sessionStorage.getItem("username") == null){
		window.location.href="index.html";
	}
	$("#loading").show();
	$("#shapeloading").show();
	
	username = sessionStorage.getItem("username");
    $(".icon_back").on("click",function(){
    	window.history.back(-1); 
    });
//    alert(roomid);
    getWeek();
    
    $(".sel_week").on("change",getWeek);
    
    $(".schedule_body").on("swipeleft",doSwipeleft);
    $(".schedule_body").on("swiperight",doSwiperight);
    $("#dowmload").on("click",exportExcel);
    $("#classname").on("change",getCourse);
    
    $("#loading").hide();
	$("#shapeloading").hide();
	setClick();
	
	getbookingSum();
});

function exportExcel() {
	mui.toast("正在下载跳转中...");
	var url = "CreateExcel?username="+username;
	window.location.href=encodeURI(encodeURI(url));
}

function getbookingSum(){
	$.ajax({ //使用ajax与服务器异步交互
        url:"Mybooking?s="+new Date().getTime(), //后面加时间戳，防止IE辨认相同的url，只从缓存拿数据
        type:"post",
        data: {username:username,act:"getbookingSum"}, //$('#yourformid').serialize()；向后台发送的form表单中的数据
        dataType:"text", //接收返回的数据方式为json
        error:function(XMLHttpRequest,textStatus,errorThrown){
            alert("网络错误！");
        }, //错误提示
        
        success:function(data){ //data为交互成功后，后台返回的数据;
//        	alert(data);
        	$("#sum").text(data);
        	
        }
    });
}

function doSwipeleft(){
	var nowweek = $(".sel_week").children('option:selected').val();
//	alert(nowweek+"left");
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
//	alert("weeks:"+weeks);
	setNull();
	
//	alert(weeks);
	getDataByWeek();
	
}

var i =2;

function menuDelete() {//菜单删除事件
//		alert(bookingid);
		mui('#sheet1').popover('toggle');
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
			$.ajax({ //使用ajax与服务器异步交互
		        url:"Booking?s="+new Date().getTime(), //后面加时间戳，防止IE辨认相同的url，只从缓存拿数据
		        type:"POST",
		        data: {bookingid:bookingid,act:"delbooking"}, //$('#yourformid').serialize()；向后台发送的form表单中的数据
		//        dataType:"json", //接收返回的数据方式为json
		
		        error:function(XMLHttpRequest,textStatus,errorThrown){
		            mui.toast('网络错误！');
		            
		        }, //错误提示
		        success:function(data){ //data为交互成功后，后台返回的数据
		        	if($("#"+elementid).attr("value").indexOf("-") > 0){
		        		var arryid = $("#"+elementid).attr("value").split('-');
						var arrytext = $("#"+elementid).text().split('、');
//						alert(arryid.length);
						var strid;
						var strtext;
						for(var i=0;i<arryid.length;i++){
							if(i!= handleindex){
								if(strid != null){
									strid =  strid + "-" + arryid[i];
									strtext = strtext + "、" + arrytext[i];
								}else{
									strid = arryid[i];
									strtext = arrytext[i];
								}
								
							}
							
							
						}
						$("#"+elementid).text(strtext);
			        	$("#"+elementid).attr("value",strid);
		        	}else{
		        		$("#"+elementid).text("");
			        	$("#"+elementid).attr("value","");
		        	}
		        	
		        	$("#sum").text($("#sum").text()-1);
		        	mui.toast('您的预定已经成功删除！');
		        	swal.close();
//		        	swal("Deleted!", "您的预定已经成功删除！", "success");
		        	
		        }
		    });
		});
}

function menuEdit() {
	mui('#sheet1').popover('toggle');
	getRoom();
	getClass();//获取编辑框班级下拉框的教师班级
//	alert(bookingid);
	$.ajax({ //根据id获取原来的预定信息
        url:"Booking?s="+new Date().getTime(), //后面加时间戳，防止IE辨认相同的url，只从缓存拿数据
        type:"post",
        data: {id:bookingid,act:"getBooking"}, 
        dataType:"json", //接收返回的数据方式为json
        error:function(XMLHttpRequest,textStatus,errorThrown){
            alert("网络错误,获取预定信息失败！");
           
        }, //错误提示
        
        success:function(data){ //data为交互成功后，后台返回的数据;
        	$("#roomname").val(data.roomid);
        	$("#classname").find("option[text='"+data.classname+"']").attr("selected",true); 
        	$("#coursename").find("option[text='"+data.coursename+"']").attr("selected",true); 
        	$("#weekes").val(data.weekes);
        	$("#week").val(data.week);
        	$("#section").val(data.section);
        	//手动触发一次
//        	alert(data.classname+"-----"+data.coursename);
        	$("#roomname").trigger("change");
        	$("#classname").trigger("change");  //失效
        	$("#coursename").trigger("change"); //失效
        	$("#weekes").trigger("change");
        	$("#week").trigger("change");
        	$("#section").trigger("change");
        	
        }
    });
	
	$("#edit_btn_ok").on("click",function(){
		var classname = $("#classname").children('option:selected').val();
		var coursename = $("#coursename").children('option:selected').val();
		var weekes = $("#weeks").children('option:selected').val();//第几周
		var week = $("#week").children('option:selected').val();//周几
		var section = $("#section").children('option:selected').val();
		var roomid = $("#roomname").children('option:selected').val();
//		alert(classname+"-"+coursename+"-"+weekes+"-zhou"+week+"-"+section+"-rommid"+roomid);
		$.ajax({ //使用ajax与服务器异步交互
	        url:"Booking?s="+new Date().getTime(), //后面加时间戳，防止IE辨认相同的url，只从缓存拿数据
	        type:"post",
	        data: {id:bookingid,act:"updateBooking",classname:classname,coursename:coursename,weeks:weekes,week:week,section:section,roomid:roomid}, 
	        dataType:"json", //接收返回的数据方式为json
	        error:function(XMLHttpRequest,textStatus,errorThrown){
	            alert("网络错误！");
	        }, //错误提示
	        
	        success:function(data){ //data为交互成功后，后台返回的数据;
	        	var state = data.state;
	        	var nowweek = $(".sel_week").children('option:selected').val();
	        	if(state == "success"){
	        		mui.toast("预定修改成功！");
	        		var arryid = $("#"+elementid).attr("value").split('-');
					var arrytext = $("#"+elementid).text().split('、');
	        		if("#"+elementid != "#lesson"+week+section){
//						alert(arryid.length);
						var strid;
						var strtext;
						for(var i=0;i<arryid.length;i++){
							if(i!= handleindex){
								if(strid != null){
									strid =  strid + "-" + arryid[i];
									strtext = strtext + "、" + arrytext[i];
								}else{
									strid = arryid[i];
									strtext = arrytext[i];
								}
								
							}
							
						}
						$("#"+elementid).text(strtext);
			        	$("#"+elementid).attr("value",strid);
			        	if(weekes == nowweek){
		        			var roomname = $("#roomname").children('option:selected').text(); 
		        			$("#lesson"+week+section).text(roomname+"-"+classname+"-"+coursename);
		        			$("#lesson"+week+section).attr("value",arryid[handleindex]);
		        		}
		        	}else{//没有多组数据情况
		        		var strid;
						var strtext;
						var roomname = $("#roomname").children('option:selected').text(); 
						arrytext[handleindex] = roomname+"-"+classname+"-"+coursename;
						for(var i=0;i<arrytext.length;i++){
							if(strtext != null){
								strtext = strtext + "、" + arrytext[i];
							}else{
								strtext = arrytext[i];
							}	
						}
						$("#"+elementid).text(strtext);
		        	}
	        		
	        	}else if(state == "error"){
	        		mui.toast("预定修改失败，该时间段已有人预定！");
	        	}
	        	$("#editView").popup("close");
	        	
	        }
	    });
	});
}

function setClick() {//设置每节课的点击事件
	
	$(".cla").on("taphold",function(){
		if($(this).text() != ""){//判断是否有课
			elementid = $(this).attr("id");
			if($(this).attr("value").indexOf("-") > 0){//判断是不是同一时段有多节课
				var arryid = $(this).attr("value").split('-');
				var arrytext = $(this).text().split('、');
				
//				alert(arrytext[3]);
				$("#shapeloading").show();
				$("#shapeloading").on("click",function(){
					$(".selectcoursename").hide();
					$("#shapeloading").hide();
				});
				var list = $(".select_list");
				$(".select_list").empty();
				for(var i=0;i<arryid.length;i++){
					(function(i) {
						var li = $("<li value='"+ arryid[i] +"'>"+ arrytext[i].split('-')[0] +"</li>");
						li.on("click",function(){
							handleindex=i;
//							alert(i);
							bookingid = $(this).attr("value");
//							alert(bookingid);
							$(".selectcoursename").hide();
							$("#shapeloading").hide();
							mui('#sheet1').popover('toggle');
						});
						list.append(li);
					})(i);
					
				}
				$(".selectcoursename").show();
			}else{
				bookingid = $(this).attr("value");
				mui('#sheet1').popover('toggle');
			}
			
		}
			
		
    });			
}




function getRoom(){//获取所有机房名称
    $.ajax({ //使用ajax与服务器异步交互
        url:"Classlist?s="+new Date().getTime(), //后面加时间戳，防止IE辨认相同的url，只从缓存拿数据
        type:"post",
        data: {}, //$('#yourformid').serialize()；向后台发送的form表单中的数据
        dataType:"json", //接收返回的数据方式为json
        error:function(XMLHttpRequest,textStatus,errorThrown){
            alert("网络错误！");
        }, //错误提示
        
        success:function(data){ //data为交互成功后，后台返回的数据;
        	$("#roomname").empty();
        	var cla = new Array();
        	for (var i = 0; i < data.length; i++) {
//        		alert(data[i].classname);
        		var option = $("<option value='"+data[i].id+"'>"+ data[i].roomname +"</option>");
        		$("#roomname").append(option);
        	}
        	$("#roomname").selectmenu('refresh', true);//jqm 是动态加载的css 所以新增元素后 需要手动加载样式
        }
    });
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
        	$("#classname").empty();
        	var cla = new Array();
        	for (var i = 0; i < data.length; i++) {
//        		alert(data[i].classname);
        		var option = $("<option>"+ data[i].classname +"</option>");
        		$("#classname").append(option);
        	}
        	$("#classname").selectmenu('refresh', true);//jqm 是动态加载的css 所以新增元素后 需要手动加载样式
        	getCourse();
        }
    });
}

function getCourse(){
//	alert(weeks+":"+roomid);
	var classname = $("#classname").children('option:selected').val();
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
        	$("#coursename").empty();
        	for (var i = 0; i < data.length; i++) {
        		var option = $("<option>"+ data[i].coursename +"</option>");
        		$("#coursename").append(option);
        	}
        	$("#coursename").selectmenu('refresh', true);//jqm 是动态加载的css 所以新增元素后 需要手动加载样式

        }
    });
}


function setNull() {
	for (var int = 1; int < 8; int++) {
		for (var int2 = 1; int2 < 7; int2++) {
			$("#lesson"+int+int2).text("");
			$("#lesson"+int+int2).css("backgroundColor","transparent");
		}
	}
	$("td[name]").removeAttr("name"); 
}

function getDataByWeek(){
//	alert(weeks+":"+roomid);
//	alert(username);
    $.ajax({ //使用ajax与服务器异步交互
        url:"Getschedule?s="+new Date().getTime(), //后面加时间戳，防止IE辨认相同的url，只从缓存拿数据
        type:"post",
        data: {week:weeks,act:"manageSchedule",username:username}, //$('#yourformid').serialize()；向后台发送的form表单中的数据
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
            		var riqi = date.split("-");
            		
            		var num = riqi[riqi.length-1]-day+1;
//            		alert(num);
            		lesson = lesson + num + section;
            		var str=data[int].roomname+"-"+data[int].classname+"-"+data[int].coursename;
            		if($("#"+lesson).text() != ""){
            			var old = $("#"+lesson).text();
            			$("#"+lesson).text(old + "、" +str);
            			old = $("#"+lesson).attr("value");
            			$("#"+lesson).attr("value",old + "-" +data[int].id);
            		}else{
            			$("#"+lesson).text(str);
//                		$("#"+lesson).text($("#"+lesson).text()+str);
                		$("#"+lesson).attr("value",data[int].id);
            		}
            		
            		
			}
        }
    });
}


