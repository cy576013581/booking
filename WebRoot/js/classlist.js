/**
 * Created by cy on 2016/7/4.
 */
//$(".list_layout").load("schedule.html #schedule_layout",null,function(){alert("加载成功")});

$(document).ready(function(){
	$("#shapeloading").show();
	$("#loading").show();
	getRoom();
	$(".icon_back").on("click",back);
	$("#nan").on("click",function(){
		$(".position1").show();
		$(".position2").hide();
	});
	$("#bei").on("click",function(){
		$(".position2").show();
		$(".position1").hide();
	});
	$("#shapeloading").hide();
	$("#loading").hide();
});

function back(){
	window.history.back(-1); 
}

function getRoom(){
    $.ajax({ //使用ajax与服务器异步交互
    	async:false,
        url:"Classlist?s="+new Date().getTime(), //后面加时间戳，防止IE辨认相同的url，只从缓存拿数据
        type:"POST",
        data: {}, //$('#yourformid').serialize()；向后台发送的form表单中的数据
        dataType:"json", //接收返回的数据方式为json

        error:function(XMLHttpRequest,textStatus,errorThrown){
            //alert(XMLHttpRequest.status);
            //alert(XMLHttpRequest.readyState);
            //alert(textStatus);
            //alert(errorThrown);
            alert("网络错误！");
        }, //错误提示

        success:function(data){ //data为交互成功后，后台返回的数据
        	$('ul').empty();
            for(var i  in  data)  {
            	
            	var ul = $("#list");
//            	var li = $("<li><a data-ajax='false' target='_top' href=booking.html?roomid="+data[i].id+"&roomname="+data[i].roomname+">"+data[i].roomname+"</a></li>");
            	var li = $("<li class='position"+ data[i].position +"'></li>");
            	var a =  $("<a data-ajax='false' target='_top' href=schedule.html?roomid="+data[i].id+"&roomname="+data[i].roomname+">"+data[i].roomname+"</a>");
            	// 
            	var p = $("<p>可坐学生人数：  "+data[i].students+"人</p>");
            	a.append(p);
            	li.append(a);
            	ul.append(li);
            	$('ul').listview('refresh'); 
			}
            
        }
    });
}


