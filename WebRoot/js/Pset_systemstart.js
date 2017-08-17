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
        data: {act:"getSystemtime"}, //$('#yourformid').serialize()；向后台发送的form表单中的数据
        dataType:"json", //接收返回的数据方式为json

        error:function(XMLHttpRequest,textStatus,errorThrown){
        	layer.alert("网络错误!");
        }, //错误提示

        success:function(data){ //data为交互成功后，后台返回的数据
        	if("" != data.systemstart){
            	$("#starttime").datetimebox("setValue",new Date(data.systemstart).Format("yyyy-MM-dd hh:mm:ss"));
        	}
        	if("" != data.systemclose){
            	$("#endtime").datetimebox("setValue",new Date(data.systemclose).Format("yyyy-MM-dd hh:mm:ss"));
        	}
        }
    });
}

function submitdate(){
    var start = $("#starttime").val();
    var end = $("#endtime").val();
    if("" == start || "" == end){
    	layer.alert("所填写的时间不能为空！");  
        return false;
    }
    var d1 = new Date(start).Format("yyyy-MM-dd hh:mm:ss");  
    var d2 = new Date(end).Format("yyyy-MM-dd hh:mm:ss"); 
    if(d1 >=d2)  
    {  
    	layer.alert("开始时间不能大于结束时间！");  
        return false;
    }else{
    	$.ajax({ //使用ajax与服务器异步交互
            url:"Getschedule?s="+new Date().getTime(), //后面加时间戳，防止IE辨认相同的url，只从缓存拿数据
            type:"POST",
            data: {start:start,end:end,act:"setSystemtime"}, //$('#yourformid').serialize()；向后台发送的form表单中的数据
//            dataType:"json", //接收返回的数据方式为json

            error:function(XMLHttpRequest,textStatus,errorThrown){
            	layer.alert("网络错误!");
            }, //错误提示

            success:function(data){ //data为交互成功后，后台返回的数据
            	layer.alert("修改成功!");
            }
        });
    }
}

Date.prototype.Format = function(fmt)     
{ //author: meizz  
  var o = {     
    "M+" : this.getMonth()+1,                 //月份  
	"d+" : this.getDate(),                    //日  
    "h+" : this.getHours(),                   //小时  
    "m+" : this.getMinutes(),                 //分  
    "s+" : this.getSeconds(),                 //秒  
    "q+" : Math.floor((this.getMonth()+3)/3), //季度  
    "S"  : this.getMilliseconds()             //毫秒  
  };     
  if(/(y+)/.test(fmt))     
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));     
  for(var k in o)     
    if(new RegExp("("+ k +")").test(fmt))     
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));     
  return fmt;     
};