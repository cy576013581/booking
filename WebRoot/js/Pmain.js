/**
 * Created by cy on 2016/8/13.
 */
$(document).ready(function () {
    bodyleft();


    $("#schoolstart").on("click", function () {
        $("#iframe").attr("src", "Pset_schoolstart.html");
    });
    $("#systemstart").on("click", function () {
        $("#iframe").attr("src", "Pset_systemstart.html");
    });


    $("#listuser").on("click", function () {
        $("#iframe").attr("src", "Plist_user.html");
    });
    $("#adduser").on("click", function () {
        $("#iframe").attr("src", "Padd_user.html");
    });


    $("#listroom").on("click", function () {
        $("#iframe").attr("src", "Plist_room.html");
    });
    $("#addroom").on("click", function () {
        $("#iframe").attr("src", "Padd_room.html");
    });

    $("#listbooking").on("click", function () {
        $("#iframe").attr("src", "Plist_booking.html");
    });
    $("#addbooking").on("click", function () {
        $("#iframe").attr("src", "Padd_booking.html");
    });

    $("#listnotice").on("click", function () {
        $("#iframe").attr("src", "Plist_notice.html");
    });
    $("#addnotice").on("click", function () {
        $("#iframe").attr("src", "Padd_notice.html");
    });


    $("#teacherSch").on("click", function () {
        $("#iframe").attr("src", "Pexport_teacher.html");
    });
    $("#roomSch").on("click", function () {
        $("#iframe").attr("src", "Pexport_room.html");
    });
    $("#positionSch").on("click", function () {
        $("#iframe").attr("src", "Pexport_sum.html");
    });
});

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