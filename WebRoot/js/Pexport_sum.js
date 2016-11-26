/**
 * Created by cy on 2016/8/13.
 */
$(document).ready(function () {
	if(sessionStorage.getItem("username") == null){
		window.location.href="Pindex.html";
	}
   $("#btn_ok").on("click",function(){
        var position = $("input:radio:checked").val();
        alert(11);
        var url = "CreateSumExcel?position="+position;
        window.open(encodeURI(encodeURI(url)));
    });
});

