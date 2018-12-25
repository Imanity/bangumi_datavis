var searchResult;

$(".search-result").hide();

$(".search-btn").click(function(e){
    if ($(".search-input").val() == "") {
        $(".search-result").hide();
        return;
    }
    $(".search-result").show();
    $(".search-items").empty();
    getSearchResult($(".search-input").val());
    for (idx in searchResult) {
        $(".search-items").append("<div class=\"search-item\" onclick=\"selectSearchResult(" + idx + ")\">" + searchResult[idx] + "</div>");
    }
});

$(".search-result span").click(function(e){
    $(".search-result").hide();
    $(".search-input").val("");
});

function getSearchResult(str) {
    searchResult = new Array();
    searchResult.push("a");
    searchResult.push("ab");
    searchResult.push("abc");
    searchResult.push("abcd");
    searchResult.push("abcde");
    searchResult.push("abcdef");
};

function selectSearchResult(idx) {
    console.log(searchResult[idx]);
}

$(".field-range").attr("disabled", true);
isSelfSelect =  false;

$("#self-select-yes").click(function() {
    isSelfSelect = !isSelfSelect;
    $(".field-range").attr("disabled", !isSelfSelect);
});
