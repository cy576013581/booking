/**
 * Created by cy on 2016/8/14.
 */
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

function edit(){
	var row = $('#dg').datagrid('getSelected');
	if (row){
		var id = row.id;
		$("#user_username").val(row.username);
		$("#user_depart").val(row.depart);
		$("#user_phone").val(row.phone);
		$("#user_id").val(row.id);
		$('#dlg').dialog('open');
		$("#btn_edit").on("click",function(){
			var username = $("#user_username").val();
			var password = $("#user_password").val();
		    var depart = $("#user_depart").val();
		    var phone = $("#user_phone").val();
		    if (username==''){
		        layer.msg('警告：用户名不能为空！', {icon: 2});
		        $("#user_username").focus();
		    }else if (depart==''){
		        layer.msg('警告：系别不能为空！', {icon: 2});
		        $("#user_depart").focus();
		    }else if (phone==''){
		        layer.msg('警告：电话不能为空！', {icon: 2});
		        $("#user_phone").focus();
		    }else{
		    	$.ajax({ //使用ajax与服务器异步交互
//		    		async:false,
		            url:"Manageuser?s="+new Date().getTime(), //后面加时间戳，防止IE辨认相同的url，只从缓存拿数据
		            type:"POST",
		            data: {act:"updateUser",username:username,depart:depart,phone:phone,password:password,id:id}, //$('#yourformid').serialize()；向后台发送的form表单中的数据
		            error:function(XMLHttpRequest,textStatus,errorThrown){
		                layer.msg('网络错误，操作失败！', {icon: 2});
		            }, //错误提示
		            success:function(data){ //data为交互成功后，后台返回的数据
		            	layer.alert("修改成功");
		            	$('#dlg').dialog('close');
		            	$('#dg').datagrid('reload');
		            	
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
		        url:"Manageuser?s="+new Date().getTime(), //后面加时间戳，防止IE辨认相同的url，只从缓存拿数据
		        type:"POST",
		        data: {act:"deleteUser",id:id}, //$('#yourformid').serialize()；向后台发送的form表单中的数据
		        error:function(XMLHttpRequest,textStatus,errorThrown){
		        	layer.msg('网络错误，操作失败！', {icon: 2});
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

