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
            return "<span onclick='showPerson(" + id + ");' style='cursor:pointer'>" + person[i].name + "</span>";
        }
    }
    return "";
}

function showPerson(id) {
    bangumi_person_list = new Array();
    if (cv_list[id] != undefined) {
        bangumi_person_list = cv_list[id];
    } else if (company_list[id] != undefined) {
        bangumi_person_list = company_list[id];
    } else if (music_list[id] != undefined) {
        bangumi_person_list = music_list[id];
    } else if (storyboard_list[id] != undefined) {
        bangumi_person_list = storyboard_list[id];
    } else if (script_list[id] != undefined) {
        bangumi_person_list = script_list[id];
    } else if (director_list[id] != undefined) {
        bangumi_person_list = director_list[id];
    }

    $('#show-anime-list').find('option').remove();
    showAnimeList = new Array();
    for (i in bangumi_person_list) {
        var bangumi_idx = idxInBangumi(parseInt(bangumi_person_list[i]));
        var bangumi_name = bangumi[bangumi_idx].name;
        $("#show-anime-list").append("<option>" + bangumi_name + "</option>");
        showAnimeList.push(bangumi_idx);
    }

    $(".single-select").val("graph-mode-2");
    renderMulLineMode = true;
    rerender();
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
