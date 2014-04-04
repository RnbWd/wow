/** @jsx React.DOM */
var banner = document.getElementById('banner');
var tr;
var triangle;
var tl;
var td;


var Alchemy = React.createClass({displayName: 'Alchemy',
  componentDidMount: function() {
    triangle = this.refs.triangle.getDOMNode();
    tr = this.refs.tr.getDOMNode();
    tl = this.refs.tl.getDOMNode();
    td = this.refs.td.getDOMNode();
  },
  update: function() {
    this.forceUpdate();
  },
  handleOver: function() {
    console.log(triangle);
    var colorTween = new TweenLite.to(triangle, 2, {fill: "#4a9cd3"})
  },
  render: function() {
    var rect = banner.getBoundingClientRect();
    var height = rect.height;
    var width = rect.width;
    var left = rect.left;
    var middleW = rect.width/2;
    var middleH = rect.height/2;
    var style = {fill: 'transparent'};
    return (
      React.DOM.div(null, 
        React.DOM.h1(null, "Coding Alchemy"),
        React.DOM.h4(null, "By ", React.DOM.a( {href:"https://github.com/rnbwd"} , "RnbWd")),
        React.DOM.svg( {height:height, version:"1.1", width:width, xmlns:"http://www.w3.org/2000/svg", style:{overflow: 'hidden', position: 'absolute', left: 0, top: "0px"}}, 
          React.DOM.path( {onMouseOver:this.handleOver, ref:"triangle", stroke:"#2c3e50", d:"M"+middleW+","+(middleH-55)+"L"+(middleW-45*Math.sqrt(3))+","+(middleH+70)+"L"+(middleW+45*Math.sqrt(3))+","+(middleH+70)+"Z", strokeWidth:"3"}),
          React.DOM.path( {ref:"tr", stroke:"#2c3e50", d:"M"+(middleW)+","+(middleH+25)+"L"+((middleW+45*Math.sqrt(3))-20)+","+(middleH-7), strokeWidth:"3"}),
          React.DOM.path( {ref:"tl", stroke:"#2c3e50", d:"M"+(middleW)+","+(middleH+25)+"L"+((middleW-45*Math.sqrt(3))+20)+","+(middleH-7), strokeWidth:"3"}),
          React.DOM.path( {ref:"td", stroke:"#2c3e50", d:"M"+(middleW)+","+(middleH+25)+"L"+(middleW)+","+(middleH+94), strokeWidth:"3"}),
          React.DOM.circle( {cx:middleW+45*Math.sqrt(3), cy:"135", r:"20", stroke:"#2c3e50", strokeWidth:"3"} ),
          React.DOM.circle( {cx:middleW-45*Math.sqrt(3), cy:"135", r:"20", stroke:"#2c3e50", strokeWidth:"3"}),
          React.DOM.circle( {cx:middleW, cy:"262", r:"20", stroke:"#2c3e50", strokeWidth:"3"})
        )
      )
    )
  }
});

var awesome = React.renderComponent(
  Alchemy(null ), 
  document.getElementById('alchemy'));

$(window).resize(function() {
  awesome.update();
  //console.log('resize');
});

/*
var paper = Raphael(rect.left, 21, rect.width, rect.height);
var triangle = paper.path("M"+middleW+","+(middleH-55)+"L"+(middleW-45*Math.sqrt(3))+","+(middleH+70)+"L"+(middleW+45*Math.sqrt(3))+","+(middleH+70)+"Z");

var pathSet = paper.set();
var circleSet = paper.set();
pathSet.push(
  paper.path("M"+(middleW)+","+(middleH+25)+"L"+((middleW+45*Math.sqrt(3))-20)+","+(middleH-7)),
  paper.path("M"+(middleW)+","+(middleH+25)+"L"+((middleW-45*Math.sqrt(3))+20)+","+(middleH-7)),
  paper.path("M"+(middleW)+","+(middleH+25)+"L"+(middleW)+","+(middleH+94))
);
circleSet.push(
   paper.circle(middleW+45*Math.sqrt(3), middleH-15, 20),
   paper.circle(middleW-45*Math.sqrt(3), middleH-15, 20),
   paper.circle(middleW, middleH+112, 20)
);
triangle.attr("stroke-width", 3).attr("stroke", "#2C3E50");
circleSet.attr("stroke-width", 3).attr("stroke", "#2C3E50");
pathSet.attr("stroke-width", 3).attr("fill", "lightgrey").attr("stroke", "#2C3E50");

$(window).resize(function() {
  var rect = banner.getBoundingClientRect();
  paper.set(rect.width, rect.height);
  console.log("size "+rect.width);
});

var raphTween = new TweenLite.to(paper.canvas, 2, {rotation:360});
*/