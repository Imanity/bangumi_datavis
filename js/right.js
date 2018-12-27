var isShowInterestAnime = true;
var isShowInterestField = true;
var isShowInterestResult = true;

$("#aside-showhide-1").click(function() {
    isShowInterestAnime = !isShowInterestAnime;
    if (isShowInterestAnime) {
        $("#aside-showhide-1").attr("src", "images/triangle_down.png");
    } else {
        $("#aside-showhide-1").attr("src", "images/triangle_right.png");
    }
    updateShowHideAside();
});

$("#aside-showhide-2").click(function() {
    isShowInterestField = !isShowInterestField;
    if (isShowInterestField) {
        $("#aside-showhide-2").attr("src", "images/triangle_down.png");
    } else {
        $("#aside-showhide-2").attr("src", "images/triangle_right.png");
    }
    updateShowHideAside();
});

$("#aside-showhide-3").click(function() {
    isShowInterestResult = !isShowInterestResult;
    if (isShowInterestResult) {
        $("#aside-showhide-3").attr("src", "images/triangle_down.png");
    } else {
        $("#aside-showhide-3").attr("src", "images/triangle_right.png");
    }
    updateShowHideAside();
});

function updateShowHideAside() {
    if (isShowInterestAnime) {
        $('.interest-anime').show();
    } else {
        $('.interest-anime').hide();
    }
    if (isShowInterestField) {
        $('.interest-field').show();
    } else {
        $('.interest-field').hide();
    }
    if (isShowInterestResult) {
        $('.interest-result').show();
    } else {
        $('.interest-result').hide();
    }
};

$(".field-range").attr("disabled", true);
isSelfSelect =  false;

$("#self-select-yes").click(function() {
    isSelfSelect = !isSelfSelect;
    $(".field-range").attr("disabled", !isSelfSelect);
});

var selectedAnimeList = new Array();

$("#aside-btn-1").click(function () {
    if (selectedPoint < 0) {
        return;
    }
    if (selectedAnimeList.indexOf(selectedPoint) >= 0) {
        return;
    }
    selectedAnimeList.push(selectedPoint);
    idx = -1;
    for (i in bangumi) {
        if (parseInt(bangumi[i].id) == selectedPoint) {
            idx = i;
            break;
        }
    }
    if (idx < 0 || bangumi[idx].name == undefined) {
        return;
    }
    $("#selected-anime-list").append("<option>" + bangumi[idx].name + "</option>");
});

$("#aside-btn-2").click(function () {
    console.log($('#selected-anime-list option:selected'));
    $('#selected-anime-list option:selected').remove();
});
