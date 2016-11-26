/**
 * Created by cy on 2016/8/15.
 */
$(document).ready(function(){
	
   $(".btn_ok").on("click",function(){
       var username = $(".username").val();
       var password = $(".password").val();
       var depart = $(".depart").val();
       var phone = $(".phone").val();
       if (username==''){
           alert("请输入用户名！");
           $(".username").focus();
       }else if (password==''){
           alert("请输入用户名！");
           $(".password").focus();
       }else if (depart==''){
           alert("请输入部门！");
           $(".depart").focus();
       }else if (phone==''){
           alert("请输入联系方式！");
           $(".phone").focus();
       }else{
    	   $.ajax({ //使用ajax与服务器异步交互
    	        url:"Manageuser?s="+new Date().getTime(), //后面加时间戳，防止IE辨认相同的url，只从缓存拿数据
    	        type:"POST",
    	        data: {act:"addUser",username:username,password:password,depart:depart,phone:phone}, //$('#yourformid').serialize()；向后台发送的form表单中的数据
//    	        dataType:"json", //接收返回的数据方式为json

    	        error:function(XMLHttpRequest,textStatus,errorThrown){
    	            alert("网络错误！");
    	        }, //错误提示

    	        success:function(data){ //data为交互成功后，后台返回的数据
    	        	alert("添加成功！");
    	        	$(".username").val("");
    	        	$(".password").val("123456");
    	        	$(".depart").val("");
    	        	$(".phone").val("");
    	        }
    	    });
    	   return false;
       }
   });
});