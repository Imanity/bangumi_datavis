var cv_info_list = ["宮野真守", "本渡楓", "田野アサミ", "種田梨沙", "河瀬茉希", "衣川里佳", "田中美海", "三石琴乃", "吉野裕行"];
var director_info_list = ["境宗久"];
var script_info_list = ["村越繁", "ますもとたくや"];
var storyboard_info_list = ["伊藤達文", "境宗久", "清水久敏", "宇田鋼之介", "後藤康徳"];
var music_info_list = ["高梨康治", "Funta"];
var company_info_list = ["MAPPA", "avex pictures", "CygamesFunta"];
showInfo("ゾンビランドサガ", "佐贺偶像是传奇", "2018年10月4日", 7.9, 252655, cv_info_list, director_info_list, script_info_list, storyboard_info_list, music_info_list, company_info_list)

function list2str(l) {
    var str = "";
    for (i in l) {
        str += l[i];
        if (i != l.length - 1) {
            str += ", "
        }
    }
    return str;
}

function showInfo(name, name_chs, date, score, cover_img, cv, director, script, storyboard, music, company) {
    $(".info-field-cover").attr("src", "images/bangumi/" + cover_img + ".jpg");
    $(".info-field-name").html(name);
    $(".info-field-name_chs").html(name_chs);
    $(".info-field-date").html(date);
    if (score > 0) {
        $(".info-score").show();
        $(".info-field-score").html(score);
    } else {
        $(".info-score").hide();
    }
    $(".info-field-cv").html(list2str(cv));
    $(".info-field-director").html(list2str(director));
    $(".info-field-script").html(list2str(script));
    $(".info-field-storyboard").html(list2str(storyboard));
    $(".info-field-music").html(list2str(music));
    $(".info-field-company").html(list2str(company));
};

function hideInfo() {
    $(".aside-left").hide();
};

$(".aside-left-close").click(function() {
    hideInfo();
});
