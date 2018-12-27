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

function updatePI(A) {
    var SA = new Array(6);
    var SB = new Array(6);
    for (var i = 0; i < 6; ++i) {
        SA[i] = SB[i] = 0.0;
    }
    for (var i = 0; i < A.length; ++i) {
        for (var j = i + 1; j < A.length; ++j) {
            for (k in iou) {
                if (A[i] == iou[k]["x"] && A[j] == iou[k]["y"]) {
                    var iou_value = iou[k]["iou"];
                    for (var l = 0; l < 6; ++l) {
                        SA[l] += iou_value[l];
                    }
                    break;
                }
            }
        }
    }
    SA[0] /= Object.keys(cv_list).length;
    SA[1] /= Object.keys(storyboard_list).length;
    SA[2] /= Object.keys(music_list).length;
    SA[3] /= Object.keys(company_list).length;
    SA[4] /= Object.keys(director_list).length;
    SA[5] /= Object.keys(script_list).length;
    
    var SA_ = new Array(4);
    SA_[0] = (SA[1] + SA[3]) / 2.0;
    SA_[1] = SA[0];
    SA_[2] = (SA[4] + SA[5]) / 2.0;
    SA_[3] = SA[2];
    
    var SA_max = 0.0;
    for (var i = 0; i < 4; ++i) {
        if (SA_[i] > SA_max) {
            SA_max = SA_[i];
        }
    }
    for (var i = 0; i < 4; ++i) {
        SA_[i] /= SA_max;
        $("#range-" + (i + 1)).val(SA_[i] * 100.0);
    }
};
