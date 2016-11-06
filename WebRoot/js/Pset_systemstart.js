/**
 * Created by cy on 2016/8/13.
 */
$(document).ready(function(){
	getData();
    $("#btn_ok").on("click",submitdate);
});

function getData() {
	$.ajax({ //使用ajax与服务器异步交互
        url:"Getschedule?s="+new Date().getTime(), //后面加时间戳，防止IE辨认相同的url，只从缓存拿数据
        type:"POST",
        data: {act:"getSystemtime"}, //$('#yourformid').serialize()；向后台发送的form表单中的数据
        dataType:"json", //接收返回的数据方式为json

        error:function(XMLHttpRequest,textStatus,errorThrown){
            alert("网络错误！");
        }, //错误提示

        success:function(data){ //data为交互成功后，后台返回的数据
        	$("#starttime").val(data.systemstart);
        	$("#endtime").val(data.systemclose);
        }
    });
}

function submitdate(){
    var start = $("#starttime").val();
    var end = $("#endtime").val();
    var d1 = new Date(start);  
    var d2 = new Date(end); 
     
    if (start ==''){
        alert("开启时间不能为空！");
        $("#starttime").focus();
        return false;
    }else if(end ==''){
        alert("关闭时间不能为空！");
        $("#endtime").focus();
        return false;
    }else if(d1 >=d2)  
    {  
        alert("开始时间不能大于结束时间！");  
        return false;
    }else{
    	$.ajax({ //使用ajax与服务器异步交互
            url:"Getschedule?s="+new Date().getTime(), //后面加时间戳，防止IE辨认相同的url，只从缓存拿数据
            type:"POST",
            data: {start:start,end:end,act:"setSystemtime"}, //$('#yourformid').serialize()；向后台发送的form表单中的数据
//            dataType:"json", //接收返回的数据方式为json

            error:function(XMLHttpRequest,textStatus,errorThrown){
                alert("网络错误！");
            }, //错误提示

            success:function(data){ //data为交互成功后，后台返回的数据
            	alert("修改成功！");
            }
        });
    }
}