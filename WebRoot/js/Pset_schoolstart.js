/**
 * Created by cy on 2016/8/13.
 */
$(document).ready(function(){
	if(sessionStorage.getItem("username") == null){
		window.location.href="Pindex.html";
	}
	getData();
    $("#btn_ok").on("click",submitdate);
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
        	$("#selectdate").val(data.date);
        	$("#yearname").val(data.yearname);
        }
    });
}


function submitdate(){
    var date = $("#selectdate").val();
    var yearname = $("#yearname").val();
    if (date ==''){
        alert("输入时间不能为空！");
        $("#selectdate").focus();
    }else if(yearname ==''){
    	alert("学年名称不能为空！");
        $("#yearname").focus();
    }else {
//    	alert(date);
    	$.ajax({ //使用ajax与服务器异步交互
	        url:"Getschedule?s="+new Date().getTime(), //后面加时间戳，防止IE辨认相同的url，只从缓存拿数据
	        type:"POST",
	        data: {date:date,yearname:yearname,act:"insertSchoolDate"}, //$('#yourformid').serialize()；向后台发送的form表单中的数据
//	        dataType:"json", //接收返回的数据方式为json

	        error:function(XMLHttpRequest,textStatus,errorThrown){
	        	
	            alert("网络错误！");
	        }, //错误提示

	        success:function(data){ //data为交互成功后，后台返回的数据
	        	alert("设置成功！");
	        }
	    });
    }
}