/**
 * Created by cy on 2016/8/14.
 */
var count;

$(document).ready(function(){
	
	editdialog();
	
	getCount();
	
	$("#News-Pagination").pagination(count, {
        items_per_page:6,//每页显示多少条数据
        current_page:0,//当前显示第几页数据
        num_display_entries:6,//分页显示的条目数
        next_text:"下一页",
        prev_text:"上一页",
        num_edge_entries:2,//链接分页主体，显示的条目数
        callback:handlePaginationClick
    });


});

function  getCount() {
	$.ajax({ //使用ajax与服务器异步交互
		async:false,
        url:"Managenotice?s="+new Date().getTime(), //后面加时间戳，防止IE辨认相同的url，只从缓存拿数据
        type:"POST",
        data: {act:"getSum"}, //$('#yourformid').serialize()；向后台发送的form表单中的数据
        dataType:"json", //接收返回的数据方式为json

        error:function(XMLHttpRequest,textStatus,errorThrown){
            alert("网络错误，登录失败！");
        }, //错误提示

        success:function(data){ //data为交互成功后，后台返回的数据
        	count = data.sum;
        }
    });
	return false;
}

function handlePaginationClick(new_page_index, pagination_container) {
    // This selects 20 elements from a content array
	$.ajax({ //使用ajax与服务器异步交互
        url:"Managenotice?s="+new Date().getTime(), //后面加时间戳，防止IE辨认相同的url，只从缓存拿数据
        type:"POST",
        data: {act:"getAllnotice",page:new_page_index}, //$('#yourformid').serialize()；向后台发送的form表单中的数据
        dataType:"json", //接收返回的数据方式为json

        error:function(XMLHttpRequest,textStatus,errorThrown){
            alert("网络错误，登录失败！");
        }, //错误提示

        success:function(data){ //data为交互成功后，后台返回的数据
        	$("table .tr_td").empty();
//        	alert(data.length);
        	for (var i = 0; i < data.length; i++) {
				(function(i) {
					var tr = $("<tr class='tr_td id"+data[i].id+"'></tr>");
					var td1 = $("<td class='title"+i+"'>"+data[i].title+"</td>");
					var td2 = $("<td class='content"+i+"'>"+data[i].content+"</td>");
					var td3 = $("<td class='releasetime"+i+"'>"+data[i].releasetime+"</td>");
					var td4 = $("<td></td>");
					var btn_edit = $("<button class='btn_edit'>编辑</button>");
					var btn_del = $("<button class='btn_del'>删除</button>");
					$(btn_edit).on("click",function(){
						var id = data[i].id;
//						alert(id);
						$("body").append("<div id='mask'></div>");
				        $("#mask").addClass("mask").fadeIn("slow");
				        $("#SelectBox").fadeIn("slow");
				        
						$("#notice_title").val($(".title"+i).text());
						$("#notice_content").val($(".content"+i).text());
						
						$("#btn_ok").on("click",function(){
							var title = $("#notice_title").val();
							var content = $("#notice_content").val();
						    if (title==''){
						        $(".warning").text("警告：公告标题不能为空！");
						        $("#user_username").focus();
						    }else{
						    	$.ajax({ //使用ajax与服务器异步交互
//						    		async:false,
						            url:"Managenotice?s="+new Date().getTime(), //后面加时间戳，防止IE辨认相同的url，只从缓存拿数据
						            type:"POST",
						            data: {act:"updateNotice",title:title,content:content,id:id}, //$('#yourformid').serialize()；向后台发送的form表单中的数据
//						            dataType:"json", //接收返回的数据方式为json

						            error:function(XMLHttpRequest,textStatus,errorThrown){
						                alert("网络错误，操作失败！");
						            }, //错误提示

						            success:function(data){ //data为交互成功后，后台返回的数据
						            	
						            	$("#SelectBox").fadeOut("fast");
					                    $("#mask").css({ display: 'none' });
					                    $(".title"+i).text(title);
					                    $(".content"+i).text(content);
					                    alert("修改成功");
						            }
						        });
						    	return false;
						    }
						});
					});
					$(btn_del).on("click",function(){
						var id = data[i].id;
						$.ajax({ //使用ajax与服务器异步交互
					        url:"Managenotice?s="+new Date().getTime(), //后面加时间戳，防止IE辨认相同的url，只从缓存拿数据
					        type:"POST",
					        data: {act:"deleteNotice",id:id}, //$('#yourformid').serialize()；向后台发送的form表单中的数据
//					        dataType:"json", //接收返回的数据方式为json
					        error:function(XMLHttpRequest,textStatus,errorThrown){
					            alert("网络错误！");
					        }, //错误提示

					        success:function(data){ //data为交互成功后，后台返回的数据
					        	$(".id"+id).remove();
					        	alert("删除成功！");
					        }
					    });
					});
					td4.append(btn_edit);
					td4.append(btn_del);
					tr.append(td1);
					tr.append(td2);
					tr.append(td3);
					tr.append(td4);
					$("table").append(tr);
				})(i);
			}
        }
    });
    return false;
}

function editdialog() {
	$("#example").hover(function () {
        $(this).stop().animate({
            opacity: '1'
        }, 600);
    }, function () {
        $(this).stop().animate({
            opacity: '0.6'
        }, 1000);
    }).on('click', function () {
        $("body").append("<div id='mask'></div>");
        $("#mask").addClass("mask").fadeIn("slow");
        $("#LoginBox").fadeIn("slow");
    });
	$(".close_btn").hover(function () { $(this).css({ color: 'black' }) }, function () { $(this).css({ color: '#999' }) }).on('click', function () {
        $("#SelectBox").fadeOut("fast");
        $("#mask").css({ display: 'none' });
        $("td[name]").removeAttr("name"); 
    });
}





