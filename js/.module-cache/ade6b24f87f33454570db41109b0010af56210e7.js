/** @jsx React.DOM */
var tr;
var triangle;
var tl;
var td;
var svg;
var colorTween;
var weirdTween; 
var weirdTween2;
var weirdTween3;
var weirdTween4;
var t1 = [];
var Alchemy = React.createClass({displayName: 'Alchemy',
  //getInitialState: function() {
    //return {over: "no"}
 // },
  componentDidMount: function() {
    //triangle = this.refs.triangle.getDOMNode();
    //tr = this.refs.tr.getDOMNode();
    //tl = this.refs.tl.getDOMNode();
    //td = this.refs.td.getDOMNode();
    //this.props.over = "no";
    this.props.content = this.refs.textcontent.getDOMNode().textContent;
    //console.log(this.props.content);
    //weirdTween  = new TweenMax.to(td, 50, {rotation:360, repeat: 50, repeatDelay: 1, yoyo: true, transformOrigin:"50% 0% -400px", transformPerspective:500, delay: 3, force3D: true, useFrames:true, immediateRender:true});
    //weirdTween50  = new TweenMax.to(tl, 50, {rotation:360, repeat: 50, repeatDelay: 1, yoyo: true, transformOrigin:"100% 100% -400px", transformPerspective:500, delay: 3, force3D: true, useFrames:true, immediateRender:true});
    //weirdTween3  = new TweenMax.to(tr, 50, {rotation:360, repeat: 50, repeatDelay: 1, yoyo: true, transformOrigin:"0% 100% -400px", transformPerspective:500, delay: 3, force3D: true, useFrames:true, immediateRender:true});
    //weirdTween4  = new TweenMax.to(triangle, 2, {rotation:120, repeat: -1, repeatDelay: 1, yoyo: true, transformOrigin:"50% 50% -400px", transformPerspective:500, delay: 3, force3D: true});

  },
  update: function() {
    this.forceUpdate();
  },
  handleScroll: function(event) {
    
      //window.requestAnimationFrame(this.update);
      //weirdTween  = new TweenMax.to(td, 1, {rotation: (360), transformOrigin:"50% 0% -400px", transformPerspective:500, force3D: true, });
      //weirdTween50  = new TweenMax.to(tl, 1, {rotation: (360), transformOrigin:"100% 100% -400px", transformPerspective:500, force3D: true, });
     // weirdTween3  = new TweenMax.to(tr, 1, {rotation: (360),  transformOrigin:"0% 100% -400px", transformPerspective:500, force3D: true, });
    console.log("scrolled");
  },
  handleOver: function() {
    if (this.props.over == "no") {
      colorTween = new TweenLite.to(triangle, 0.6, {fill: "#49c69f", });
      this.props.over = "yes";
      console.log('over');
    }
  },
  render: function() {
    var banner = document.getElementById('banner');
    var rect = banner.getBoundingClientRect();
    var height = rect.height;
    var width = rect.width;
    var left = rect.left;
    var middleW = rect.width/2;
    var middleH = rect.height/2;
    var style = {fill: 'transparent'};
    var valIn = posts[0].content;
    console.log(valIn);

    return (
      React.DOM.div(null, 
        React.DOM.nav( {className:"bg-primary"}, 
          React.DOM.a( {className:"btn btn-default pull-left", href:baseUrl}, "Home")
        ),
        React.DOM.h1(null, "Coding Alchemy"),
        
        React.DOM.h4(null, "By ", React.DOM.a( {href:"https://github.com/rnbwd"}, "RnbWd")),
        React.DOM.div(
              {className:"",
              ref:"textcontent",
              dangerouslySetInnerHTML:{
                __html: marked(valIn)
              }}
            )

        

         
      )
    )
  }
});

var awesome = React.renderComponent(
  Alchemy(null ), 
  document.getElementById('alchemy'));


var Posts = React.createClass({displayName: 'Posts',
  //getInitialState: function() {
    //return {over: "no"}
 // },
  render: function() {
    var postNodes = this.props.data.map(function (post) {
      return PostNode( {title:post.title, date:post.date, url:post.url, content:post.content} );
    });
    return (
      React.DOM.div( {className:""}, 
        postNodes
      )
    );
  }
});

var PostNode = React.createClass({displayName: 'PostNode',
  //getInitialState: function() {
    //return {over: "no"}
 // },
 render: function() {
    return (
      React.DOM.div( {className:"postContent"}, 
        React.DOM.p( {className:"author"}, 
          React.DOM.span( {className:"date"}, this.props.date)
        ),
        React.DOM.h4(null, this.props.title),
        React.DOM.div(
          {className:"",
          ref:"textcontent",
          dangerouslySetInnerHTML:{
            __html: marked(this.props.content)
          }}
        ),
        React.DOM.a( {href:baseUrl+this.props.url}, "read more")
        
      )
    );
 }

});



$(window).resize(function() {
  awesome.update();
  //console.log('resize');
});
        //<svg ref="svg" height={height} version="1.1" width={width} xmlns="http://www.w3.org/2000/svg" style={{position: 'absolute', left: 0, top: 0}}>
         // <path style={style}  ref="triangle" stroke="#2c3e50" d={"M"+middleW+","+(middleH-55)+"L"+(middleW-45*Math.sqrt(3))+","+(middleH+70)+"L"+(middleW+45*Math.sqrt(3))+","+(middleH+70)+"Z"} strokeWidth="3"></path>
         // <path style={style} ref="tr" stroke="#2c3e50" d={"M"+(middleW)+","+(middleH+25)+"L"+((middleW+45*Math.sqrt(3))-20)+","+(middleH-7)} strokeWidth="3"></path>
         // <path style={style} ref="tl" stroke="#2c3e50" d={"M"+(middleW)+","+(middleH+25)+"L"+((middleW-45*Math.sqrt(3))+20)+","+(middleH-7)} strokeWidth="3"></path>
         // <path style={style} ref="td" stroke="#2c3e50" d={"M"+(middleW)+","+(middleH+25)+"L"+(middleW)+","+(middleH+94)} strokeWidth="3"></path>
         // <circle fill="url(#image)" cx={middleW+45*Math.sqrt(3)} cy="135" r="20" stroke="#2c3e50" strokeWidth="3" ></circle>
         // <circle style={style} cx={middleW-45*Math.sqrt(3)} cy="135" r="20" stroke="#2c3e50" strokeWidth="3"></circle>
         // <circle style={style} cx={middleW} cy="262" r="20" stroke="#2c3e50" strokeWidth="3"></circle>
       // </svg>
/*
var banner = document.getElementById('banner');
var rect = banner.getBoundingClientRect();
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

//var raphTween = new TweenLite.to(paper.canvas, 2, {rotation:360});
*/
