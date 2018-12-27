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
        return d.data.id == id;
    }).attr("fill", "red");
    info = pointInfo(id);
    if (info == undefined || !info.length) {
        return;
    }
    showInfo(info[0], info[1], info[2], info[3], info[4], info[5], info[6], info[7], info[8], info[9], info[10]);
};

function clearSelected() {
    selectedPoint = -1;
    d3.selectAll("circle").attr("fill", "steelblue");
}

function pointInfo(id) {
    info = new Array(11);
    for (i in bangumi) {
        if (parseInt(bangumi[i].id) != id) {
            continue;
        }
        if (bangumi[i].name != undefined) {
            info[0] = bangumi[i].name;
        }
        if (bangumi[i].name_chs != undefined) {
            info[1] = bangumi[i].name_chs;
        }
        if (bangumi[i].date != undefined) {
            info[2] = bangumi[i].date;
        }
        if (bangumi[i].score != undefined) {
            info[3] = bangumi[i].score;
        }
        if (bangumi[i].cover != undefined) {
            info[4] = bangumi[i].cover;
        }
        if (bangumi[i].cv_id != undefined) {
            info[5] = bangumi[i].cv_id;
        }
        if (bangumi[i].director_id != undefined) {
            info[6] = bangumi[i].director_id;
        }
        if (bangumi[i].script_id != undefined) {
            info[7] = bangumi[i].script_id;
        }
        if (bangumi[i].storyboard_id != undefined) {
            info[8] = bangumi[i].storyboard_id;
        }
        if (bangumi[i].music_id != undefined) {
            info[9] = bangumi[i].music_id;
        }
        if (bangumi[i].company_id != undefined) {
            info[10] = bangumi[i].company_id;
        }
        break;
    }
    return info;
}
