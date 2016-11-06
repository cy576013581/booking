/**
 * Created by cy on 2016/8/13.
 */
$(document).ready(function () {
   $("#btn_ok").on("click",function(){
        var position = $("input:radio:checked").val();
        alert(11);
        var url = "CreateSumExcel?position="+position;
        window.open(encodeURI(encodeURI(url)));
    });
});

