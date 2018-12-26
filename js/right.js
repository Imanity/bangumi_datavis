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
