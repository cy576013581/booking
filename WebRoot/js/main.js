/**
 * Created by cy on 2016/7/4.
 */
$(document).ready(function(){
//	var len = sessionStorage.length;
//	alert(len);
	if(sessionStorage.getItem("username") == null){
		window.location.href="index.html";
	}
	$(".footer_selectRoom").on("click",function(){
		$(".iframe_body").attr("src","/booking/main1.html");
		removeClass();
		$(".footer_selectRoom").addClass("clicking");
	});
	$(".footer_selectClass").on("click",function(){
		$(".iframe_body").attr("src","/booking/main2.html");
		removeClass();
		$(".footer_selectClass").addClass("clicking");
	});
	$(".footer_selectAccount").on("click",function(){
		$(".iframe_body").attr("src","/booking/main3.html");
		removeClass();
		$(".footer_selectAccount").addClass("clicking");
	});
	$(".footer_managebooking").on("click",function(){
		$(".iframe_body").attr("src","/booking/main4.html");
		removeClass();
		$(".footer_managebooking").addClass("clicking");
	});
	$(".footer_selectRoom").click();	
		/*var url= $(".iframe_body").attr("src");
		alert(url);*/
		
//		$(".iframe_body").attr("src","/booking/main2.html");

});

function removeClass() {
	$(".footer_selectRoom").removeClass("clicking");
	$(".footer_selectClass").removeClass("clicking");
	$(".footer_selectAccount").removeClass("clicking");
	$(".footer_managebooking").removeClass("clicking");
}

