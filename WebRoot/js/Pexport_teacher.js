/**
 * Created by cy on 2016/8/13.
 */
$(document).ready(function () {
	if(sessionStorage.getItem("username") == null){
		window.location.href="Pindex.html";
	}
	getTeacher();
	
    $("#btn_ok").on("click",function(){
        var value = $("#teacher_username").val();
        if (value == ''){
        	layer.alert("账号不能为空")
            $("#teacher_username").focus();
        }else{
        	var url = "CreateExcel?username="+value;
//        	$(this).attr("href","CreateExcel?username="+encodeURI(value));
        	window.open(encodeURI(encodeURI(url)));
        }
    });
});

function getTeacher() {
	$.ajax({ //使用ajax与服务器异步交互
//		async:false,
        url:"Manageuser?s="+new Date().getTime(), //后面加时间戳，防止IE辨认相同的url，只从缓存拿数据
        type:"POST",
        data: {act:"getUserexcel"}, //$('#yourformid').serialize()；向后台发送的form表单中的数据
        dataType:"json", //接收返回的数据方式为json

        error:function(XMLHttpRequest,textStatus,errorThrown){
        	layer.alert("网络错误！");
        }, //错误提示

        success:function(data){ //data为交互成功后，后台返回的数据
        	var ul = $("ol");
        	ul.empty();
        	for (var i = 0; i < data.length; i++) {
				var li = $("<li>"+data[i].username+"</li>")
				li.on("click",function(){
					var value = $(this).text();
					$("#teacher_username").val(value);
				});
				ul.append(li);
			}
        }
    });
}

