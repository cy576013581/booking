/**
 * Created by cy on 2016/7/4.
 */
var branchid = new Array();
var areaname = new Array();
$(document).ready(function(){
	
	if(sessionStorage.getItem("username") == null){
		window.location.href="index.html";
	}
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
	$("#shapeloading").show();
	$("#loading").show();
	if(checkDate()==1){
		getBranch();//获取分区
		Makebranch();
		getRoom();
	}else{
		mui.toast("系统暂未开启，可以先添加课程哦");
		document.getElementById("p_warning").style.display = "block";
	}
	$(".branch").on("click",function(){
		var eleid = $(this).attr("id");
		var thisid = eleid.substring(8,eleid.length);
		allHide();
		$(".branchid"+thisid).show();
		$(".branch").removeClass("border");
		$("#branchid"+thisid).addClass("border");
	});
	allHide();
	$("#branchid"+branchid[0]).click();
	$(".branchid"+branchid[0]).show();
	$("#shapeloading").hide();
	$("#loading").hide();
});
var myArray = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

function allHide() {
	for(var i = 0; i < branchid.length; i++){
		$(".branchid"+branchid[i]).hide();
	}
}

function Makebranch(){
	var box = $("#selectBox");
	for(var i = 0; i < branchid.length; i++){
		var a;
		if(i == 0){
			a = $("<a class='branch border' id='branchid"+branchid[i]+"'>"+areaname[i]+"</a>");
		}else{
			a = $("<a class='branch' id='branchid"+branchid[i]+"'>"+areaname[i]+"</a>");
		}
		
		box.append(a);
	}
	
}

function getBranch(){
	$.ajax({ //使用ajax与服务器异步交互
		async:false,
        url:"Classlist?s="+new Date().getTime(), //后面加时间戳，防止IE辨认相同的url，只从缓存拿数据
        type:"POST",
        data: {act:"getBranch"}, //$('#yourformid').serialize()；向后台发送的form表单中的数据
        dataType:"json", //接收返回的数据方式为json
        error:function(XMLHttpRequest,textStatus,errorThrown){
        	mui.toast("网络错误！");
        }, //错误提示
        success:function(data){ //data为交互成功后，后台返回的数据
        	for (var i = 0; i < data.length; i++) {
        		branchid[i] = data[i].id;
        		areaname[i] = data[i].areaname;
			}
        }
    });
}

function getRoom(){
    $.ajax({ //使用ajax与服务器异步交互
    	async:false,
        url:"Classlist?s="+new Date().getTime(), //后面加时间戳，防止IE辨认相同的url，只从缓存拿数据
        type:"POST",
        data: {act:"getRoom"}, //$('#yourformid').serialize()；向后台发送的form表单中的数据
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
            				if(fenqu==parseInt(data[i].branchid) && tool==1){
            					var firstli = $("<li data-group='"+char+"' class='mui-table-view-divider mui-indexed-list-group branchid"+ data[i].branchid +"'>"+char+"</li>");
                				ul.append(firstli);
//            					alert("1:feiqu"+fenqu+" tool "+ tool+" branchid "+ data[i].branchid);
            						
            				}
            				if(fenqu != parseInt(data[i].branchid)){
            					var firstli = $("<li data-group='"+char+"' class='mui-table-view-divider mui-indexed-list-group branchid"+ data[i].branchid +"'>"+char+"</li>");
                				ul.append(firstli);
                				fenqu = data[i].branchid;
//            					alert("2:feiqu"+fenqu+" tool "+ tool+" branchid "+ data[i].branchid);
            					
            				}
            				var li = $("<li  data-value='"+data[i].firstchar+"' data-tags='"+data[i].firstchar+"' class='mui-table-view-cell mui-indexed-list-item branchid"+ data[i].branchid +"'></li>");
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




