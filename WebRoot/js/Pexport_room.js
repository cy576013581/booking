/**
 * Created by cy on 2016/8/13.
 */
$(document).ready(function () {
	
	getRoom();
	
    $("li").on("click",function(){
        var value = $(this).text();
        $("#roomname").val(value);
    });

    $("#btn_ok").on("click",function(){
        var value = $("#roomname").val();
        var id = $("#roomname").attr("name");
        if (value == ''){
            alert("机房名不能为空")
            $("#roomname").focus();
        }else{
        	var url = "CreateRoomExcel?roomid="+id+"&roomname="+value;
//        	$(this).attr("href","CreateExcel?username="+encodeURI(value));
        	window.open(encodeURI(encodeURI(url)));
        }
    });
});

function getRoom() {
	$.ajax({ //使用ajax与服务器异步交互
//		async:false,
        url:"Classlist?s="+new Date().getTime(), //后面加时间戳，防止IE辨认相同的url，只从缓存拿数据
        type:"POST",
        data: {}, //$('#yourformid').serialize()；向后台发送的form表单中的数据
        dataType:"json", //接收返回的数据方式为json

        error:function(XMLHttpRequest,textStatus,errorThrown){
            alert("网络错误！");
        }, //错误提示

        success:function(data){ //data为交互成功后，后台返回的数据
        	var ul = $("ol");
        	ul.empty();
        	for (var i = 0; i < data.length; i++) {
				var li = $("<li value='"+data[i].id+"'>"+data[i].roomname+"</li>")
				li.on("click",function(){
					var text = $(this).text();
					var value = $(this).val();
					$("#roomname").val(text);
					$("#roomname").attr("name",value);
				});
				ul.append(li);
			}
        }
    });
}
