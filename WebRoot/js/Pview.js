/**
 * Created by cy on 2016/8/15.
 */
var dateArray = [];
var loginArray = [];
var bookingArray = [];
$(function () {
	getCount();
	getDate();
	getBooking();
	getLogin();
	$('#container').highcharts({
        chart: {
            type: 'line'
        },
        title: {
            text: '近7日实验室预定和用户登录情况'
        },
        xAxis: {
            categories: [dateArray[0],dateArray[1],dateArray[2],dateArray[3],dateArray[4],dateArray[5],dateArray[6]]
        },
        yAxis: {
            title: {
                text: '数量（条）'
            }
        },
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                },
                enableMouseTracking: false
            }
        },
        credits:{
        	enabled:false // 禁用版权信息
        },
        series: [{
            name: '实验室预定',
            data: [bookingArray[0], bookingArray[1], bookingArray[2], bookingArray[3], bookingArray[4], bookingArray[5], bookingArray[6]]
//            data: [1,8,2,8,1,5,9]
        }, {
            name: '用户登录',
            data: [loginArray[0], loginArray[1], loginArray[2], loginArray[3], loginArray[4], loginArray[5], loginArray[6]]
//            data: [10,8,2,5,1,8,12]
        }]
    });
});

function getBooking(){
    $.ajax({ //使用ajax与服务器异步交互
    	async:false,
        url:"Managerview?s="+new Date().getTime(), //后面加时间戳，防止IE辨认相同的url，只从缓存拿数据
        type:"post",
        data: {act:"getBooking"}, //$('#yourformid').serialize()；向后台发送的form表单中的数据
        dataType:"json", //接收返回的数据方式为json
        error:function(XMLHttpRequest,textStatus,errorThrown){
            alert("网络错误！");
        }, //错误提示
        
        success:function(data){ //data为交互成功后，后台返回的数据;
        	bookingArray.push(data.day1);
        	bookingArray.push(data.day2);
        	bookingArray.push(data.day3);
        	bookingArray.push(data.day4);
        	bookingArray.push(data.day5);
        	bookingArray.push(data.day6);
        	bookingArray.push(data.day7);
        }
    });
}

function getLogin(){
    $.ajax({ //使用ajax与服务器异步交互
    	async:false,
        url:"Managerview?s="+new Date().getTime(), //后面加时间戳，防止IE辨认相同的url，只从缓存拿数据
        type:"post",
        data: {act:"getLogin"}, //$('#yourformid').serialize()；向后台发送的form表单中的数据
        dataType:"json", //接收返回的数据方式为json
        error:function(XMLHttpRequest,textStatus,errorThrown){
            alert("网络错误！");
        }, //错误提示
        
        success:function(data){ //data为交互成功后，后台返回的数据;
        	loginArray.push(data.day1);
        	loginArray.push(data.day2);
        	loginArray.push(data.day3);
        	loginArray.push(data.day4);
        	loginArray.push(data.day5);
        	loginArray.push(data.day6);
        	loginArray.push(data.day7);
        }
    });
}

function getDate() {
	//设置日期，当前日期的前七天
	var myDate = new Date(); //获取今天日期
	myDate.setDate(myDate.getDate() - 7);
	
	var dateTemp; 
	var flag = 1; 
	for (var i = 0; i < 7; i++) {
	    dateTemp = (myDate.getMonth()+1)+"-"+myDate.getDate();
	    dateArray.push(dateTemp);
	    myDate.setDate(myDate.getDate() + flag);
	}
	 
}

function getCount(){
    $.ajax({ //使用ajax与服务器异步交互
        url:"Managerview?s="+new Date().getTime(), //后面加时间戳，防止IE辨认相同的url，只从缓存拿数据
        type:"post",
        data: {act:"getCount"}, //$('#yourformid').serialize()；向后台发送的form表单中的数据
        dataType:"json", //接收返回的数据方式为json
        error:function(XMLHttpRequest,textStatus,errorThrown){
            alert("网络错误！");
        }, //错误提示
        
        success:function(data){ //data为交互成功后，后台返回的数据;
        	$("#sum_logins").text(data.countlogin);
        	$("#sum_bookings").text(data.countbooking);
        	$("#sum_rooms").text(data.countroom);
        	$("#sum_users").text(data.countuser);
        }
    });
}
