/**
 * Created by cy on 2016/7/18.
 */
var username;
var editid;
var deleteid;
$(document).ready(function(){
	if(sessionStorage.getItem("username") == null){
		window.location.href="index.html";
	}
    username = sessionStorage.getItem("username");
    getClass();
    $("#addclass").on("click",function(){
    	$(".warning").text("");
    });
    $("#btn_ok").on("click",addClass);
});

function addClass(){
	var coursename = $("#coursename").val();
	var classname = $("#classname").val() ;
	var students = $("#students").val();
	if(coursename =="" || classname == "" || students == "" || coursename == undefined || classname == undefined || students == undefined){
		$(".warning").text("提示：所填内容不能为空！");
	}else{
		$.ajax({ //使用ajax与服务器异步交互
	        url:"InputClass?s="+new Date().getTime(), //后面加时间戳，防止IE辨认相同的url，只从缓存拿数据
	        type:"POST",
	        data: {username:username,act:"addClass",coursename:coursename,classname:classname,students:students}, //$('#yourformid').serialize()；向后台发送的form表单中的数据
	        dataType:"json", //接收返回的数据方式为json

	        error:function(XMLHttpRequest,textStatus,errorThrown){
	            alert("网络错误！");
	        }, //错误提示

	        success:function(data){ //data为交互成功后，后台返回的数据
                    var ul = $("#OA_task_2");
                    var li = $("<li class='mui-table-view-cell'></li>");
                    var edit = $("<div class='mui-slider-right mui-disabled'></div>");
                    var edit_edit = $("<a id='"+data.id+"' href='#popupEdit' data-rel='popup' onclick='getEdit(event)' class='mui-btn mui-btn-grey'>编辑</a>");
                    var edit_delete = $("<a class='mui-btn mui-btn-red'>删除</a>");
                    edit_delete.on("click",function(){
                    	swal({
                    		title: "你确定要删除吗?",
                     	    text: "将删除这个课程的信息",
                    	    type: "warning",
                    	    showCancelButton: true,
                    	    confirmButtonColor: "#DD6B55",
                    	    confirmButtonText: "删除",
                    	    cancelButtonText: "取消",
                    	    closeOnConfirm: false,
                    	}, function () {
                    		$.ajax({ //使用ajax与服务器异步交互
                    	        url:"InputClass?s="+new Date().getTime(), //后面加时间戳，防止IE辨认相同的url，只从缓存拿数据
                    	        type:"POST",
                    	        data: {id:data.id,act:"deleteClass"}, //$('#yourformid').serialize()；向后台发送的form表单中的数据
                    	        dataType:"json", //接收返回的数据方式为json

                    	        error:function(XMLHttpRequest,textStatus,errorThrown){
                    	            alert("网络错误！");
                    	        }, //错误提示

                    	        success:function(data){ //data为交互成功后，后台返回的数据
                    	        	swal("Deleted!", "您的班级已经成功删除！", "success");
                    	        	li.remove();  
                    	        }
                    	    });
                    		
                    	    
                    	});
                    	
                    });
                    edit.append(edit_edit);
                    edit.append(edit_delete);
                    li.append(edit);
                    var info = $("<div id='edit"+data.id+"' class='mui-slider-handle'><div class='mui-table-cell'></div></div>");
                    var p = $("<p class='p_coursename'>课程名称："+coursename+"</p>");
                    var span1 = $("<span class='listspan1'>班级名称："+classname+"</span>");
                    var span2 = $("<span class='listspan2'>&nbsp;&nbsp;学生人数："+students+"人</span>");
                    info.append(p);
                    info.append(span1);
                    info.append(span2);
                    li.append(info);
                    ul.append(li);
		            $("#popupBasic").popup("close");
		            $("#coursename").val("");
		        	$("#classname").val("");
		        	$("#students").val("");
	        }
	    });
	}
}


