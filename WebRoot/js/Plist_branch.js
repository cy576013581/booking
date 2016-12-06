/**
 * Created by cy on 2016/8/14.
 */
var count;
$(document).ready(function(){
	if(sessionStorage.getItem("username") == null){
		window.location.href="Pindex.html";
	}
	getBranch();
	editdialog();

	$("#btn_addBranch").on("click",addBranch);

});

function addBranch() {
	$("body").append("<div id='mask'></div>");
    $("#mask").addClass("mask").fadeIn("slow");
    $("#AddBox").fadeIn("slow");
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

function  getBranch() {
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
	$("#closeBtn1").hover(function () { $(this).css({ color: 'black' }) }, function () { $(this).css({ color: '#999' }) }).on('click', function () {
        $("#AddBox").fadeOut("fast");
        $("#mask").css({ display: 'none' });
        $("td[name]").removeAttr("name"); 
    });
}


