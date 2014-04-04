
  
  //width and height
  var w = d3.select(".banner")[0][0].clientWidth;
  var h = d3.select(".banner")[0][0].clientHeight;
 
  //appends the svg
  var svg = d3.select(".banner").append("svg")
    .attr("width", w)
    .attr("height", h)
 
  //width of one triangle
  var width = 100;
 
  // square root of 3
  var sq_3 = Math.sqrt(3);
 
  //creates dataset for an equilateral triangle
  var equalTri = function (width) {
 
    this.dimen = [ { "x": 0,  "y": -width/sq_3 },
              { "x": -width/2,  "y": width/(2*sq_3) }, 
              { "x": width/2,  "y": width/(2*sq_3) } ];
 
    return dimen;
 
  }
  
  //dataset for the triangles
  var datum = equalTri(width);
 
  //dataset for the circles
  var circle = [{ "innerRadius": 0, "outerRadius": (Math.sqrt(3)*width)/6, "startAngle": 0, "endAngle": 2*Math.PI}];
 
  //practicing with scales - halfsize- double-size, inverted, half-size-inverted, double-size-inverted
  var halfScale = d3.scale.linear().domain([-width, width]).range([-width/2, width/2]);
 
  var doubleScale =  d3.scale.linear().domain([-width, width]).range([-width*2, width*2]);
 
  var invertedScale = d3.scale.linear().domain([-width, width]).range([width, -width]);
 
  var halfInverted = d3.scale.linear().domain([-width, width]).range([width/2, -width/2]);
 
  var doubleInverted = d3.scale.linear().domain([-width, width]).range([width*2, -width*2]);
 
  //normal-size
  var line_n = d3.svg.line()
              .x(function(d) { return d.x ; })
              .y(function(d) { return d.y ; })
              .interpolate("linear-closed");
 
  //half-size
  var line_h = d3.svg.line()
              .x(function(d) { return halfScale(d.x) ; })
              .y(function(d) { return halfScale(d.y) ; })
              .interpolate("linear-closed");
 
  //double-size
  var line_d = d3.svg.line()
              .x(function(d) { return doubleScale(d.x) ; })
              .y(function(d) { return doubleScale(d.y) ; })
              .interpolate("linear-closed");
 
  //inverted
  var line_i = d3.svg.line()
              .x(function(d) { return invertedScale(d.x) ; })
              .y(function(d) { return invertedScale(d.y) ; })
              .interpolate("linear-closed");
 
  //half-size inverted
  var line_hi = d3.svg.line()
              .x(function(d) { return halfInverted(d.x) ; })
              .y(function(d) { return halfInverted(d.y) ; })
              .interpolate("linear-closed");
 
  //double-size inverted
  var line_di = d3.svg.line()
              .x(function(d) { return doubleInverted(d.x) ; })
              .y(function(d) { return doubleInverted(d.y) ; })
              .interpolate("cardinal-closed");
 
  //circle
  var arc = d3.svg.arc()
            .innerRadius(function(d) {return d.innerRadius ; })
            .outerRadius(function(d) {return d.outerRadius ; })
            .startAngle(function(d) {return d.startAngle ; }) 
            .endAngle(function(d) {return d.endAngle ; }); 
  //double-size circle
  var arc2 = d3.svg.arc()
            .innerRadius(function(d) {return d.innerRadius ; })
            .outerRadius(function(d) {return doubleScale(d.outerRadius) ; })
            .startAngle(function(d) {return d.startAngle ; }) 
            .endAngle(function(d) {return d.endAngle ; }); 
 
