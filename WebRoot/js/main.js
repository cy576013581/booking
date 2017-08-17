/**
 * Created by cy on 2016/7/4.
 */
var LocString;
var action=0;
$(document).ready(function(){
	if(sessionStorage.getItem("username") == null){
		window.location.href="index.html";
//		window.history.forward(1);
	}
	
	LocString = window.location.href;
	action = decodeURI(GetQueryString("action"));
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
	if(action == 2){
		$(".footer_selectClass").click();
	}else if(action == 3){
		$(".footer_managebooking").click();
	}else if(action == 4){
		$(".footer_selectAccount").click();
	}else{
		$(".footer_selectRoom").click();
	}
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
function GetQueryString(str){
	 var rs=new RegExp("(^|)"+str+"=([^&]*)(&|$)","gi").exec(LocString),tmp;
	 if(tmp=rs)return tmp[2];
	 return "没有这个参数";
}


