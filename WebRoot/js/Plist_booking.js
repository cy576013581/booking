/**
 * Created by cy on 2016/8/14.
 */
var count;
var searchcount;
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

    $(".btn_search").on("click",function(){
        if($(".searchbybookingdate").val() =='' && $(".searchbyteacher").val() ==''){
            alert("请至少输入一个查询条件！");
        }else{
        	getCountbydate();
        	
        	$("#News-Pagination").pagination(searchcount, {
                items_per_page:6,//每页显示多少条数据
                current_page:0,//当前显示第几页数据
                num_display_entries:6,//分页显示的条目数
                next_text:"下一页",
                prev_text:"上一页",
                num_edge_entries:2,//链接分页主体，显示的条目数
                callback:handlePaginationClick
            });
        }
    });
});
function  getCountbydate() {
	var date = $(".searchbybookingdate").val();
	var username = $(".searchbyteacher").val();
	$.ajax({ //使用ajax与服务器异步交互
		async:false,
        url:"Managerbooking?s="+new Date().getTime(), //后面加时间戳，防止IE辨认相同的url，只从缓存拿数据
        type:"POST",
        data: {act:"getSearchcount",date:date,username:username}, //$('#yourformid').serialize()；向后台发送的form表单中的数据
        dataType:"json", //接收返回的数据方式为json

        error:function(XMLHttpRequest,textStatus,errorThrown){
            alert("网络错误！");
        }, //错误提示

        success:function(data){ //data为交互成功后，后台返回的数据
        	searchcount = data.sum;
        }
    });
	return false;
}

