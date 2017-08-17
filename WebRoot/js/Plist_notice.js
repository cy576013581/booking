/**
 * Created by cy on 2016/8/14.
 */
var um;
$(document).ready(function(){
	if(sessionStorage.getItem("username") == null){
		window.location.href="Pindex.html";
	}
	//实例化编辑器
	um = UM.getEditor('myEditor');
	
	$('#dg').datagrid({
		onDblClickCell: function(index,field,value){
			edit();
		}
	});
	
	$('#dg').datagrid('enableFilter');

});

function editNotice(){
	var row = $('#dg').datagrid('getSelected');
	if (row){
		var id = row.id;
		$("#notice_title").val(row.title);
		um.setContent("");
		um.execCommand('insertHtml', row.content);
		$('#dlg').dialog('open');
		$("#btn_ok").on("click",function(){
			var title = $("#notice_title").val();
			var content = UM.getEditor('myEditor').getContent();
		    if (title==''){
		        layer.msg('警告：公告标题不能为空！', {icon: 2});
		        $("#notice_title").focus();
		    }else{
		    	$.ajax({ //使用ajax与服务器异步交互
//		    		async:false,
		            url:"Managenotice?s="+new Date().getTime(), //后面加时间戳，防止IE辨认相同的url，只从缓存拿数据
		            type:"POST",
		            data: {act:"updateNotice",title:title,content:content,id:id}, //$('#yourformid').serialize()；向后台发送的form表单中的数据
//		            dataType:"json", //接收返回的数据方式为json

		            error:function(XMLHttpRequest,textStatus,errorThrown){
		                alert("网络错误，操作失败！");
		            }, //错误提示

		            success:function(data){ //data为交互成功后，后台返回的数据
		            	layer.alert("修改成功");
		            	$('#dlg').dialog('close');
		            	$('#dg').datagrid('reload');
		            	
	                    return false;
		            }
		        });
		    }
		});
	}else{
		layer.alert("没有选中任何行！");
	}
}

function remove(){
	var row = $('#dg').datagrid('getSelected');
	if (row){
		layer.confirm('确定要删除该条信息？', {
		  btn: ['删除','取消'] //按钮
		}, function(){
			var id = row.id;
			$.ajax({ //使用ajax与服务器异步交互
		        url:"Managenotice?s="+new Date().getTime(), //后面加时间戳，防止IE辨认相同的url，只从缓存拿数据
		        type:"POST",
		        data: {act:"deleteNotice",id:id}, //$('#yourformid').serialize()；向后台发送的form表单中的数据
//		        dataType:"json", //接收返回的数据方式为json
		        error:function(XMLHttpRequest,textStatus,errorThrown){
		            alert("网络错误！");
		        }, //错误提示
		        success:function(data){ //data为交互成功后，后台返回的数据
		        	layer.alert("删除成功！");
		        	$('#dg').datagrid('reload');
		        	
		        }
		    });
		});
		
		
	}else{
		layer.alert("没有选中任何行！");
	}
}


/*function handlePaginationClick(new_page_index, pagination_container) {
    // This selects 20 elements from a content array
	$.ajax({ //使用ajax与服务器异步交互
        url:"Managenotice?s="+new Date().getTime(), //后面加时间戳，防止IE辨认相同的url，只从缓存拿数据
        type:"POST",
        data: {act:"getAllnotice",page:new_page_index}, //$('#yourformid').serialize()；向后台发送的form表单中的数据
        dataType:"json", //接收返回的数据方式为json

        error:function(XMLHttpRequest,textStatus,errorThrown){
            alert("网络错误！");
        }, //错误提示

        success:function(data){ //data为交互成功后，后台返回的数据
        	$("table .tr_td").empty();
//        	alert(data.length);
        	for (var i = 0; i < data.length; i++) {
				(function(i) {
					var tr = $("<tr class='tr_td id"+data[i].id+"'></tr>");
					var td1 = $("<td class='title"+i+"'>"+data[i].title+"</td>");
					var td2 = $("<td class='content content"+i+"'>"+data[i].content+"</td>");
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
						um.execCommand('insertHtml', data[i].content);
						$("#btn_ok").on("click",function(){
							var title = $("#notice_title").val();
							var content = UM.getEditor('myEditor').getContent();
						    if (title==''){
						        $(".warning").text("警告：公告标题不能为空！");
						        $("#notice_title").focus();
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
					                    $(".content"+i).html(content);
					                    alert("修改成功");
					                    return false;
						            }
						        });
						    	
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
					        	return false;
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
}*/





