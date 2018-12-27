function list2str(l) {
    var str = "";
    for (i in l) {
        str += findPerson(l[i]);
        if (i != l.length - 1) {
            str += ", "
        }
    }
    return str;
}

function findPerson(id) {
    for (i in person) {
        if (parseInt(person[i].id) == id) {
            return person[i].name;
        }
    }
    return "";
}

function showInfo(name, name_chs, date, score, cover_img, cv, director, script, storyboard, music, company) {
    $(".aside-left").show();
    $(".info-field-cover").attr("src", "http:" + cover_img);
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

hideInfo();