function handlePaginationClick(new_page_index, pagination_container) {
    // This selects 20 elements from a content array
	
	$.ajax({ //使用ajax与服务器异步交互
        url:"Managerbooking?s="+new Date().getTime(), //后面加时间戳，防止IE辨认相同的url，只从缓存拿数据
        type:"POST",
        data: {act:"getAllbooking",page:new_page_index}, //$('#yourformid').serialize()；向后台发送的form表单中的数据
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
					var td1 = $("<td class='bookingtime"+i+"'>"+data[i].bookingtime+"</td>");
					var td2 = $("<td class='classtime"+i+"'>"+data[i].classtime+"</td>");
					var section = data[i].section;
					var strsection;
					if(section==1){
						strsection="第一大节";
					}else if(section==2){
						strsection="第二大节";
					}else if(section==3){
						strsection="午间";
					}else if(section==4){
						strsection="第三大节";
					}else if(section==5){
						strsection="第四大节";
					}else if(section==6){
						strsection="晚间";
					}
					var td3 = $("<td class='section"+i+"'>"+strsection+"</td>");
					var td4 = $("<td class='roomname"+i+"'>"+data[i].roomname+"</td>");
					var td5 = $("<td class='username"+i+"'>"+data[i].username+"</td>");
					var td6 = $("<td class='coursename"+i+"'>"+data[i].coursename+"</td>");
					var td7 = $("<td class='classname"+i+"'>"+data[i].classname+"</td>");
					var td8 = $("<td class='students"+i+"'>"+data[i].students+"</td>");
					var td9 = $("<td class='phone"+i+"'>"+data[i].phone+"</td>");
					var td10 = $("<td></td>");
					var btn_edit = $("<button class='btn_edit'>编辑</button>");
					var btn_del = $("<button class='btn_del'>删除</button>");
					$(btn_edit).on("click",function(){
						var id = data[i].id;
						alert(id);
						$("body").append("<div id='mask'></div>");
				        $("#mask").addClass("mask").fadeIn("slow");
				        $("#SelectBox").fadeIn("slow");
				        
				        
				        
						$("#edit_username").val($(".username"+i).text());
						
						getRoom();
				        getClass();
				        
				        
				        /*
				         * 还是无法设置为text的option是selected
				         */
				        
				        var val1=$(".roomname"+i).text();
				        var val2=$(".classname"+i).text();
				        var val3=$(".coursename"+i).text();
				        var val4=$(".section"+i).text();
				        $('#edit_roomname option:contains(' + val1 + ')').each(function() {
				            if($(this).text() == val1) {
				            	alert($(this).text());
				            	$(this).attr('selected', true);
				            }
				        });
				        $("#edit_class option").each(function() {
				            if($(this).text() == val2) {
				            	alert($(this).text());
				            	$(this).attr('selected', true);
				            }
				        });
				        $("#edit_class option").each(function() {
				            if($(this).text() == val4) {
				            	alert($(this).text());
				            	$(this).attr('selected', true);
				            }
				        });
				        
				        $("#edit_roomname").children("option[text='"+val1+"']").attr("selected",true);
				        $("#edit_class").children("option[text='"+val2+"']").attr("selected",true);
				        getCourse();
				        $("#edit_course").find("option[text='"+val3+"']").attr("selected",true);
				        
				        $("#edit_section").find("option[text='"+val4+"']").attr("selected",true);
				        $("#edit_classdate").val($(".classtime"+i).text());
				        
						/*$("#edit_roomname").val($(".roomname"+i).text());//.children('option:selected')
						$("#edit_class").val($(".classname"+i).text());
						$("#edit_course").val($(".coursename"+i).text());
						$("#edit_section").val($(".section"+i).text());
						$("#edit_classdate").val($(".classtime"+i).text());*/
						
						
						
						$("#btn_ok").on("click",function(){
							var username = $("#edit_username").val();
							var roomid = $("#edit_roomname").val();
						    var classname = $("#edit_class").val();
						    var course = $("#edit_course").val();
						    var section = $("#edit_section").val();
						    var classdate = $("#edit_classdate").val();
//						    alert(classdate);
						    if (username==''){
						        $(".warning").text("警告：用户名不能为空！");
						        $("#edit_username").focus();
						    }else if (roomid==''){
						        $(".warning").text("警告：机房不能为空！");
						        $("#edit_roomname").focus();
						    }else if (classname==''){
						    	$(".warning").text("警告：班级不能为空！");
						        $("#edit_class").focus();
						    }else if (course==''){
						    	$(".warning").text("警告：课程不能为空！");
						        $("#edit_course").focus();
						    }else if (section==''){
						    	$(".warning").text("警告：节次不能为空！");
						        $("#edit_section").focus();
						    }else if (classdate==''){
						    	$(".warning").text("警告：上课时间不能为空！");
						        $("#edit_classdate").focus();
						    }else{
						    	$.ajax({ //使用ajax与服务器异步交互
//						    		async:false,
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
					    	        		alert("预定成功！");
					    	        		$("#SelectBox").fadeOut("fast");
						                    $("#mask").css({ display: 'none' });
						                    $(".classtime"+i).text(classdate);
						                    $(".section"+i).text($("#edit_section option:selected").text());
						                    $(".roomname"+i).text($("#edit_roomname option:selected").text());
						                    $(".username"+i).text(username);
						                    $(".coursename"+i).text(course);
						                    $(".classname"+i).text(classname);
						                    $(".students"+i).text(data.students);
						                    $(".phone"+i).text(data.phone);
//					                		swal("预定成功!", "您的速度可真快！", "error");
					                	}else{
					                		alert("预定失败，机房已被预定！");
//					                		swal("您晚了一步!", "这个机房已被占用！", "error");
					                	}
						            	
						            }
						        });
						    	return false;
						    }
						});
					});
					$(btn_del).on("click",function(){
						var id = data[i].id;
						$.ajax({ //使用ajax与服务器异步交互
					        url:"Managerbooking?s="+new Date().getTime(), //后面加时间戳，防止IE辨认相同的url，只从缓存拿数据
					        type:"POST",
					        data: {act:"deleteBooking",id:id}, //$('#yourformid').serialize()；向后台发送的form表单中的数据
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
					td10.append(btn_edit);
					td10.append(btn_del);
					tr.append(td1);
					tr.append(td2);
					tr.append(td3);
					tr.append(td4);
					tr.append(td5);
					tr.append(td6);
					tr.append(td7);
					tr.append(td8);
					tr.append(td9);
					tr.append(td10);
					$("table").append(tr);
				})(i);
			}
        }
    });
    return false;
}



function  getCount() {
	$.ajax({ //使用ajax与服务器异步交互
		async:false,
        url:"Managerbooking?s="+new Date().getTime(), //后面加时间戳，防止IE辨认相同的url，只从缓存拿数据
        type:"POST",
        data: {act:"getSum"}, //$('#yourformid').serialize()；向后台发送的form表单中的数据
        dataType:"json", //接收返回的数据方式为json

        error:function(XMLHttpRequest,textStatus,errorThrown){
            alert("网络错误！");
        }, //错误提示

        success:function(data){ //data为交互成功后，后台返回的数据
        	count = data.sum;
        }
    });
	return false;
}

