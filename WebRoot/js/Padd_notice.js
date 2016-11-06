/**
 * Created by cy on 2016/8/15.
 */
$(document).ready(function(){
   $(".btn_ok").on("click",function(){

       var title = $(".title").val();
       var content = $(".content").val();
       if (title==''){
           alert("请输入标题！");
           $(".title").focus();
       }else{
    	   $.ajax({ //使用ajax与服务器异步交互
      	        url:"Managenotice?s="+new Date().getTime(), //后面加时间戳，防止IE辨认相同的url，只从缓存拿数据
      	        type:"POST",
      	        data: {act:"addNotice",title:title,content:content}, //$('#yourformid').serialize()；向后台发送的form表单中的数据
//      	        dataType:"json", //接收返回的数据方式为json

      	        error:function(XMLHttpRequest,textStatus,errorThrown){
      	            alert("网络错误，登录失败！");
      	        }, //错误提示

      	        success:function(data){ //data为交互成功后，后台返回的数据
      	        	alert("添加成功！");
      	        	$(".title").val("");
      	        	$(".content").val("");
      	        }
      	    });

       }
   });
});