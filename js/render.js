function updateEdges() {
    var max_s_range = 100.0;
    var s_threshold = parseInt($("#range-connectivity").val()) / max_s_range;
    if (S == undefined) {
        return;
    }
    var edge_list = new Array();
    var edge_weight = new Array();
    for (i in bangumi) {
        for (j in bangumi) {
            if (parseInt(i) >= parseInt(j)) {
                continue;
            }
            if (S[i][j] > s_threshold) {
                edge_list.push([i, j]);
                edge_weight.push((S[i][j] - s_threshold) / (1.0 - s_threshold));
            }
        }
    }
    return [edge_list, edge_weight];
};

updateSimilarity();
var edges = updateEdges();

$("#range-connectivity").change(function () {
    edges = updateEdges();
    clear_svg();
    render();
});

var selectedPoint = -1;

function selectPoint(id) {
    clearSelected();
    selectedPoint = id;
    d3.selectAll("circle").filter(function(d) { 
        return d.data.id == parseInt(bangumi[id].id);
    }).attr("fill", "red");
    showInfo(bangumi[id].name, bangumi[id].name_chs, bangumi[id].date, bangumi[id].score, bangumi[id].cover, bangumi[id].cv_id, 
        bangumi[id].director_id, bangumi[id].script_id, bangumi[id].storyboard_id, bangumi[id].music_id, bangumi[id].company_id);
};

function clearSelected() {
    selectedPoint = -1;
    d3.selectAll("circle").attr("fill", "steelblue");
}

function rerender() {
    if (!isSelfSelect) {
        updatePI(selectedAnimeList);
    }
    updateSimilarity();
    edges = updateEdges();
    clear_svg();
    render();
}
