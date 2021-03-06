/**
 * Created by cy on 2016/8/13.
 */
$(document).ready(function () {
	if(sessionStorage.getItem("username") == null){
		window.location.href="Pindex.html";
	}
	$(".username").text(sessionStorage.getItem("username"));
    bodyleft();
    getYearname();
    $(".exit").on("click", function () {
    	swal({
    	    title: "您确定要退出系统吗?",
    	    text: "您将退出实验室预定管理系统",
    	    type: "warning",
    	    showCancelButton: true,
    	    confirmButtonColor: "#DD6B55",
    	    confirmButtonText: "确定",
    	    cancelButtonText: "返回",
    	    closeOnConfirm: false,
    	}, function () {
    	    swal.close();
    	    sessionStorage.removeItem("username");
    	    window.location.href="Pindex.html";
    	});
    	
    });
    $(".header_left").on("click", function () {
    	removeClass();
        $("#iframe").attr("src", "Pview.html");
    });

    $("#schoolstart").on("click", function () {
        $("#iframe").attr("src", "Pset_schoolstart.html");
        removeClass();
        $("#schoolstart").addClass("clicking");
    });
    $("#systemstart").on("click", function () {
        $("#iframe").attr("src", "Pset_systemstart.html");
        removeClass();
        $("#systemstart").addClass("clicking");
    });


    $("#listuser").on("click", function () {
        $("#iframe").attr("src", "Plist_user.html");
        removeClass();
        $("#listuser").addClass("clicking");
    });
    $("#adduser").on("click", function () {
        $("#iframe").attr("src", "Padd_user.html");
        removeClass();
        $("#adduser").addClass("clicking");
    });


    $("#listbranch").on("click", function () {
        $("#iframe").attr("src", "Plist_branch.html");
        removeClass();
        $("#listbranch").addClass("clicking");
    });
    $("#listroom").on("click", function () {
        $("#iframe").attr("src", "Plist_room.html");
        removeClass();
        $("#listroom").addClass("clicking");
    });
    $("#addroom").on("click", function () {
        $("#iframe").attr("src", "Padd_room.html");
        removeClass();
        $("#addroom").addClass("clicking");
    });

    $("#listbooking").on("click", function () {
        $("#iframe").attr("src", "Plist_booking.html");
        removeClass();
        $("#listbooking").addClass("clicking");
    });
    $("#addbooking").on("click", function () {
        $("#iframe").attr("src", "Padd_booking.html");
        removeClass();
        $("#addbooking").addClass("clicking");
    });

    $("#listnotice").on("click", function () {
        $("#iframe").attr("src", "Plist_notice.html");
        removeClass();
        $("#listnotice").addClass("clicking");
    });
    $("#addnotice").on("click", function () {
        $("#iframe").attr("src", "Padd_notice.html");
        removeClass();
        $("#addnotice").addClass("clicking");
    });


    $("#teacherSch").on("click", function () {
        $("#iframe").attr("src", "Pexport_teacher.html");
        removeClass();
        $("#teacherSch").addClass("clicking");
    });
    $("#roomSch").on("click", function () {
        $("#iframe").attr("src", "Pexport_room.html");
        removeClass();
        $("#roomSch").addClass("clicking");
    });
    $("#positionSch").on("click", function () {
        $("#iframe").attr("src", "Pexport_sum.html");
        removeClass();
        $("#positionSch").addClass("clicking");
    });
});

function getYearname(){
    $.ajax({ //使用ajax与服务器异步交互
    	async:false,
        url:"Managerview?s="+new Date().getTime(), //后面加时间戳，防止IE辨认相同的url，只从缓存拿数据
        type:"post",
        data: {act:"getYearname"}, //$('#yourformid').serialize()；向后台发送的form表单中的数据
        dataType:"json", //接收返回的数据方式为json
        error:function(XMLHttpRequest,textStatus,errorThrown){
            alert("网络错误！");
        }, //错误提示
        
        success:function(data){ //data为交互成功后，后台返回的数据;
        	$(".yearname").text(data.yearname);
        }
    });
}


function removeClass() {
	$("#schoolstart").removeClass("clicking");
	$("#systemstart").removeClass("clicking");
	$("#listuser").removeClass("clicking");
	$("#adduser").removeClass("clicking");
	$("#listroom").removeClass("clicking");
	$("#addroom").removeClass("clicking");
	$("#listbooking").removeClass("clicking");
	$("#addbooking").removeClass("clicking");
	$("#listnotice").removeClass("clicking");
	$("#addnotice").removeClass("clicking");
	$("#teacherSch").removeClass("clicking");
	$("#roomSch").removeClass("clicking");
	$("#positionSch").removeClass("clicking");
	$("#listbranch").removeClass("clicking");
}
function bodyleft(){
    var tabs_i = 0
    $('.vtitle').click(function () {
        var _self = $(this);
        var j = $('.vtitle').index(_self);
        if (tabs_i == j) return false;
        tabs_i = j;
        $('.vtitle em').each(function (e) {
            if (e == tabs_i) {
                $('em', _self).removeClass('v01').addClass('v02');
            } else {
                $(this).removeClass('v02').addClass('v01');
            }
        });
        $('.vcon').slideUp().eq(tabs_i).slideDown();
    });
}
