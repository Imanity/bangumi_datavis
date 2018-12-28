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
    clearSelected();
    if (renderMulLineMode) {
        return;
    }
    for (i in edges[0]){
        if (bangumi[parseInt(edges[0][i][0])].id==id || bangumi[parseInt(edges[0][i][1])].id==id){
            d3.selectAll("circle").filter(function(d) { 
                return d.data.id == bangumi[parseInt(edges[0][i][0])].id || d.data.id == bangumi[parseInt(edges[0][i][1])].id;
            }).attr("fill", "red");
            d3.selectAll('path').filter(function (d) {
                if( (d.source.data.id == bangumi[parseInt(edges[0][i][0])].id && d.target.data.id == bangumi[parseInt(edges[0][i][1])].id) || ( d.source.data.id == bangumi[parseInt(edges[0][i][1])].id && d.target.data.id == bangumi[parseInt(edges[0][i][0])].id )){
                    //console.log(d.source.data);
                    //console.log(d.target.data)
                }
                return (d.source.data.id == bangumi[parseInt(edges[0][i][0])].id && d.target.data.id == bangumi[parseInt(edges[0][i][1])].id) || ( d.source.data.id == bangumi[parseInt(edges[0][i][1])].id && d.target.data.id == bangumi[parseInt(edges[0][i][0])].id );
            }).style('stroke','red').style("stroke-width", 5);
        }
    }
}
function selectMultiPoint(ids) {
    clearSelected();
    if (!renderMulLineMode) {
        return;
    }
    for (i in ids) {
        d3.selectAll("circle").filter(function(d) { 
            return d.data.id == ids[i];
        }).attr("fill", "red");
        for (j in ids) {
            d3.selectAll('path').filter(function (d) {
                return (d.source.data.id == ids[i] && d.target.data.id == ids[j]) || ( d.source.data.id == ids[j] && d.target.data.id == ids[i] )
            }).style('stroke','red').style("stroke-width", 5);
        }
    }
}
$("#range-connectivity").change(function () {
    edges = updateEdges();
    clear_svg();
    render();
    if (renderMulLineMode) {
        var idxs = new Array();
        for (i in showAnimeList) {
            idxs.push(bangumi[showAnimeList[i]].id);
        }
        selectMultiPoint(idxs);
    }
});

var selectedPoint = -1;

function selectPoint(id) {
    clearSelected();
    selectOnePoint(bangumi[id].id);
    selectedPoint = id;
    d3.selectAll("circle").filter(function(d) { 
        return d.data.id == parseInt(bangumi[id].id);
    }).attr("fill", "red");
    showInfo(bangumi[id].name, bangumi[id].name_chs, bangumi[id].date, bangumi[id].score, bangumi[id].cover, bangumi[id].cv_id, 
        bangumi[id].director_id, bangumi[id].script_id, bangumi[id].storyboard_id, bangumi[id].music_id, bangumi[id].company_id);
};

function clearSelected() {
    selectedPoint = -1;
    d3.selectAll("circle").attr("fill", function(d) {
        var color_table = ["#000079", "#003D79", "#004B97", "#005AB5", "#0066CC", "#0072E3", "#0080FF", "#2894FF", 
        "#46A3FF", "#66B3FF", "#84C1FF", "#97CBFF", "#ACD6FF", "#C4E1FF", "#D2E9FF", "#ECF5FF"];
        var color_id = d.data.score - 5.0;
        if (color_id < 0) {
            color_id = 0;
        }
        if (color_id > 3.0) {
            color_id = 3.0;
        }
        return color_table[parseInt(15.0 - color_id * 5.0)];
    });

    d3.selectAll('path').style('stroke','steelblue').style("stroke-width", 1);
};

function rerender() {
    if (!isSelfSelect) {
        updatePI(selectedAnimeList);
    }
    updateSimilarity();
    edges = updateEdges();
    clear_svg();
    render();
    if (renderMulLineMode) {
        var idxs = new Array();
        for (i in showAnimeList) {
            idxs.push(bangumi[showAnimeList[i]].id);
        }
        selectMultiPoint(idxs);
    }
}

String.prototype.visualLength = function() { 
    var ruler = $("#ruler"); 
    ruler.text(this); 
    return ruler[0].offsetWidth; 
} 
