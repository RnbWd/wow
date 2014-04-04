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
var t1 = [0];
var Alchemy = React.createClass({displayName: 'Alchemy',
  //getInitialState: function() {
    //return {over: "no"}
 // },
  componentDidMount: function() {
    this.forceUpdate();
    this.props.weird = this.refs.weird.getDOMNode();
    triangle = this.refs.svg.getDOMNode();
    //tr = this.refs.tr.getDOMNode();
    //tl = this.refs.tl.getDOMNode();
    //td = this.refs.td.getDOMNode();
    //this.props.over = "no";
    //this.props.content = this.refs.textcontent.getDOMNode().textContent;
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
      t1.push(event.deltaY);
      total = t1.reduce(function(a, b) {
        return a + b;
      });
      if (total < -100) {
        t1 = [0, -100];
        total = -100;
      }
      console.log(t1);
      window.requestAnimationFrame(this.update);
      var weird = this.props.weird;
      var bannerTween = new TweenMax.to(weird, 60, {rotation: (total), transformOrigin:"50% 50% -400px", transformPerspective:500, force3D: true, useFrames: true});
      //weirdTween  = new TweenMax.to(triangle, 1, {rotation: (50+total), transformOrigin:"50% 50% -400px", transformPerspective:500, force3D: true, });
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
    var right = rect.right;
    var middleW = rect.width/2;
    var middleH = rect.height/2;
    var style = {background: 'grey',
                 height: window.innerHeight,
                 /*position: 'fixed',
                 top: 0,
                 left: 0,*/
                 width: '100%', 
                 paddingTop: 20,
                 zIndex: 25,
                 WebkitClipPath: 'polygon(\
                  50% 20px, 80% 20px, 50% '+(middleH+25)+'px,\
                  50% 90%, 100% 20px, 100% 50%,\
                  75% 100%, 25% 100%, 0 50%, 0 20px,\
                  50% 90%, 50% '+(middleH+25)+'px, 20% 20px\
                )'
                
               };
    var valIn = postsList[0].content;
    var transparent = {fill: 'transparent'};
    var grey = {fill: 'grey'};

    

    return (
      React.DOM.div(  {className:"weird", style:{height: window.innerHeight}, onWheel:this.handleScroll}, 
        
        React.DOM.div( {ref:"weird", style:style}  , 
        React.DOM.h1(null, "Coding Alchemy"),
        
        React.DOM.h4(null, "By ", React.DOM.a( {href:"https://github.com/rnbwd"}, "RnbWd"))
        
         ),
         React.DOM.svg( {ref:"svg", height:height+25, version:"1.1", width:width, xmlns:"http://www.w3.org/2000/svg", style:{position: 'absolute', left: 0, top: 0, zIndex: 99}}, 
          React.DOM.path( {style:transparent,  ref:"triangle", stroke:"#2c3e50", d:"M"+middleW+","+(middleH-55)+"L"+(middleW-45*Math.sqrt(3))+","+(middleH+70)+"L"+(middleW+45*Math.sqrt(3))+","+(middleH+70)+"Z", strokeWidth:"3"}),
          React.DOM.path( {style:transparent, ref:"tr", stroke:"#2c3e50", d:"M"+(middleW)+","+(middleH+25)+"L"+((middleW+45*Math.sqrt(3))-20)+","+(middleH-7), strokeWidth:"3"}),
          React.DOM.path( {style:transparent, ref:"tl", stroke:"#2c3e50", d:"M"+(middleW)+","+(middleH+25)+"L"+((middleW-45*Math.sqrt(3))+20)+","+(middleH-7), strokeWidth:"3"}),
          React.DOM.path( {style:transparent, ref:"td", stroke:"#2c3e50", d:"M"+(middleW)+","+(middleH+25)+"L"+(middleW)+","+(middleH+94), strokeWidth:"3"}),
          React.DOM.circle( {style:grey, cx:middleW+45*Math.sqrt(3), cy:middleH-17, r:"20", stroke:"#2c3e50", strokeWidth:"3"} ),
          React.DOM.circle( {style:grey, cx:middleW-45*Math.sqrt(3), cy:middleH-17, r:"20", stroke:"#2c3e50", strokeWidth:"3"}),
          React.DOM.circle( {style:grey, cx:middleW, cy:middleH+114, r:"20", stroke:"#2c3e50", strokeWidth:"3"})
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
      var template = _.template($("script.template"+post.index).html());
      return PostNode( {key:post.index, title:post.title, date:post.date, url:post.url, content:template()} );
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
        React.DOM.h1(null, this.props.title),
        React.DOM.div(
          {className:"",
          ref:"textcontent"}
          /*dangerouslySetInnerHTML={{
            __html: this.props.content
          }}*/
        ),
        React.DOM.a( {href:baseUrl+this.props.url}, "read more")
        
      )
    );
 }

});

var posts = React.renderComponent(
  Posts( {data:postsList} ), 
  document.getElementById('posts'));


$(window).resize(function() {
  awesome.update();
  //console.log('resize');
});
    /* <span style={{width:'100%', height:'100%', zIndex:-101, position: 'fixed', left: 0, top:0}}>
        <video width="100%" height="100%" autoPlay loop> 
          <source src="images/the_big_bad_wolf.ogv" type="video/ogg" />
          <source src="images/the_big_bad_wolf.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        </span>*/      
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
