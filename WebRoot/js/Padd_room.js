/**
 * Created by cy on 2016/8/15.
 */
$(document).ready(function(){
	if(sessionStorage.getItem("username") == null){
		window.location.href="Pindex.html";
	}
	getBranch();
   $(".btn_ok").on("click",function(){
	   var position = $(".areaname").children('option:selected').val();
       var roomname = $(".roomname").val();
       var firstchar = getPinyin(roomname);
       var students = $(".students").val();
//       alert(position);
       if (roomname==''){
           alert("请输入机房名称！");
           $(".roomname").focus();
       }else if (students==''){
           alert("请输入机房可坐人数！");
           $(".students").focus();
       }else{
    	   
    	   $.ajax({ //使用ajax与服务器异步交互
   	        url:"Manageroom?s="+new Date().getTime(), //后面加时间戳，防止IE辨认相同的url，只从缓存拿数据
   	        type:"POST",
   	        data: {act:"addRoom",roomname:roomname,students:students,position:position,firstchar:firstchar}, //$('#yourformid').serialize()；向后台发送的form表单中的数据
//   	        dataType:"json", //接收返回的数据方式为json

   	        error:function(XMLHttpRequest,textStatus,errorThrown){
   	            alert("网络错误！");
   	        }, //错误提示

   	        success:function(data){ //data为交互成功后，后台返回的数据
   	        	alert("添加成功！");
   	        	$(".roomname").val("");
   	        	$(".students").val("");
   	        }
   	    	});

       }
   });
});

function  getBranch() {
	$.ajax({ //使用ajax与服务器异步交互
		async:false,
        url:"Manageroom?s="+new Date().getTime(), //后面加时间戳，防止IE辨认相同的url，只从缓存拿数据
        type:"POST",
        data: {act:"getBranch"}, //$('#yourformid').serialize()；向后台发送的form表单中的数据
        dataType:"json", //接收返回的数据方式为json

        error:function(XMLHttpRequest,textStatus,errorThrown){
            alert("网络错误！");
        }, //错误提示

        success:function(data){ //data为交互成功后，后台返回的数据
        	var select = $(".areaname");
        	for (var i = 0; i < data.length; i++) {
				(function(i) {
					var option = $("<option value='"+ data[i].id +"'>"+ data[i].areaname +"</option>");
					select.append(option);
				})(i);
			}
        }
    });
}