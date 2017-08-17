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
	
	if($.fn.datagrid && $.fn.datagrid.defaults && $.fn.datagrid.defaults.operators ){
        $.fn.datagrid.defaults.operators.nofilter.text = "无";
        $.fn.datagrid.defaults.operators.contains.text = "包含";
        $.fn.datagrid.defaults.operators.equal.text = "=等于";
        $.fn.datagrid.defaults.operators.notequal.text = "!=不等于";
        $.fn.datagrid.defaults.operators.beginwith.text = "^=以*开始";
        $.fn.datagrid.defaults.operators.endwith.text = "$=以*结束";
        $.fn.datagrid.defaults.operators.less.text = "<小于";
        $.fn.datagrid.defaults.operators.lessorequal.text = "<=小于等于";
        $.fn.datagrid.defaults.operators.greater.text = ">大于";
        $.fn.datagrid.defaults.operators.greaterorequal.text = ">=大于等于";
    }

	$('#dg').datagrid('enableFilter',[
  	    {
  	        field:'students',
  	        type:'textbox',
  	        options:{precision:1},
  	        op:['equal','notequal','less','greater']
  	    }
  	]);
	
});

function edit(){
	var row = $('#dg').datagrid('getSelected');
	if (row){
		var id = row.id;
		$("#room_roomname").val(row.roomname);
		$("#room_students").val(row.students);
		$('#dlg').dialog('open');
		$("#btn_ok").on("click",function(){
			var roomname = $("#room_roomname").val();
			var firstchar = getPinyin(roomname);
			var students = $("#room_students").val();
		    if (roomname==''){
		    	layer.msg('警告：机房名不能为空！', {icon: 2});
		        $("#room_roomname").focus();
		    }else if (students==''){
		    	layer.msg('警告：可坐学生人数不能为空！', {icon: 2});
		        $("#room_students").focus();
		    }else{
		    	$.ajax({ //使用ajax与服务器异步交互
//		    		async:false,
		            url:"Manageroom?s="+new Date().getTime(), //后面加时间戳，防止IE辨认相同的url，只从缓存拿数据
		            type:"POST",
		            data: {act:"updateRoom",roomname:roomname,students:students,id:id,firstchar:firstchar}, //$('#yourformid').serialize()；向后台发送的form表单中的数据
		            error:function(XMLHttpRequest,textStatus,errorThrown){
		                alert("网络错误，操作失败！");
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
		        url:"Manageroom?s="+new Date().getTime(), //后面加时间戳，防止IE辨认相同的url，只从缓存拿数据
		        type:"POST",
		        data: {act:"deleteRoom",id:id}, //$('#yourformid').serialize()；向后台发送的form表单中的数据
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


