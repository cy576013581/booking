/**
 * Created by cy on 2016/8/14.
 */
var count;
$(document).ready(function(){
	if(sessionStorage.getItem("username") == null){
		window.location.href="Pindex.html";
	}
	
	$('#dg').datagrid({
		onDblClickCell: function(index,field,value){
			edit();
		}
	});

	$('#dg').datagrid('enableFilter');

});

function addAreaname(){
	$("#edit_areaname").val("");
	$('#dlg').dialog('open');
	$("#btn_ok").on("click",function(){
		var areaname = $("#edit_areaname").val();
	    if (areaname==''){
	        layer.msg('警告：分区名不能为空！', {icon: 2});
	        $("#edit_areaname").focus();
	    }else{
	    	$.ajax({ //使用ajax与服务器异步交互
	    		async:false,
	            url:"Manageroom?s="+new Date().getTime(), //后面加时间戳，防止IE辨认相同的url，只从缓存拿数据
	            type:"POST",
	            data: {act:"addBranch",areaname:areaname}, //$('#yourformid').serialize()；向后台发送的form表单中的数据
//		            dataType:"json", //接收返回的数据方式为json
	            error:function(XMLHttpRequest,textStatus,errorThrown){
	            	layer.alert("网络错误，操作失败！");
	            }, //错误提示

	            success:function(data){ //data为交互成功后，后台返回的数据
	            	$('#dlg').dialog('close');
	            	$('#dg').datagrid('reload');
	            	layer.alert("添加成功！");
	            }
	        });
	    	return false;
	    }
	});
}

function edit(){
	var row = $('#dg').datagrid('getSelected');
	if (row){
		var id = row.id;
		
		$("#edit_areaname").val(row.areaname);
		$('#dlg').dialog('open');
		$("#btn_ok").on("click",function(){
			var areaname = $("#edit_areaname").val();
		    if (areaname==''){
		        layer.msg('警告：分区名不能为空！', {icon: 2});
		        $("#edit_areaname").focus();
		    }else{
		    	$.ajax({ //使用ajax与服务器异步交互
		    		async:false,
		            url:"Manageroom?s="+new Date().getTime(), //后面加时间戳，防止IE辨认相同的url，只从缓存拿数据
		            type:"POST",
		            data: {act:"updateBranch",areaname:areaname,id:id}, //$('#yourformid').serialize()；向后台发送的form表单中的数据
//		            dataType:"json", //接收返回的数据方式为json
		            error:function(XMLHttpRequest,textStatus,errorThrown){
		            	layer.alert("网络错误，操作失败！");
		            }, //错误提示

		            success:function(data){ //data为交互成功后，后台返回的数据
		            	$('#dlg').dialog('close');
		            	$('#dg').datagrid('reload');
		            	layer.alert("修改成功！");
		            }
		        });
		    	return false;
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
		        url:"Manageroom?s="+new Date().getTime(), //后面加时间戳，防止IE辨认相同的url，只从缓存拿数据
		        type:"POST",
		        data: {act:"deleteBranch",id:id}, //$('#yourformid').serialize()；向后台发送的form表单中的数据
//		        dataType:"json", //接收返回的数据方式为json
		        error:function(XMLHttpRequest,textStatus,errorThrown){
		        	layer.msg('网络错误，操作失败！', {icon: 2});
		        }, //错误提示

		        success:function(data){ //data为交互成功后，后台返回的数据
		        	$('#dg').datagrid('reload');
		        	layer.alert("删除成功！");
		        }
		    });
		});
		
	}else{
		layer.alert("没有选中任何行！");
	}
}

function add() {
    $("#btn_add").on("click",function(){
    	var areaname = $("#add_areaname").val();
    	$.ajax({ //使用ajax与服务器异步交互
   	        url:"Manageroom?s="+new Date().getTime(), //后面加时间戳，防止IE辨认相同的url，只从缓存拿数据
   	        type:"POST",
   	        data: {act:"addBranch",areaname:areaname}, //$('#yourformid').serialize()；向后台发送的form表单中的数据
//   	        dataType:"json", //接收返回的数据方式为json
   	        error:function(XMLHttpRequest,textStatus,errorThrown){
   	            alert("网络错误！");
   	        }, //错误提示

   	        success:function(data){ //data为交互成功后，后台返回的数据
   	        	alert("添加成功！");
   	        	location.reload();
   	        }
   	    });
    	return false;
    });
}

/*function  getBranch() {
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
        	for (var i = 0; i < data.length; i++) {
				(function(i) {
					var tr = $("<tr class='tr_td id"+data[i].id+"'></tr>");
					var td1 = $("<td class='areaname"+i+"'>"+data[i].areaname+"</td>");
					var td4 = $("<td></td>");
					var btn_edit = $("<button class='btn_edit'>编辑</button>");
					var btn_del = $("<button class='btn_del'>删除</button>");
					$(btn_edit).on("click",function(){
						var id = data[i].id;
//						alert(id);
						$("body").append("<div id='mask'></div>");
				        $("#mask").addClass("mask").fadeIn("slow");
				        $("#SelectBox").fadeIn("slow");
				        
						$("#areaname").val($(".areaname"+i).text());
						
						$("#btn_ok").on("click",function(){
							var areaname = $("#areaname").val();
						    if (areaname==''){
						    	$(".warning").text("警告：分区名不能为空！");
						        $("#areaname").focus();
						    }else{
						    	$.ajax({ //使用ajax与服务器异步交互
//						    		async:false,
						            url:"Manageroom?s="+new Date().getTime(), //后面加时间戳，防止IE辨认相同的url，只从缓存拿数据
						            type:"POST",
						            data: {act:"updateBranch",areaname:areaname,id:id}, //$('#yourformid').serialize()；向后台发送的form表单中的数据
//						            dataType:"json", //接收返回的数据方式为json

						            error:function(XMLHttpRequest,textStatus,errorThrown){
						                alert("网络错误，操作失败！");
						            }, //错误提示

						            success:function(data){ //data为交互成功后，后台返回的数据
						            	
						            	$("#SelectBox").fadeOut("fast");
					                    $("#mask").css({ display: 'none' });
					                    $(".areaname"+i).text(areaname);
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
					        url:"Manageroom?s="+new Date().getTime(), //后面加时间戳，防止IE辨认相同的url，只从缓存拿数据
					        type:"POST",
					        data: {act:"deleteBranch",id:id}, //$('#yourformid').serialize()；向后台发送的form表单中的数据
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
					tr.append(td4);
					$("table").append(tr);
				})(i);
			}
        }
    });
	return false;
}
*/

