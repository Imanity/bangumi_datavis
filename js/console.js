var isShowConsole = false;

$(".console-content").hide();

$("#aside-showhide-console").click(function () {
    isShowConsole = !isShowConsole;
    if (isShowConsole) {
        $("#aside-showhide-console").attr("src", "images/triangle_up.png");
        $(".console-content").show();
    } else {
        $("#aside-showhide-console").attr("src", "images/triangle_right.png");
        $(".console-content").hide();
    }
});