function getClass(){
	
    $.ajax({ //使用ajax与服务器异步交互
        url:"InputClass?s="+new Date().getTime(), //后面加时间戳，防止IE辨认相同的url，只从缓存拿数据
        type:"POST",
        data: {username:username,act:"getClass"}, //$('#yourformid').serialize()；向后台发送的form表单中的数据
        dataType:"json", //接收返回的数据方式为json

        error:function(XMLHttpRequest,textStatus,errorThrown){
            alert("网络错误！");
        }, //错误提示

        success:function(data){ //data为交互成功后，后台返回的数据
//        	alert(data.length);
            for(var i  in  data)  {
            	(function (i) {
            		 var ul = $("#OA_task_2");
                     var li = $("<li class='mui-table-view-cell'></li>");
                     var edit = $("<div class='mui-slider-right mui-disabled'></div>");
                     var edit_edit = $("<a id='"+data[i].id+"' class='mui-btn mui-btn-grey' href='#popupEdit' data-rel='popup' onclick='getEdit(event)'>编辑</a>");
                     var edit_delete = $("<a class='mui-btn mui-btn-red'>删除</a>");
                     edit_delete.on("click",function(){
                    	 swal({
                     	    title: "你确定要删除吗?",
                     	    text: "将删除这个课程的信息",
                     	    type: "warning",
                     	    showCancelButton: true,
                     	    confirmButtonColor: "#DD6B55",
                     	    confirmButtonText: "删除",
                     	    cancelButtonText: "取消",
                     	    closeOnConfirm: false,
                     	}, function () {
                     		$.ajax({ //使用ajax与服务器异步交互
                     	        url:"InputClass?s="+new Date().getTime(), //后面加时间戳，防止IE辨认相同的url，只从缓存拿数据
                     	        type:"POST",
                     	        data: {id:data[i].id,act:"deleteClass"}, //$('#yourformid').serialize()；向后台发送的form表单中的数据
                     	        dataType:"json", //接收返回的数据方式为json

                     	        error:function(XMLHttpRequest,textStatus,errorThrown){
                     	            alert("网络错误！");
                     	        }, //错误提示

                     	        success:function(data){ //data为交互成功后，后台返回的数据
                     	        	swal("Deleted!", "您的班级已经成功删除！", "success");
                     	        	li.remove(); 
                     	        }
                     	    });
                     		
                     	    
                     	});
                     	
                     });
                     edit.append(edit_edit);
                     edit.append(edit_delete);
                     li.append(edit);
                     var info = $("<div id='info"+data[i].id+"' class='mui-slider-handle'><div class='mui-table-cell'></div></div>");
                     var p = $("<p class='p_coursename'>课程名称："+data[i].coursename+"</p>");
                     var span1 = $("<span class='listspan1'>班级名称："+data[i].classname+"</span>");
                     var span2 = $("<span class='listspan2'>&nbsp;&nbsp;学生人数："+data[i].students+"人</span>");
                     info.append(p);
                     info.append(span1);
                     info.append(span2);
                     li.append(info);
//                     alert(1);
                     ul.append(li);
            	})(i);
            	
            }

        }
    });
}

function mytaphold(event) {
	var deleteid = event.target.name;
	alert(deleteid);
	
}

function getEdit(event){
	var id = $(event.target).attr("id");
	editid = id;
//	alert(id);
    $.ajax({ //使用ajax与服务器异步交互
        url:"InputClass?s="+new Date().getTime(), //后面加时间戳，防止IE辨认相同的url，只从缓存拿数据
        type:"POST",
        data: {id:id,act:"getClassById"}, //$('#yourformid').serialize()；向后台发送的form表单中的数据
        dataType:"json", //接收返回的数据方式为json

        error:function(XMLHttpRequest,textStatus,errorThrown){
            alert("网络错误！");
        }, //错误提示

        success:function(data){ //data为交互成功后，后台返回的数据
//        	alert(data.coursename);
        	$(".warning").text("");
            $("#edit_coursename").val(data.coursename);
            $("#edit_classname").val(data.classname);
            $("#edit_students").val(data.students);
        }
    });
}

function editClass(){
	var edit_coursename = $("#edit_coursename").val();
	var edit_classname = $("#edit_classname").val() ;
	var edit_students = $("#edit_students").val();
	if(edit_coursename =="" || edit_classname == "" || edit_students == "" || edit_coursename == undefined || edit_classname == undefined || edit_students == undefined){
		$(".edit_warning").show();
	}else{
		$.ajax({ //使用ajax与服务器异步交互
	        url:"InputClass?s="+new Date().getTime(), //后面加时间戳，防止IE辨认相同的url，只从缓存拿数据
	        type:"POST",
	        data: {id:editid,act:"editClass",coursename:edit_coursename,classname:edit_classname,students:edit_students}, //$('#yourformid').serialize()；向后台发送的form表单中的数据
	        dataType:"json", //接收返回的数据方式为json

	        error:function(XMLHttpRequest,textStatus,errorThrown){
	            alert("网络错误！");
	        }, //错误提示

	        success:function(data){ //data为交互成功后，后台返回的数据
	        	$("#popupEdit").popup("close");
	        	$("#info"+editid+" .p_coursename").text("课程名称："+edit_coursename);
	        	$("#info"+editid+" .listspan1").text("班级名称："+edit_classname);
	        	$("#info"+editid+" .listspan2").text("   学生人数："+edit_students+"人");
	        }
	    });
	}
}