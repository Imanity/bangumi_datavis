var diameter = 900, radius = diameter / 2, innerRadius = radius - 120;
var cluster = d3.cluster()
                .size([360, innerRadius]);
var line = d3.radialLine()
            .curve(d3.curveBundle.beta(0.85))
            .radius(function(d) { return d.y; })
            .angle(function(d) { return d.x / 180 * Math.PI; });
var svg = d3.select("#graph").append("svg")
            .attr("width", diameter)
            .attr("height", diameter)
            .append("g")
            .attr("transform", "translate(" + radius + "," + radius + ")");

function clear_svg() {
    svg.selectAll("*").remove();
}

function render() {
    var link = svg.append("g").selectAll(".link");
    var node = svg.append("g").selectAll(".node");
    
    d3.select("#graph").attr("align", "center");

    var root = packageHierarchy(bangumi);
    cluster(root);

    node = node.data(root.leaves())
        .enter().append("circle")
        .attr("cx", d => d.y * Math.sin(d.x / 180 * Math.PI))
        .attr("cy", d => d.y * -Math.cos(d.x / 180 * Math.PI))
        .attr("r", 3)
        .attr("cursor", "pointer")
        .attr("fill", function(d) {
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
        })
        /*.attr("fill", "steelblue")
        .style("opacity", function(d) {
            return (d.data.score - 3) / 5;
        })*/
        .on("mouseover", function(d) {
            d3.select(this).transition()
                .duration("100")
                .attr("r", 6);
        })
        .on("mouseout", function(d) {
            d3.select(this).transition()
                .duration("100")
                .attr("r", 3);
        })
        .on("click", function(d) {
            selectPoint(idxInBangumi(d.data.id));
        });

    link = link.data(packageImports(root.leaves()))
        .enter().append("path")
            .each(function(d) { d.source = d[0]; d.target = d[d.length - 1]; })
            .attr("class", "link")
            .attr("d", line)
            .style('stroke',function (d){
                s = parseInt(map_id_list[d.source.data.id]);
                t = parseInt(map_id_list[d.target.data.id]);
                var color_table = ["#000079", "#003D79", "#004B97", "#005AB5", "#0066CC", "#0072E3", "#0080FF", "#2894FF", 
            "#46A3FF", "#66B3FF", "#84C1FF", "#97CBFF", "#ACD6FF", "#C4E1FF", "#D2E9FF", "#ECF5FF"];
                t = (Math.max(s,t)).toString();
                s = (Math.min(s,t)).toString();
                for (i in edges[0]){
                    if(edges[0][i][0]==s && edges[0][i][1]==t){
                        x = parseInt(edges[1][i]*3);
                        if(x>10){
                            x=10;
                        }
                        return color_table[10-x];
                    }
                }
            })
            .style('stroke-width',function (d){
                s = parseInt(map_id_list[d.source.data.id]);
                t = parseInt(map_id_list[d.target.data.id]);
                
                t = (Math.max(s,t)).toString();
                s = (Math.min(s,t)).toString();
                for (i in edges[0]){
                    if(edges[0][i][0]==s && edges[0][i][1]==t){
                        x = parseInt(edges[1][i]*6);
                        if(x>30){
                            x=30;
                        }
                        return x/10;
                    }
                }
            });
    

    function packageHierarchy(classes) {
        var map = {};

        function find(name, is_cluster, data) {
            var node = map[name], i;
            if (!node) {
                node = map[name] = data || { name: name, children: [] };
                if (is_cluster == false && node.name != "") {
                    node.parent = find(cluster_labels[node.id], true);
                    node.parent.children.push(node);
                } else if (is_cluster == true) {
                    node.parent = find("", false);
                    node.parent.children.push(node);
                }
            }
            return node;
        }

        classes.forEach(function(d) {
            find(d.id, false, d);
        });

        return d3.hierarchy(map[""]);
    }

    function packageImports(nodes) {
        var map = {}, imports = [];

        nodes.forEach(function(d, i) {
            map[i] = d;
        });

        edges[0].forEach(function(d) {
            var d0 = 0, d1 = 0;
            for (i in map) {
                if (map[i].data.id == bangumi[d[0]].id) {
                    d0 = i;
                }
                if (map[i].data.id == bangumi[d[1]].id) {
                    d1 = i;
                }
            }
            imports.push(map[d0].path(map[d1]));
        });

        return imports;
    }

}

render();
