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

var showAnimeList = new Array();

var renderMulLineMode = false;

$(".single-select").change(function () {
    renderMulLineMode = !renderMulLineMode;
    rerender();
});

$("#console-btn-1").click(function () {
    console.log(selectedPoint);
    if (selectedPoint < 0) {
        return;
    }
    if (showAnimeList.indexOf(selectedPoint) >= 0) {
        return;
    }
    showAnimeList.push(selectedPoint);
    $("#show-anime-list").append("<option>" + bangumi[selectedPoint].name + "</option>");
});

$("#console-btn-2").click(function () {
    for (var i = 0; i < showAnimeList.length; i++) {
        if (bangumi[showAnimeList[i]].name == $("#show-anime-list").val()) {
            showAnimeList.splice(i, 1);
            break;
        }
    }
    $('#show-anime-list option:selected').remove();
    rerender();
});

$("#console-btn-3").click(function () {
    rerender();
});

$("#show-anime-list").change(function () {
    var select_id = -1;
    for (i in bangumi) {
        if (bangumi[i].name == $("#show-anime-list").val()) {
            select_id = parseInt(i);
            break;
        }
    }
    selectPoint(select_id);
});
