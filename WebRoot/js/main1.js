/**
 * Created by cy on 2016/7/4.
 */
mui.init();
mui.ready(function() {
	var header = document.querySelector('header.mui-bar');
	var selectBox = document.getElementById('selectBox');
	var list = document.getElementById('list');
	//calc hieght
	list.style.height = (document.body.offsetHeight - header.offsetHeight-selectBox.offsetHeight) + 'px';
	//create
	window.indexedList = new mui.IndexedList(list);
});
$(document).ready(function(){
	
	$("#shapeloading").show();
	$("#loading").show();
	if(checkDate()==1){
		getRoom();
	}else{
		mui.toast("系统暂未开启，可以先添加课程哦");
		document.getElementById("p_warning").style.display = "block";
	}
	$("#nan").on("click",function(){
		$(".position1").show();
		$(".position2").hide();
		$("#nan").addClass("border");
		$("#bei").removeClass("border");
	});
	$("#bei").on("click",function(){
		$(".position2").show();
		$(".position1").hide();
		$("#bei").addClass("border");
		$("#nan").removeClass("border");
	});
	
	$("#shapeloading").hide();
	$("#loading").hide();
});
var myArray = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
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
            mui.toast("网络错误！");
        }, //错误提示

        success:function(data){ //data为交互成功后，后台返回的数据
//        	alert(data.length);
        	$('ul').empty();
        	var ul = $('ul');
        	for (var a = 0; a < myArray.length; a++) {
        		
        			var tool=0;
        			var fenqu=1;
            		for(var i=0;i<data.length;i++)  {
            		
            		(function(a,i){
            			var char = data[i].firstchar.substring(0,1);
            			if(char == myArray[a]){
            				tool+=1;
            				if(fenqu==parseInt(data[i].position) && tool==1){
            					var firstli = $("<li data-group='"+char+"' class='mui-table-view-divider mui-indexed-list-group position"+ data[i].position +"'>"+char+"</li>");
                				ul.append(firstli);
//            					alert("1:feiqu"+fenqu+" tool "+ tool+" position "+ data[i].position);
            						
            				}
            				if(fenqu != parseInt(data[i].position)){
            					var firstli = $("<li data-group='"+char+"' class='mui-table-view-divider mui-indexed-list-group position"+ data[i].position +"'>"+char+"</li>");
                				ul.append(firstli);
                				fenqu = data[i].position;
//            					alert("2:feiqu"+fenqu+" tool "+ tool+" position "+ data[i].position);
            					
            				}
            				var li = $("<li  data-value='"+data[i].firstchar+"' data-tags='"+data[i].firstchar+"' class='mui-table-view-cell mui-indexed-list-item position"+ data[i].position +"'></li>");
            				var a =  $("<a target='_top' href=booking.html?roomid="+data[i].id+"&roomname="+data[i].roomname+">"+data[i].roomname+"</a>");
            				
                        	var p = $("<p>可坐学生人数：  "+data[i].students+"人</p>");
                        	a.append(p);
                        	li.append(a);
                        	ul.append(li);
            			}
            		})(a,i);
                        
        			}
        		
			}
            
            
        }
    });
}
function checkDate(){      //检查是否符合预定开启时间        
	var flag;
	$.ajax({ //使用ajax与服务器异步交互
		async:false,
        url:"Booking?s="+new Date().getTime(), //后面加时间戳，防止IE辨认相同的url，只从缓存拿数据
        type:"POST",
        data: {act:"checkDate"}, //$('#yourformid').serialize()；向后台发送的form表单中的数据
        dataType:"json", //接收返回的数据方式为json
        error:function(XMLHttpRequest,textStatus,errorThrown){
        	mui.toast("网络错误！");
        }, //错误提示
        success:function(data){ //data为交互成功后，后台返回的数据
//        	alert(data.result);
        	flag = data.result;
//        	alert("flag"+flag);
//			return data.result;
        }
    });
	return flag;
}




