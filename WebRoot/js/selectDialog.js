/**
 * Created by cy on 2016/7/10.
 */
$(function ($) {

    //
    //按钮的透明度
    //文本框不允许为空---按钮触发
    $("#btn_ok").on('click', function () {
//    	alert(year+"="+month+"="+day+"="+sec);
    	booking();
    });
    $(".close_btn").hover(function () { $(this).css({ color: 'black' }) }, function () { $(this).css({ color: '#999' }) }).on('click', function () {
        $("#SelectBox").fadeOut("fast");
        $("#mask").css({ display: 'none' });
        $("td[name]").removeAttr("name"); 
    });
});

function booking(classtime) {
	var selectClass = $("#selectClass").children('option:selected').val();
    var selectCourse = $("#selectCourse").children('option:selected').val();
    
    var sec = $("td[name]").attr("name").charAt(1); 
	var week = $("td[name]").attr("name").charAt(0); 
	var month;
	var year = new Date().getFullYear();
	$("td[name]").removeAttr("name"); 
	
	var day = $(".date"+week).text();
//	alert("day:"+day+"week:"+week+"day<week:"+day<week);
	if(isNaN(day)){//是字符串
		month=day.substring(0,day.length-1);
		day=1;
	}else{
		if(day-week < 0){//有月份
			for (var i = 1; i < 8; i++) {
				var headdate = $(".date"+i).text();
				if(isNaN(headdate)){
		    		month=headdate.substring(0,headdate.length-1);
		    	}else{}
			}
		} 
		else{
			var month_first = $("#month_first").text();
			
			month = month_first.substring(0,month_first.length-1);
		}
	}
	var nowdate = new Date();
	if(month<(nowdate.getMonth()+1)&&month<9){
		year += 1;
	}
//	alert(year+"="+month+"="+day+"="+sec);
	classtime = year+"-"+month+"-"+day;
//	alert(classtime);
    if (selectClass == "" || selectClass == undefined || selectClass == null ||selectCourse == "" || selectCourse == undefined || selectCourse == null) {
        $(".warning").text("提示：班级和课程不能为空！");
    }else{
    	$.ajax({ //使用ajax与服务器异步交互
            url:"Booking?s="+new Date().getTime(), //后面加时间戳，防止IE辨认相同的url，只从缓存拿数据
            type:"post",
            contentType:'application/x-www-form-urlencoded; charset=UTF-8',
            data: {roomid:roomid,username:username,classtime:classtime,section:sec,act:"booking",classname:selectClass,coursename:selectCourse}, //$('#yourformid').serialize()；向后台发送的form表单中的数据
            dataType:"json", //接收返回的数据方式为json
            error:function(XMLHttpRequest,textStatus,errorThrown){
                alert("网络错误，操作失败！");
            }, //错误提示
            
            success:function(data){ //data为交互成功后，后台返回的数据;
            	var state = data.state;
            	if(state=='success'){
            		$("#SelectBox").fadeOut("fast");
                    $("#mask").css({ display: 'none' });
                    var str=username+"-"+selectClass+"-"+selectCourse;
            		$("#lesson"+week+sec).text(str);
            		$("#lesson"+week+sec).attr("value",data.id);
            		mui.toast("预定成功!");
            	}else{
            		$("#SelectBox").fadeOut("fast");
                    $("#mask").css({ display: 'none' });
            		swal("您晚了一步!", "这个机房已被占用！", "error");
            	}
            	
            }
        });
    }
}

$( "#popupBasic" ).on({
    popupbeforeposition: function() {
        var h = $( window ).height(); 
        $( "#list_readyBooking" ).css("height", h);
    }
});