function handlePaginationClick(new_page_index, pagination_container) {
    // This selects 20 elements from a content array
	var date = $(".searchbybookingdate").val();
	var username = $(".searchbyteacher").val();
	$.ajax({ //使用ajax与服务器异步交互
        url:"Managerbooking?s="+new Date().getTime(), //后面加时间戳，防止IE辨认相同的url，只从缓存拿数据
        type:"POST",
        data: {act:"getAllbyrearch",page:new_page_index,date:date,username:username}, //$('#yourformid').serialize()；向后台发送的form表单中的数据
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
					var td1 = $("<td class='bookingtime"+i+"'>"+data[i].bookingtime+"</td>");
					var td2 = $("<td class='classtime"+i+"'>"+data[i].classtime+"</td>");
					var section = data[i].section;
					var strsection;
					if(section==1){
						strsection="第一大节";
					}else if(section==2){
						strsection="第二大节";
					}else if(section==3){
						strsection="午间";
					}else if(section==4){
						strsection="第三大节";
					}else if(section==5){
						strsection="第四大节";
					}else if(section==6){
						strsection="晚间";
					}
					var td3 = $("<td class='section"+i+"'>"+strsection+"</td>");
					var td4 = $("<td class='roomname"+i+"'>"+data[i].roomname+"</td>");
					var td5 = $("<td class='username"+i+"'>"+data[i].username+"</td>");
					var td6 = $("<td class='coursename"+i+"'>"+data[i].coursename+"</td>");
					var td7 = $("<td class='classname"+i+"'>"+data[i].classname+"</td>");
					var td8 = $("<td class='students"+i+"'>"+data[i].students+"</td>");
					var td9 = $("<td class='phone"+i+"'>"+data[i].phone+"</td>");
					var td10 = $("<td></td>");
					var btn_edit = $("<button class='btn_edit'>编辑</button>");
					var btn_del = $("<button class='btn_del'>删除</button>");
					$(btn_edit).on("click",function(){
						var id = data[i].id;
						alert(id);
						$("body").append("<div id='mask'></div>");
				        $("#mask").addClass("mask").fadeIn("slow");
				        $("#SelectBox").fadeIn("slow");
				        
				        
				        
						$("#edit_username").val($(".username"+i).text());
						
						getRoom();
				        getClass();
				        
				        
				        /*
				         * 还是无法设置为text的option是selected
				         */
				        
				        var val1=$(".roomname"+i).text();
				        var val2=$(".classname"+i).text();
				        var val3=$(".coursename"+i).text();
				        var val4=$(".section"+i).text();
				        $('#edit_roomname option:contains(' + val1 + ')').each(function() {
				            if($(this).text() == val1) {
				            	alert($(this).text());
				            	$(this).attr('selected', true);
				            }
				        });
				        $("#edit_class option").each(function() {
				            if($(this).text() == val2) {
				            	alert($(this).text());
				            	$(this).attr('selected', true);
				            }
				        });
				        $("#edit_class option").each(function() {
				            if($(this).text() == val4) {
				            	alert($(this).text());
				            	$(this).attr('selected', true);
				            }
				        });
				        
				        $("#edit_roomname").children("option[text='"+val1+"']").attr("selected",true);
				        $("#edit_class").children("option[text='"+val2+"']").attr("selected",true);
				        getCourse();
				        $("#edit_course").find("option[text='"+val3+"']").attr("selected",true);
				        
				        $("#edit_section").find("option[text='"+val4+"']").attr("selected",true);
				        $("#edit_classdate").val($(".classtime"+i).text());
				        
						/*$("#edit_roomname").val($(".roomname"+i).text());//.children('option:selected')
						$("#edit_class").val($(".classname"+i).text());
						$("#edit_course").val($(".coursename"+i).text());
						$("#edit_section").val($(".section"+i).text());
						$("#edit_classdate").val($(".classtime"+i).text());*/
						
						
						
						$("#btn_ok").on("click",function(){
							var username = $("#edit_username").val();
							var roomid = $("#edit_roomname").val();
						    var classname = $("#edit_class").val();
						    var course = $("#edit_course").val();
						    var section = $("#edit_section").val();
						    var classdate = $("#edit_classdate").val();
//						    alert(classdate);
						    if (username==''){
						        $(".warning").text("警告：用户名不能为空！");
						        $("#edit_username").focus();
						    }else if (roomid==''){
						        $(".warning").text("警告：机房不能为空！");
						        $("#edit_roomname").focus();
						    }else if (classname==''){
						    	$(".warning").text("警告：班级不能为空！");
						        $("#edit_class").focus();
						    }else if (course==''){
						    	$(".warning").text("警告：课程不能为空！");
						        $("#edit_course").focus();
						    }else if (section==''){
						    	$(".warning").text("警告：节次不能为空！");
						        $("#edit_section").focus();
						    }else if (classdate==''){
						    	$(".warning").text("警告：上课时间不能为空！");
						        $("#edit_classdate").focus();
						    }else{
						    	$.ajax({ //使用ajax与服务器异步交互
//						    		async:false,
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
					    	        		alert("预定成功！");
					    	        		$("#SelectBox").fadeOut("fast");
						                    $("#mask").css({ display: 'none' });
						                    $(".classtime"+i).text(classdate);
						                    $(".section"+i).text($("#edit_section option:selected").text());
						                    $(".roomname"+i).text($("#edit_roomname option:selected").text());
						                    $(".username"+i).text(username);
						                    $(".coursename"+i).text(course);
						                    $(".classname"+i).text(classname);
						                    $(".students"+i).text(data.students);
						                    $(".phone"+i).text(data.phone);
//					                		swal("预定成功!", "您的速度可真快！", "error");
					                	}else{
					                		alert("预定失败，机房已被预定！");
//					                		swal("您晚了一步!", "这个机房已被占用！", "error");
					                	}
						            	
						            }
						        });
						    	return false;
						    }
						});
					});
					$(btn_del).on("click",function(){
						var id = data[i].id;
						$.ajax({ //使用ajax与服务器异步交互
					        url:"Managerbooking?s="+new Date().getTime(), //后面加时间戳，防止IE辨认相同的url，只从缓存拿数据
					        type:"POST",
					        data: {act:"deleteBooking",id:id}, //$('#yourformid').serialize()；向后台发送的form表单中的数据
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
					td10.append(btn_edit);
					td10.append(btn_del);
					tr.append(td1);
					tr.append(td2);
					tr.append(td3);
					tr.append(td4);
					tr.append(td5);
					tr.append(td6);
					tr.append(td7);
					tr.append(td8);
					tr.append(td9);
					tr.append(td10);
					$("table").append(tr);
				})(i);
			}
        }
    });
    return false;
}


