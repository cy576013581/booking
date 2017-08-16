/**
 * Created by cy on 2016/8/15.
 */
var um;
$(document).ready(function(){
	if(sessionStorage.getItem("username") == null){
		window.location.href="Pindex.html";
	}
	//实例化编辑器
	um = UM.getEditor('myEditor');
	$(".btn_ok").on("click",function(){
		var arr = UM.getEditor('myEditor').getContent();
	    var title = $(".title").val();
	    if (title==''){
	    	layer.alert("请输入标题！");
           $(".title").focus();
	    }else{
    	   $.ajax({ //使用ajax与服务器异步交互
      	        url:"Managenotice?s="+new Date().getTime(), //后面加时间戳，防止IE辨认相同的url，只从缓存拿数据
      	        type:"POST",
      	        data: {act:"addNotice",title:title,content:arr}, //$('#yourformid').serialize()；向后台发送的form表单中的数据
//      	        dataType:"json", //接收返回的数据方式为json

      	        error:function(XMLHttpRequest,textStatus,errorThrown){
      	        	layer.alert("网络错误！");
      	        }, //错误提示

      	        success:function(data){ //data为交互成功后，后台返回的数据
      	        	layer.confirm('添加成功！', {
    	        		btn: ['确定'] //按钮
	        		}, function(){
	        			location.reload();
	        		});
      	        }
      	    });

       }
   });
});
