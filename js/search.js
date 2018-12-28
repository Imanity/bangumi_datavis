var searchResult;

$(".search-result").hide();

function emit_search() {
    if ($(".search-input").val() == "") {
        $(".search-result").hide();
        return;
    }
    $(".search-result").show();
    $(".search-items").empty();
    getSearchResult($(".search-input").val());
    for (idx in searchResult) {
        $(".search-items").append("<div class=\"search-item\" onclick=\"selectSearchResult(" + idx + ")\">" + searchResult[idx].name + "</div>");
    }
}

$(".search-form").keypress(function(e) {
    var charCode = e.charCode || e.keyCode || e.which;
    if (charCode == 13) {
        emit_search();
        return false;
    }
})

$(".search-btn").click(function(e){
    emit_search();
});

$(".search-result span").click(function(e){
    $(".search-result").hide();
    $(".search-input").val("");
});

function getSearchResult(str) {
    searchResult = new Array();
    for (i in bangumi) {
        if (bangumi[i].name != undefined && bangumi[i].name.indexOf(str) >= 0) {
            searchResult.push({"id": i, "name": bangumi[i].name});
        } else if (bangumi[i].name_chs != undefined && bangumi[i].name_chs.indexOf(str) >= 0) {
            searchResult.push({"id": i, "name": bangumi[i].name_chs});
        }
        if (searchResult.length > 4) {
            break;
        }
    }
};

function selectSearchResult(idx) {
    selectPoint(searchResult[idx].id);
}
