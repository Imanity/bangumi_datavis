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
function selectOnePoint(id) {
    for (i in edges[0]){
        if (bangumi[parseInt(edges[0][i][0])].id==id || bangumi[parseInt(edges[0][i][1])].id==id){
            d3.selectAll("circle").filter(function(d) { 
                return d.data.id == bangumi[parseInt(edges[0][i][0])].id || d.data.id == bangumi[parseInt(edges[0][i][1])].id;
            }).attr("fill", "red");
            d3.selectAll('path').filter(function (d) {
                if( (d.source.data.id == bangumi[parseInt(edges[0][i][0])].id && d.target.data.id == bangumi[parseInt(edges[0][i][1])].id) || ( d.source.data.id == bangumi[parseInt(edges[0][i][1])].id && d.target.data.id == bangumi[parseInt(edges[0][i][0])].id )){
                    console.log(d.source.data);
                    console.log(d.target.data)
                }
                return (d.source.data.id == bangumi[parseInt(edges[0][i][0])].id && d.target.data.id == bangumi[parseInt(edges[0][i][1])].id) || ( d.source.data.id == bangumi[parseInt(edges[0][i][1])].id && d.target.data.id == bangumi[parseInt(edges[0][i][0])].id );
            }).style('stroke','red');
        }
    }
}
function selectMultiPoint(ids) {
    for (i in ids) {
        d3.selectAll("circle").filter(function(d) { 
            return d.data.id == ids[i];
        }).attr("fill", "red");
        for (j in ids) {
            d3.selectAll('path').filter(function (d) {
                return (d.source.data.id == ids[i] && d.target.data.id == ids[j]) || ( d.source.data.id == ids[j] && d.target.data.id == ids[i] )
            }).style('stroke','red');
        }
    }
}
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
