/**
 * Created by cy on 2016/7/4.
 */
//$(".list_layout").load("schedule.html #schedule_layout",null,function(){alert("加载成功")});
$(document).ready(function(){
	if(sessionStorage.getItem("username") == null){
		window.location.href="index.html";
	}
	$(".icon_back").on("click",back);
	getNotice();
});
function back(){
	window.history.back(-1); 
}

function getNotice(){
    $.ajax({ //使用ajax与服务器异步交互
        url:"Mybooking?s="+new Date().getTime(), //后面加时间戳，防止IE辨认相同的url，只从缓存拿数据
        type:"POST",
        data: {act:"getAllnotice"}, //$('#yourformid').serialize()；向后台发送的form表单中的数据
        dataType:"json", //接收返回的数据方式为json

        error:function(XMLHttpRequest,textStatus,errorThrown){
            alert("网络错误！");
        }, //错误提示

        success:function(data){ //data为交互成功后，后台返回的数据
        	var box = $(".box_body");
            for(var i  in  data)  {
            	(function(i) {
            		var card = $("<div class='mui-card'></div>");
                	var header = $("<div class='mui-card-header mui-card-media' style='background-image:url(image/cbd.jpg);max-height:200px;'></div>");
                	var content = $("<div class='mui-card-content'></div>");
                	var footer = $("<div class='mui-card-footer'></div>");
                	
                	var inner = $("<div class='mui-card-content-inner'></div>");
                	var p1 = $("<p class='text_title'>"+data[i].title+"</p>");
                	var p2 = $("<p class='text_releasetime'>发表于："+data[i].releasetime+"</p>");
                	var p3 = $("<p class='text_content'>"+data[i].content+"</p>");
                	inner.append(p1);
                	inner.append(p2);
                	inner.append(p3);
                	content.append(inner);

					var a1 = $("<a class='mui-card-link'>置顶</a>");
					var a2 = $("<a class='mui-card-link' href='main4_noticelist_info.html?id="+data[i].id+"'>阅读更多</a>");
					footer.append(a1);
					footer.append(a2);
					
					card.append(header);
					card.append(content);
					card.append(footer);
					box.append(card);
				}(i));
            	
			}
            
        }
    });
}


