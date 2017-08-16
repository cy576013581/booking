$(function () {
	if(sessionStorage.getItem("username") == null){
		window.location.href="index.html";
	}
	$(".icon_back").on("click",function(){
    	window.location.href="main.html?action=3";
    });
    $('#container').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: '我在各实验室预约总数'
        },
        subtitle: {
            text: '数据截止：'+new Date().Format("yyyy-MM-dd")+'(数据刷新可能会有所延迟  )'
        },
        xAxis: {
            type: 'category',
            labels: {
                rotation: -45,
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        },
        yAxis: {
            min: 0,
            title: {
            	text: '预约次数'
            }
        },
        legend: {
            enabled: false
        },
        credits:{
        	enabled:false // 禁用版权信息
        },
        exporting:{
        	enabled:false // 禁用版权信息
        },
        series: [{
            name: '实验室预约总数',
            data: [
                ['移动开发实验室', 12],
                ['计算机基础实验室', 9],
                ['计算机组成原理实验室', 21],
                ['软件工程实验室', 6],
                ['计算机专业实验室', 13],
                ['网络工程实验室', 15],
                ['数字媒体实验室', 10],
                ['北区公共一机房', 5],
                ['多媒体实验室', 6]
            ],
            dataLabels: {
                enabled: true,
                rotation: -90,
                color: '#FFFFFF',
                align: 'right',
                y: 10, // 10 pixels down from the top
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        }]
    });
});
Date.prototype.Format = function(fmt)     
{ //author: meizz  
  var o = {     
    "M+" : this.getMonth()+1,                 //月份  
	"d+" : this.getDate(),                    //日  
    "h+" : this.getHours(),                   //小时  
    "m+" : this.getMinutes(),                 //分  
    "s+" : this.getSeconds(),                 //秒  
    "q+" : Math.floor((this.getMonth()+3)/3), //季度  
    "S"  : this.getMilliseconds()             //毫秒  
  };     
  if(/(y+)/.test(fmt))     
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));     
  for(var k in o)     
    if(new RegExp("("+ k +")").test(fmt))     
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));     
  return fmt;     
};