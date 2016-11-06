/**
 * Created by cy on 2016/7/4.
 */
$(document).ready(function(){
//	var len = sessionStorage.length;
//	alert(len);
	
	$(".footer_selectRoom").on("click",function(){
		$(".iframe_body").attr("src","/booking/main1.html");
	});
	$(".footer_selectClass").on("click",function(){
		$(".iframe_body").attr("src","/booking/main2.html");
	});
	$(".footer_selectAccount").on("click",function(){
		$(".iframe_body").attr("src","/booking/main3.html");
	});
	$(".footer_managebooking").on("click",function(){
		$(".iframe_body").attr("src","/booking/main4.html");
	});
		
		/*var url= $(".iframe_body").attr("src");
		alert(url);*/
		
//		$(".iframe_body").attr("src","/booking/main2.html");

});



