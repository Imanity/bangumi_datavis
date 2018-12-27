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
var link = svg.append("g").selectAll(".link");
var node = svg.append("g").selectAll(".node");

d3.select("#graph").attr("align", "center");

d3.json("https://raw.githubusercontent.com/Imanity/bangumi_datavis/master/json/bangumi.json?token=AIuskbIqNFH5PUTWCO6BqK9KNgcTokGEks5cLguvwA%3D%3D").then(function(data) {
    var root = packageHierarchy(data);
    cluster(root);

    node = node.data(root.leaves())
                .enter().append("circle")
                .attr("cx", d => d.y * Math.sin(d.x / 180 * Math.PI))
                .attr("cy", d => d.y * Math.cos(d.x / 180 * Math.PI))
                .attr("r", 3)
                .attr("cursor", "pointer")
                .attr("fill", "steelblue")
                .on("mouseover", function(d) {
                    d3.select(this).transition()
                        .duration("500")
                        .attr("r", 6);
                })
                .on("mouseout", function(d) {
                    d3.select(this).transition()
                        .duration("500")
                        .attr("r", 3);
                })
                .on("click", function(d) {
                    console.log(d);
                });

    link = link.data(packageImports(root.leaves()))
                .enter().append("path")
                    .each(function(d) { d.source = d[0]; d.target = d[d.length - 1]; })
                    .attr("class", "link")
                    .attr("d", line);
});

function packageHierarchy(classes) {
    var map = {};

    console.log(classes);
    
    function find(name, data) {
        var node = map[name], i;
        if (!node) {
            node = map[name] = data || { name: name, children: [] };
            if (node.name != "") {
                node.parent = find("");
                node.parent.children.push(node);
            }
        }
        return node;
    }

    classes.forEach(function(d) {
        find(d.name, d);
    });

    return d3.hierarchy(map[""]);
}

function packageImports(nodes) {
    var map = {}, imports = [];

    nodes.forEach(function(d, i) {
        map[i] = d;
    });

    edges[0].forEach(function(d) {
        imports.push(map[d[0]].path(map[d[1]]));
    });

    return imports;
}