/**
 * Created by cy on 2016/8/13.
 */
var sledate;
$(document).ready(function(){
	if(sessionStorage.getItem("username") == null){
		window.location.href="Pindex.html";
	}
	editdialog();
	getData();
    $(".btn_ok").on("click",activation);
    $(".btn_add").on("click",showadd);
    $(".btn_ok").attr("disabled", true); 
    $("#selectdate").on("change",function(){
    	
    	var date = $("#selectdate").children('option:selected').val();
//    	alert(date+"-"+sledate);
    	if(sledate != date){
    		$(".btn_ok").attr("disabled", false);
    		$(".btn_ok").css("background-color", "#F36A5A");
    	}
    	if(sledate == date){
    		$(".btn_ok").attr("disabled", true);
    		$(".btn_ok").css("background-color", "#A9A9A9");
    	}
    });
});
function getData() {
	$.ajax({ //使用ajax与服务器异步交互
        url:"Getschedule?s="+new Date().getTime(), //后面加时间戳，防止IE辨认相同的url，只从缓存拿数据
        type:"POST",
        data: {act:"admingetSchoolDate"}, //$('#yourformid').serialize()；向后台发送的form表单中的数据
        dataType:"json", //接收返回的数据方式为json

        error:function(XMLHttpRequest,textStatus,errorThrown){
            alert("网络错误！");
        }, //错误提示

        success:function(data){ //data为交互成功后，后台返回的数据
        	var select = $("#selectdate");
        	for (var i = 0; i < data.length; i++) {
        		if(data[i].flag == 0){
        			sledate = data[i].schooldate;
        		}
				var option = $("<option value="+data[i].schooldate+">"+data[i].yearname+"/"+data[i].schooldate+"</option>");
				select.append(option);
			}
        	select.val(sledate);
        }
    });
}

function showadd(){
	$("body").append("<div id='mask'></div>");
    $("#mask").addClass("mask").fadeIn("slow");
    $("#AddBox").fadeIn("slow");
    $("#btn_addok").on("click",function(){
    	var date = $("#add_selectdate").val();
        var yearname = $("#add_yearname").val();
        if (date ==''){
            alert("输入时间不能为空！");
            $("#add_selectdate").focus();
        }else if(yearname ==''){
        	alert("学年名称不能为空！");
            $("#add_yearname").focus();
        }else {
//        	alert(date);
        	$.ajax({ //使用ajax与服务器异步交互
    	        url:"Getschedule?s="+new Date().getTime(), //后面加时间戳，防止IE辨认相同的url，只从缓存拿数据
    	        type:"POST",
    	        data: {date:date,yearname:yearname,act:"insertSchoolDate"}, //$('#yourformid').serialize()；向后台发送的form表单中的数据
//    	        dataType:"json", //接收返回的数据方式为json

    	        error:function(XMLHttpRequest,textStatus,errorThrown){
    	        	
    	            alert("网络错误！");
    	        }, //错误提示

    	        success:function(data){ //data为交互成功后，后台返回的数据
    	        	alert("设置成功！");
    	        	location.reload();
    	        }
    	    });
        }
    });
    
}

//激活学年
function activation(){
	var date = $("#selectdate").children('option:selected').val();
	$.ajax({ //使用ajax与服务器异步交互
        url:"Getschedule?s="+new Date().getTime(), //后面加时间戳，防止IE辨认相同的url，只从缓存拿数据
        type:"POST",
        data: {date:date,act:"activation"}, //$('#yourformid').serialize()；向后台发送的form表单中的数据
//        dataType:"json", //接收返回的数据方式为json

        error:function(XMLHttpRequest,textStatus,errorThrown){
        	
            alert("网络错误！");
        }, //错误提示

        success:function(data){ //data为交互成功后，后台返回的数据
        	alert("设置成功！");
        	location.reload();
        }
    });
}


function editdialog() {
	$("#example").hover(function () {
        $(this).stop().animate({
            opacity: '1'
        }, 600);
    }, function () {
        $(this).stop().animate({
            opacity: '0.6'
        }, 1000);
    }).on('click', function () {
        $("body").append("<div id='mask'></div>");
        $("#mask").addClass("mask").fadeIn("slow");
    });
	$(".close_btn").hover(function () { $(this).css({ color: 'black' }) }, function () { $(this).css({ color: '#999' }) }).on('click', function () {
        $("#AddBox").fadeOut("fast");
        $("#mask").css({ display: 'none' });
        $("td[name]").removeAttr("name"); 
    });
}