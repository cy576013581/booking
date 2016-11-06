
$(document).ready(function() {
	$('.page-container form .username, .page-container form .password').keyup(function(){
        $(this).parent().find('.error').fadeOut('fast');
    });
	
	function changeVerifyCode(){
        $("#yzmImg").attr("src","Kaptcha.jpg?"+Math.floor(Math.random()*100));
    }
	
    $('#btn_ok').on("click",login);

    

});

function login() {
	
	var verifyCode = $("#verifyCode").val();
	var username = $(".username").val();
    var password = $(".password").val();
    if(username == '') {
        $('.page-container form').find('.error').fadeOut('fast', function(){
            $('.error').css('top', '27px');
        });
        $('.page-container form').find('.error').fadeIn('fast', function(){
            $('.page-container form').parent().find('.username').focus();
        });
        return false;
    }else if(password == '') {
        $('.page-container form').find('.error').fadeOut('fast', function(){
            $('.error').css('top', '96px');
        });
        $('.page-container form').find('.error').fadeIn('fast', function(){
            $('.page-container form').parent().find('.password').focus();
        });
        return false;
    }else if(verifyCode == '') {
        $('.page-container form').find('.error').fadeOut('fast', function(){
            $('.error').css('top', '165px');
        });
        $('.page-container form').find('.error').fadeIn('fast', function(){
            $('.page-container form').parent().find('#"verifyCode"').focus();
        });
        return false;
    }else{
    	 $.ajax({ //使用ajax与服务器异步交互
//    	    	async:false,
    	        url:"Login?s="+new Date().getTime(), //后面加时间戳，防止IE辨认相同的url，只从缓存拿数据
    	        type:"POST",
    	        
    	        data: {username:username,password:password,act:"adminlogin",verifyCode:verifyCode}, //$('#yourformid').serialize()；向后台发送的form表单中的数据
    	        dataType:"json", //接收返回的数据方式为json

    	        error:function(XMLHttpRequest,textStatus,errorThrown){
//    	            alert(XMLHttpRequest.status);
//    	            alert(XMLHttpRequest.readyState);
//    	            alert(textStatus);
//    	            alert(errorThrown);
    	        	alert("网络错误！");
    	        }, //错误提示

    	        success:function(data){ //data为交互成功后，后台返回的数据
    	            var flag =data.flag;//服务器返回标记
    	            if(flag==1){
    	            	alert("登录成功！");
//    	            	window.close();
//    	              sessionStorage.username = $(".txt_username").val();
//    	            	sessionStorage.setItem("username", $(".txt_username").val());
    	            	window.location.href="Pmain.html";
    	            }else if(flag==0){
    	            	alert("用户名或密码错误！");
    				}else if(flag==2){
    	            	alert("验证码错误！");
    				}
    	        }
    	       
    	    });
    	    return false;
    }
   
}