function start() {
 
  //creates the triforce
  svg.selectAll("g")
      .data(datum)
      .enter()
      .append("g")
        .attr("transform", function(d, i) {
            if (i == 0)
            {
              return "translate(" + w/2 + "," + (h/2 - sq_3*width/2) + ")";
            }
            else if (i == 1)
            {
              return "translate(" + (w/2 - width/2) + "," + (h/2) + ")";
            }
            else if (i == 2)
            {
              return "translate(" + (w/2 + width/2) + "," + (h/2) + ")";
            }
          })
        .append("path")
        .style("fill", "grey")
        .attr("d", line_n(datum))
        .attr("stroke", "white")
        .attr("stroke-width", 2)
        .transition().duration(500)
          .style("fill", "gold");
 
 
  //creates the circles inside of the triforce
  svg.selectAll('g')
      .append("path").transition().delay(500).duration(1500)
        .attrTween("d", pathTween(arc(circle[0]),4))
        .attr("stroke", "white")
        .attr("stroke-width", 2)
        .style("fill", "black")
        .style("opacity", 0.8)
        //.transition().delay(4500).duration(1000)
          //.style("opacity", 0);
 
  //creates the white triangles inside of the trifoce
  svg.selectAll('g')
      .append("path")
      .transition().delay(1000).duration(2000)
        .attrTween("d", pathTween(line_h(datum),4))
        .attr("stroke", "white")
        .attr("stroke-width", 2)
        .style("fill", "white")
        //.transition().delay(4500).duration(2000)
          //.attrTween("d", pathTween(line_d(datum), 4))
          //.attr("stroke", "white")
          //.attr("stroke-width", 2)
          //.style("fill", "transparent");
 
//creates the inverted-center of the triforce - put after the last two to prevent binding
  svg.append("g")
      .attr("transform", "translate(" + (w/2) + "," + (h/2 - sq_3*width/6) + ")")
      .append("path")
        .attr("d", line_i(datum))
        .attr("stroke", "white")
        .attr("stroke-width", 2)
        .style("fill", "black")
        .style("opacity", 0.8);
 
  svg.selectAll("g").transition()
      .delay(2500).duration(1000)
      .style("opacity", 0)
  
  //moves top triangle down  
  svg.select("g")
     .transition().delay(2500).duration(2000)
     .attr("transform", "translate(" + (w/2) + "," + (h/2 - sq_3*width/6) + ")")
  
  //adds the big circle to the top triangle
  svg.select("g").append("path")
      .transition().delay(2000).duration(1000)
        .attrTween("d", pathTween(arc2(circle[0]),8))
        .attr("stroke", "white")
        .attr("stroke-width", 2)
        .style("fill", "transparent")
        //.transition().delay(6000).duration(1000)
          //.style("opacity", 0);
          /*
  //adds the middle inverted triangle at the end
  svg.select('path')
      .transition().delay(4500).duration(2000)
        .attrTween("d", pathTween(line_i(datum), 4))
        .attr("stroke", "white")
        .attr("stroke-width", 2)
        .style("fill", "black")
        .transition()
          .style("opacity", 0);
 */
  //removes all of the svg elements
  //svg.selectAll('g').transition().delay(6600).remove();
 
  //restarts the loop
  //d3.select('body').transition().delay(6600).each("end", start);
}
 
start();
 
//pathtween - taken from http://bl.ocks.org/mbostock/3916621               
function pathTween(d1, precision) {
  return function() {
    var path0 = this,
        path1 = path0.cloneNode(),
        n0 = path0.getTotalLength(),
        n1 = (path1.setAttribute("d", d1), path1).getTotalLength();
 
    // Uniform sampling of distance based on specified precision.
    var distances = [0], i = 0, dt = precision / Math.max(n0,n1);
    while ((i += dt) < 1) distances.push(i);
    distances.push(1);
 
    // Compute point-interpolators at each distance.
    var points = distances.map(function(t) {
      var p0 = path0.getPointAtLength(t * n0),
          p1 = path1.getPointAtLength(t * n1);
      return d3.interpolate([p0.x, p0.y], [p1.x, p1.y]);
    });
 
    return function(t) {
      return t <1 ? "M" + points.map(function(p) { return p(t); }).join("L") : d1;
    };
  };
};
 
