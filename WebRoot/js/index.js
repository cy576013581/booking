/**
 * Created by cy on 2016/6/30.
 */

$(document).ready(function(){
	
	 
	$(".txt_username").css("background-color","transparent");
	
	$(".a_showbooking").on("click",function(){
	});
	
    $(".btn_login").click(function(){
        var username = $(".txt_username").val();
        var password = $(".txt_pwd").val();
        if (username =="" || password==""){
            mui.toast("用户名或密码不能为空！");

        }else {
        	$("#loading").show();
        	$("#shapeloading").show();
             $.ajax({ //使用ajax与服务器异步交互
                url:"Login?s="+new Date().getTime(), //后面加时间戳，防止IE辨认相同的url，只从缓存拿数据
                type:"POST",
                data: {username:username,password:password,act:"userlogin"}, //$('#yourformid').serialize()；向后台发送的form表单中的数据
                dataType:"json", //接收返回的数据方式为json

                error:function(XMLHttpRequest,textStatus,errorThrown){
//                    alert(XMLHttpRequest.status);
//                    alert(XMLHttpRequest.readyState);
//                    alert(textStatus);
//                    alert(errorThrown);
                	
//                	alert("网络错误,登录失败！");
                	mui.toast("网络错误,登录失败！");
                }, //错误提示

                success:function(data){ //data为交互成功后，后台返回的数据
                    var flag =data.flag;//服务器返回标记
                    if(flag){
//                    	alert("登录成功！");
//                    	window.close();
                    	mui.toast("登录成功！");
                    	sessionStorage.removeItem("username");
//                      sessionStorage.username = $(".txt_username").val();
                    	sessionStorage.setItem("username", $(".txt_username").val());
                    	
                    	window.location.href="main.html";
                    	
                    }else {
                    	$("#shapeloading").hide();
                    	$("#loading").hide();
//                    	alert("用户名或密码错误！");
                    	mui.toast("用户名或密码错误！");
					}
                }
            });
            return false; 
        }
    });
});
