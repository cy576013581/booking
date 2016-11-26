/**
 * Created by cy on 2016/8/13.
 */
$(document).ready(function () {
	if(sessionStorage.getItem("username") == null){
		window.location.href="Pindex.html";
	}
    bodyleft();


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
