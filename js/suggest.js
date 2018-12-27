var S = new Array(bangumi.length);

for (i in bangumi) {
    S[i] = new Array(bangumi.length);
    for (j in bangumi) {
        S[i][j] = 0;
    }
}

function updateSimilarity() {
    var company_storyboard_pi = parseInt($("#range-1").val());
    var cv_pi = parseInt($("#range-2").val());
    var script_director_pi = parseInt($("#range-3").val());
    var music_pi = parseInt($("#range-4").val());

    var sum = company_storyboard_pi + cv_pi + script_director_pi + music_pi;
    company_storyboard_pi /= sum;
    cv_pi /= sum;
    script_director_pi /= sum;
    music_pi /= sum;

    for (i in iou) {
        var x = iou[i]["x"];
        var y = iou[i]["y"];
        var iou_single = iou[i]["iou"];
        S[x][y] = S[y][x] = cv_pi * iou_single[0] + company_storyboard_pi * (iou_single[1] + iou_single[3]) / 2.0 + 
        music_pi * iou_single[2] + script_director_pi * (iou_single[4] + iou_single[5]) / 2.0;
    }
};