function getClass(){
//	alert(weeks+":"+roomid);
	var username = $("#edit_username").val();
//	alert(username);
    $.ajax({ //使用ajax与服务器异步交互
        url:"GetClassInfo?s="+new Date().getTime(), //后面加时间戳，防止IE辨认相同的url，只从缓存拿数据
        type:"post",
        data: {username:username,act:"getClass"}, //$('#yourformid').serialize()；向后台发送的form表单中的数据
        dataType:"json", //接收返回的数据方式为json
        error:function(XMLHttpRequest,textStatus,errorThrown){
            alert("网络错误！");
        }, //错误提示
        
        success:function(data){ //data为交互成功后，后台返回的数据;
        	$("#edit_class").empty();
        	for (var i = 0; i < data.length; i++) {
//        		alert(data[i].classname);
        		var option = $("<option>"+ data[i].classname +"</option>");
        		$("#edit_class").append(option);
        	}
        	getCourse();
        	
        }
    });
}

function getCourse(){
//	alert(weeks+":"+roomid);
	var classname = $("#edit_class").children('option:selected').val();
	var username = $("#edit_username").val();
//	alert(classname);
    $.ajax({ //使用ajax与服务器异步交互
        url:"GetClassInfo?s="+new Date().getTime(), //后面加时间戳，防止IE辨认相同的url，只从缓存拿数据
        type:"post",
        data: {username:username,act:"getCourse",classname:encodeURI(classname)}, //$('#yourformid').serialize()；向后台发送的form表单中的数据
        dataType:"json", //接收返回的数据方式为json
        error:function(XMLHttpRequest,textStatus,errorThrown){
            alert("网络错误！");
        }, //错误提示
        
        success:function(data){ //data为交互成功后，后台返回的数据;
//        	alert(data.length);
        	$("#edit_course").empty();
        	for (var i = 0; i < data.length; i++) {
        		var option = $("<option>"+ data[i].coursename +"</option>");
        		$("#edit_course").append(option);
        	}
        }
    });
}


function getRoom() {
	$.ajax({ //使用ajax与服务器异步交互
        url:"Managerbooking?s="+new Date().getTime(), //后面加时间戳，防止IE辨认相同的url，只从缓存拿数据
        type:"POST",
        data: {act:"getRoom"}, //$('#yourformid').serialize()；向后台发送的form表单中的数据
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
	$("#edit_class").on("change",function(){
		getCourse();
	});
	$("#edit_username").on("change",function(){
		getClass();

	});
}


