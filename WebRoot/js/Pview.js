/**
 * Created by cy on 2016/8/15.
 */
$(document).ready(function(){
	getCount();
});
function getCount(){
    $.ajax({ //使用ajax与服务器异步交互
        url:"Managerview?s="+new Date().getTime(), //后面加时间戳，防止IE辨认相同的url，只从缓存拿数据
        type:"post",
        data: {act:"getCount"}, //$('#yourformid').serialize()；向后台发送的form表单中的数据
        dataType:"json", //接收返回的数据方式为json
        error:function(XMLHttpRequest,textStatus,errorThrown){
            alert("网络错误！");
        }, //错误提示
        
        success:function(data){ //data为交互成功后，后台返回的数据;
        	$("#sum_logins").text(data.countuser);
        	$("#sum_bookings").text(data.countlogin);
        	$("#sum_rooms").text(data.countbooking);
        	$("#sum_users").text(data.countroom);
        }
    });
}
