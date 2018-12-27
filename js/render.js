function updateEdges() {
    var max_s_range = 400.0;
    var s_threshold = parseInt($("#range-connectivity").val()) / max_s_range;
    if (S == undefined) {
        return;
    }
    var edge_list = new Array();
    var edge_weight = new Array();
    for (i in bangumi) {
        for (j in bangumi) {
            if (i >= j) {
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
