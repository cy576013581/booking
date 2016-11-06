/**
 * Created by cy on 2016/8/15.
 */
$(document).ready(function(){
	
	getRoom();
	
	$(".username").on("change",function(){
		getClass();
	});
	$(".class").on("change",function(){
		getCourse();
	});
	
	$(".btn_ok").on("click",function(){

       var username = $(".username").val();
       var roomid = $(".roomid").val();
       var section = $(".section").val();
       var classdate = $(".classdate").val();
       var selectClass = $(".class").children('option:selected').val();
       var selectCourse = $(".course").children('option:selected').val();
       if (username==''){
           alert("预定账号不能为空！");
           $(".username").focus();
       }else if (roomid==null){
           alert("所选机房不能为空！");
       }else if (section==null){
           alert("所选节次不能为空！");
       }else if (selectClass==null){
           alert("所选班级不能为空！");
       }else if (selectCourse==null){
           alert("所选课程不能为空！");
       }else if (classdate==''){
           alert("所选上课时间不能为空！");
       }else{
    	   $.ajax({ //使用ajax与服务器异步交互
    	        url:"Managerbooking?s="+new Date().getTime(), //后面加时间戳，防止IE辨认相同的url，只从缓存拿数据
    	        type:"post",
    	        contentType:'application/x-www-form-urlencoded; charset=UTF-8',
    	        data: {roomid:roomid,username:username,classtime:classdate,section:section,act:"addBooking",classname:selectClass,coursename:selectCourse}, //$('#yourformid').serialize()；向后台发送的form表单中的数据
    	        dataType:"json", //接收返回的数据方式为json
    	        error:function(XMLHttpRequest,textStatus,errorThrown){
    	            alert("网络错误,操作失败！");
    	        }, //错误提示
    	        
    	        success:function(data){ //data为交互成功后，后台返回的数据;
    	        	var state = data.state;
    	        	if(state=='success'){
    	        		alert("预定成功！");
//                		swal("预定成功!", "您的速度可真快！", "error");
                	}else{
                		alert("预定失败，机房已被预定！");
//                		swal("您晚了一步!", "这个机房已被占用！", "error");
                	}
    	        }
    	    });



       }
   });
});

function booking(classtime) {
	var selectClass = $("#selectClass").children('option:selected').val();
    var selectCourse = $("#selectCourse").children('option:selected').val();
    
    var sec = $("td[name]").attr("name").charAt(1); 
	var week = $("td[name]").attr("name").charAt(0); 
	var month;
	var year = new Date().getFullYear();
	$("td[name]").removeAttr("name"); 
	
	var day = $(".date"+week).text();
	
}

function getClass(){
//	alert(weeks+":"+roomid);
	var username = $(".username").val();
    $.ajax({ //使用ajax与服务器异步交互
        url:"GetClassInfo?s="+new Date().getTime(), //后面加时间戳，防止IE辨认相同的url，只从缓存拿数据
        type:"post",
        data: {username:username,act:"getClass"}, //$('#yourformid').serialize()；向后台发送的form表单中的数据
        dataType:"json", //接收返回的数据方式为json
        error:function(XMLHttpRequest,textStatus,errorThrown){
            alert("网络错误，登录失败！");
        }, //错误提示
        
        success:function(data){ //data为交互成功后，后台返回的数据;
        	$(".class").empty();
        	for (var i = 0; i < data.length; i++) {
//        		alert(data[i].classname);
        		var option = $("<option>"+ data[i].classname +"</option>");
        		$(".class").append(option);
        	}
        	getCourse();
        }
    });
}

function getCourse(){
//	alert(weeks+":"+roomid);
	var classname = $(".class").children('option:selected').val();
	var username = $(".username").val();
//	alert(classname);
    $.ajax({ //使用ajax与服务器异步交互
        url:"GetClassInfo?s="+new Date().getTime(), //后面加时间戳，防止IE辨认相同的url，只从缓存拿数据
        type:"post",
        data: {username:username,act:"getCourse",classname:encodeURI(classname)}, //$('#yourformid').serialize()；向后台发送的form表单中的数据
        dataType:"json", //接收返回的数据方式为json
        error:function(XMLHttpRequest,textStatus,errorThrown){
            alert("网络错误，登录失败！");
        }, //错误提示
        
        success:function(data){ //data为交互成功后，后台返回的数据;
//        	alert(data.length);
        	$(".course").empty();
        	for (var i = 0; i < data.length; i++) {
        		var option = $("<option>"+ data[i].coursename +"</option>");
        		$(".course").append(option);
        	}
        }
    });
}


function getRoom() {
	$.ajax({ //使用ajax与服务器异步交互
        url:"Managerbooking?s="+new Date().getTime(), //后面加时间戳，防止IE辨认相同的url，只从缓存拿数据
        type:"POST",
        data: {act:"getRoom"}, //$('#yourformid').serialize()；向后台发送的form表单中的数据
        dataType:"json", //接收返回的数据方式为json

        error:function(XMLHttpRequest,textStatus,errorThrown){
            alert("网络错误，登录失败！");
        }, //错误提示

        success:function(data){ //data为交互成功后，后台返回的数据
        	var select = $(".roomid");
        	for (var i = 0; i < data.length; i++) {
				var option = $("<option value='"+data[i].id+"'>"+data[i].roomname+"</option>")
				select.append(option);
			}
        }
    });
}