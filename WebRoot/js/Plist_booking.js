/**
 * Created by cy on 2016/8/14.
 */
$(document).ready(function(){
	if(sessionStorage.getItem("username") == null){
		window.location.href="Pindex.html";
	}
	
	$('#dg').datagrid({
		onDblClickCell: function(index,field,value){
			editBooking();
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
	var dg = $('#dg');
	dg.datagrid('enableFilter',[
	    {
            field:'section',
            type:'combobox',
            options:{
                panelHeight:'auto',
                data:[{value:'第一大节',text:'第一大节'},{value:'第二大节',text:'第二大节'},{value:'午间',text:'午间'},{value:'第三大节',text:'第三大节'},{value:'第四大节',text:'第四大节'},{value:'晚间',text:'晚间'}],
                onChange:function(value){
                    if (value == ''){
                        dg.datagrid('removeFilterRule', 'section');
                    } else {
                        dg.datagrid('addFilterRule', {
                            field: 'section',
                            op: 'equal',
                            value: value
                        });
                    }
                    dg.datagrid('doFilter');
                }
            }
        },{
	        field:'students',
	        type:'textbox',
	        options:{precision:1},
	        op:['equal','notequal','less','greater']
	    }
	]);
	
	getRoom();
	
	$("#edit_class").on("change",function(){
		getCourse();
	});
	
});
function editBooking(){
	var row = $('#dg').datagrid('getSelected');
	if (row){
		$("#edit_username").val(row.username);
		getClass();
		$('#dlg').dialog('open');
		var id = row.id;
		
		
		$("#edit_class").val(row.classname);
		
		//获取所有的课程
		var classname = $("#edit_class").val();
		var username = $("#edit_username").val();
	    $.ajax({ //使用ajax与服务器异步交互
	        url:"GetClassInfo?s="+new Date().getTime(), //后面加时间戳，防止IE辨认相同的url，只从缓存拿数据
	        type:"post",
	        data: {username:username,act:"getCourse",classname:encodeURI(classname)}, //$('#yourformid').serialize()；向后台发送的form表单中的数据
	        dataType:"json", //接收返回的数据方式为json
	        aysnc : false,
	        error:function(XMLHttpRequest,textStatus,errorThrown){
	            alert("网络错误！");
	        }, //错误提示
	        
	        success:function(data){ //data为交互成功后，后台返回的数据;
//	        	alert(data.length);
	        	$("#edit_course").empty();
	        	for (var i = 0; i < data.length; i++) {
	        		var option = $("<option value='"+data[i].coursename+"'>"+ data[i].coursename +"</option>");
	        		$("#edit_course").append(option);
	        	}
	        	$("#edit_course").val(row.coursename);
	        }
	    });
	    
        var val1=row.roomname;
        var val4=row.section;
        if(val4 == "第一大节"){
        	val4 = 1;
        }else if(val4 == "第二大节"){
        	val4 = 2;
        }else if(val4 == "午间"){
        	val4 = 3;
        }else if(val4 == "第三大节"){
        	val4 = 4;
        }else if(val4 == "第四大节"){
        	val4 = 5;
        }else if(val4 == "晚间"){
        	val4 = 6;
        }
        $('#edit_roomname option:contains(' + val1 + ')').each(function() {
            if($(this).text() == val1) {
            	$(this).attr('selected', true);
            }
        });
        $("#edit_section").val(val4);
        $("#edit_classdate").val(row.classtime);
        
		$("#btn_ok").on("click",function(){
			var username = $("#edit_username").val();
			var roomid = $("#edit_roomname").val();
		    var classname = $("#edit_class").val();
		    var course = $("#edit_course").val();
		    var section = $("#edit_section").val();
		    var classdate = $("#edit_classdate").val();
//		    alert(classdate);
		    if (username==''){
		        $(".warning").text("警告：用户名不能为空！");
		        layer.msg('警告：用户名不能为空！', {icon: 2});
		        $("#edit_username").focus();
		    }else if (roomid==''){
		        layer.msg('警告：机房不能为空！', {icon: 2});
		        $("#edit_roomname").focus();
		    }else if (classname==''){
		    	layer.msg('警告：班级不能为空！', {icon: 2});
		        $("#edit_class").focus();
		    }else if (course==''){
		    	layer.msg('警告：课程不能为空！', {icon: 2});
		        $("#edit_course").focus();
		    }else if (section==''){
		    	layer.msg('警告：节次不能为空！', {icon: 2});
		        $("#edit_section").focus();
		    }else if (classdate==''){
		    	layer.msg('警告：上课时间不能为空！', {icon: 2});
		        $("#edit_classdate").focus();
		    }else{
		    	$.ajax({ //使用ajax与服务器异步交互
//		    		async:false,
		            url:"Managerbooking?s="+new Date().getTime(), //后面加时间戳，防止IE辨认相同的url，只从缓存拿数据
		            type:"POST",
		            data: {act:"updateBooking",username:username,roomid:roomid,classname:classname,coursename:course,id:id,section:section,classdate:classdate}, //$('#yourformid').serialize()；向后台发送的form表单中的数据
		            dataType:"json", //接收返回的数据方式为json
		            error:function(XMLHttpRequest,textStatus,errorThrown){
		                alert("网络错误，操作失败！");
		            }, //错误提示
		            success:function(data){ //data为交互成功后，后台返回的数据
		            	var state = data.state;
		            	if(state=='success'){
	    	        		$('#dlg').dialog('close');
			            	$('#dg').datagrid('reload');
			            	layer.alert("预定成功!");
	                	}else{
	                		layer.alert("预定失败，机房已被预定！");
	                	}
		            	
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
		        url:"Managerbooking?s="+new Date().getTime(), //后面加时间戳，防止IE辨认相同的url，只从缓存拿数据
		        type:"POST",
		        data: {act:"deleteBooking",id:id}, //$('#yourformid').serialize()；向后台发送的form表单中的数据
//		        dataType:"json", //接收返回的数据方式为json
		        error:function(XMLHttpRequest,textStatus,errorThrown){
		            alert("网络错误！");
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

function getClass(){
	var username = $("#edit_username").val();
    $.ajax({ //使用ajax与服务器异步交互
        url:"GetClassInfo?s="+new Date().getTime(), //后面加时间戳，防止IE辨认相同的url，只从缓存拿数据
        type:"post",
        data: {username:username,act:"getClass"}, //$('#yourformid').serialize()；向后台发送的form表单中的数据
        dataType:"json", //接收返回的数据方式为json
        async : false,
        error:function(XMLHttpRequest,textStatus,errorThrown){
            alert("网络错误！");
        }, //错误提示
        
        success:function(data){ //data为交互成功后，后台返回的数据;
        	$("#edit_class").empty();
        	for (var i = 0; i < data.length; i++) {
//        		alert(data[i].classname);
        		var option = $("<option value='"+data[i].classname+"'>"+ data[i].classname +"</option>");
        		$("#edit_class").append(option);
        	}
        	
        }
    });
}

function getCourse(){
	var classname = $("#edit_class").val();
	var username = $("#edit_username").val();
    $.ajax({ //使用ajax与服务器异步交互
        url:"GetClassInfo?s="+new Date().getTime(), //后面加时间戳，防止IE辨认相同的url，只从缓存拿数据
        type:"post",
        data: {username:username,act:"getCourse",classname:encodeURI(classname)}, //$('#yourformid').serialize()；向后台发送的form表单中的数据
        dataType:"json", //接收返回的数据方式为json
        aysnc : false,
        error:function(XMLHttpRequest,textStatus,errorThrown){
            alert("网络错误！");
        }, //错误提示
        
        success:function(data){ //data为交互成功后，后台返回的数据;
//        	alert(data.length);
        	$("#edit_course").empty();
        	for (var i = 0; i < data.length; i++) {
        		var option = $("<option value='"+data[i].coursename+"'>"+ data[i].coursename +"</option>");
        		$("#edit_course").append(option);
        	}
        	alert("成功调用获取课程！");
        	return false;
        }
        
    });
    
}


function getRoom() {
	$.ajax({ //使用ajax与服务器异步交互
        url:"Managerbooking?s="+new Date().getTime(), //后面加时间戳，防止IE辨认相同的url，只从缓存拿数据
        type:"POST",
        data: {act:"getRoom"}, //$('#yourformid').serialize()；向后台发送的form表单中的数据
        aysnc : false,
        dataType:"json", //接收返回的数据方式为json

        error:function(XMLHttpRequest,textStatus,errorThrown){
            alert("网络错误！");
        }, //错误提示

        success:function(data){ //data为交互成功后，后台返回的数据
        	var select = $("#edit_roomname");
        	select.empty();
        	for (var i = 0; i < data.length; i++) {
				var option = $("<option value='"+data[i].id+"'>"+data[i].roomname+"</option>")
				select.append(option);
			}
        }
    });
}

