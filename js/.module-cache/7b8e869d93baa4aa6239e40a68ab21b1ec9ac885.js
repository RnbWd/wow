/** @jsx React.DOM */
var tr;
var total;
var triangle;
var tl;
var td;
var svg;
var colorTween;
var weirdTween; 
var weirdTween2;
var weirdTween3;
var weirdTween4;
var t1 = [0, 360];
React.initializeTouchEvents(true);
var Alchemy = React.createClass({displayName: 'Alchemy',
  getInitialState: function() {
    return {rotation: 0, touch: ''}
  },
  componentDidMount: function() {
    this.forceUpdate();
    this.props.weird = this.refs.weird.getDOMNode();
    //triangle = this.refs.svg.getDOMNode();
    this.props.weird2 = this.refs.weird2.getDOMNode();
    this.props.weird3 = this.refs.weird3.getDOMNode();

    this.props.weird4 = this.refs.weird4.getDOMNode();
    this.props.weird.style.zIndex = 10;
        this.props.weird3.style.zIndex = 2;
        this.props.weird2.style.zIndex = 2;
        this.props.weird4.style.zIndex = 2;
    this.handleScroll();
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
    var weird = this.props.weird;
    var weird2 = this.props.weird2;
    var weird3 = this.props.weird3;
    var weird4 = this.props.weird4;
    var self = this;
    if (event) {
      t1.push(event.deltaY);
    }
      //console.log(t1);
      total = t1.reduce(function(a, b) {
        return a + b;
      });
      if (total < 360 || total > 3599) {
        t1 = [360, 0];
        total = 360;
        weird.style.zIndex = 10;
        weird3.style.zIndex = 2;
        weird2.style.zIndex = 2;
        weird4.style.zIndex = 2;
        self.setState({rotation: 0});
      }
      function snap() {
        if (total%90 !== 0 ) {
          setTimeout(function() {
            //console.log(total); 
            if ((total%90 + total)%90 === 0) {
              //console.log(total%90 + total);
              total += total%90;
              doIt();
            } else {
              //console.log(total - total%90);
              total -= total%90;
              doIt();
              var compare = total/360;
              var comp = compare.toString().substr(2,2);
              if (comp === '25') {
                console.log('90');
                weird4.style.zIndex = 10;
                weird3.style.zIndex = 2;
                weird2.style.zIndex = 2;
                weird.style.zIndex = 2;
                self.setState({rotation: 25});
                //console.log(total);
              }
              else if (comp === '5') {
                console.log('180');
                weird3.style.zIndex = 10;
                weird4.style.zIndex = 2;
                weird2.style.zIndex = 2;
                weird.style.zIndex = 2;
                self.setState({rotation: 50});
              }
              else if (comp === '75') {
                console.log('270');
                weird2.style.zIndex = 10;
                weird3.style.zIndex = 2;
                weird4.style.zIndex = 2;
                weird.style.zIndex = 2;
                self.setState({rotation: 75});
              }
              else {
                console.log('360');
                weird.style.zIndex = 10;
                weird3.style.zIndex = 2;
                weird4.style.zIndex = 2;
                weird2.style.zIndex = 2;
                self.setState({rotation: 0});
              }
              console.log(total);
            }
          },1000);
          //console.log(total);
        }
      }
      //console.log(total);
      
      var doIt = function() {
        //ROTATION Z LOOKS COOL!
        window.requestAnimationFrame(self.update);
        var bannerTween = new TweenMax.to(weird, 60, {rotationY: (total), transformOrigin:"50% 50% -200px", transformPerspective:400, force3D: true, onComplete: snap(), useFrames: true});
         var bannerTween2 = new TweenMax.to(weird2, 60, {rotationY: (total+90), transformOrigin:"50% 50% -200px", transformPerspective:400, force3D: true, useFrames: true});
          var bannerTween3 = new TweenMax.to(weird3, 60, {rotationY: (total+180), transformOrigin:"50% 50% -200px", transformPerspective:400, force3D: true, useFrames: true});
         var bannerTween4 = new TweenMax.to(weird4, 60, {rotationY: (total+270), transformOrigin:"50% 50% -200px", transformPerspective:400, force3D: true, useFrames: true});
      }
      doIt();
      //weirdTween  = new TweenMax.to(triangle, 1, {rotation: (50+total), transformOrigin:"50% 50% -400px", transformPerspective:500, force3D: true, });
      //weirdTween50  = new TweenMax.to(tl, 1, {rotation: (360), transformOrigin:"100% 100% -400px", transformPerspective:500, force3D: true, });
     // weirdTween3  = new TweenMax.to(tr, 1, {rotation: (360),  transformOrigin:"0% 100% -400px", transformPerspective:500, force3D: true, });
    //console.log("scrolled");
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
    var style = {background: '#B8BDB6',
                 height: 401,
                 position: 'absolute',
                 top: 150, //(window.innerHeight - 361)/2,
                 left: (window.innerWidth - 401)/2,
                 width: 401, 
                 paddingTop: 20,
                 WebkitBackfaceVisibility:'hidden',
                 overflow: 'hidden'
                 //zIndex: 25,
                 /*WebkitClipPath: 'polygon(\
                  50% 20px, 80% 20px, 50% '+(middleH+25)+'px,\
                  50% 90%, 100% 20px, 100% 50%,\
                  75% 100%, 25% 100%, 0 50%, 0 20px,\
                  50% 90%, 50% '+(middleH+25)+'px, 20% 20px\
                )'*/
                
               };
    var valIn = postsList[0].content;
    var transparent = {fill: 'transparent'};
    var grey = {fill: 'grey'};
    var template = _.template($("script.template"+this.props.data[0].index).html());
    if (this.state.rotation === 25) {
      template = _.template($("script.template"+this.props.data[3].index).html());
    } else if (this.state.rotation === 50) {
      template = _.template($("script.template"+this.props.data[2].index).html());
    } else if (this.state.rotation === 75) {
      template = _.template($("script.template"+this.props.data[1].index).html());
    }
    var content = (React.DOM.div(
          {className:"postContent",
          style:{position: 'fixed', top: 120, left: 20, zIndex: 1, WebkitFilter: 'blur(2px)'},
          ref:"textcontent",
          dangerouslySetInnerHTML:{
            __html: template()
          }}
        ));

    return (
      React.DOM.div(  {className:"weird", style:{height: window.innerHeight}, onWheel:this.handleScroll, onTouchMove:this.handleTouch}, 
        React.DOM.h1(null, "Coding Alchemy"),
        
        React.DOM.h4(null, "By ", React.DOM.a( {href:"https://github.com/rnbwd"}, "RnbWd"), " ", this.state.touch),
        
        React.DOM.div( {ref:"weird", style:style}  , 
          React.DOM.span( {style:{marginRight: '10px'}, className:"pull-right"}, this.props.data[0].date,  "  "  ),
          React.DOM.h1(null, this.props.data[0].title),
          React.DOM.a( {href:baseUrl+this.props.data[0].url}, React.DOM.svg( {height:height+25, version:"1.1", width:width, xmlns:"http://www.w3.org/2000/svg", style:{position: 'absolute', left: 0-(window.innerWidth - 401)/2, top: 0}}, 
          React.DOM.path( {style:transparent,  ref:"triangle", stroke:"#2c3e50", d:"M"+middleW+","+(middleH-55)+"L"+(middleW-45*Math.sqrt(3))+","+(middleH+70)+"L"+(middleW+45*Math.sqrt(3))+","+(middleH+70)+"Z", strokeWidth:"3"}),
          React.DOM.path( {style:transparent, ref:"tr", stroke:"#2c3e50", d:"M"+(middleW)+","+(middleH+25)+"L"+((middleW+45*Math.sqrt(3))-20)+","+(middleH-7), strokeWidth:"3"}),
          React.DOM.path( {style:transparent, ref:"tl", stroke:"#2c3e50", d:"M"+(middleW)+","+(middleH+25)+"L"+((middleW-45*Math.sqrt(3))+20)+","+(middleH-7), strokeWidth:"3"}),
          React.DOM.path( {style:transparent, ref:"td", stroke:"#2c3e50", d:"M"+(middleW)+","+(middleH+25)+"L"+(middleW)+","+(middleH+94), strokeWidth:"3"}),
          React.DOM.circle( {style:grey, cx:middleW+45*Math.sqrt(3), cy:middleH-17, r:"20", stroke:"#2c3e50", strokeWidth:"3"} ),
          React.DOM.circle( {style:grey, cx:middleW-45*Math.sqrt(3), cy:middleH-17, r:"20", stroke:"#2c3e50", strokeWidth:"3"}),
          React.DOM.circle( {style:grey, cx:middleW, cy:middleH+114, r:"20", stroke:"#2c3e50", strokeWidth:"3"})
        ))
         ),
         React.DOM.div( {ref:"weird2", style:style}  , 
         React.DOM.span( {style:{marginRight: '10px'}, className:"pull-right"}, this.props.data[1].date,  "  "  ),
            React.DOM.h1(null, this.props.data[1].title),
            React.DOM.a( {href:baseUrl+this.props.data[1].url}, React.DOM.svg( {height:height+25, version:"1.1", width:width, xmlns:"http://www.w3.org/2000/svg", style:{position: 'absolute', left: 0-(window.innerWidth - 401)/2, top: 0}}, 
          React.DOM.path( {style:transparent,  ref:"triangle", stroke:"#2c3e50", d:"M"+middleW+","+(middleH-55)+"L"+(middleW-45*Math.sqrt(3))+","+(middleH+70)+"L"+(middleW+45*Math.sqrt(3))+","+(middleH+70)+"Z", strokeWidth:"3"}),
          React.DOM.path( {style:transparent, ref:"tr", stroke:"#2c3e50", d:"M"+(middleW)+","+(middleH+25)+"L"+((middleW+45*Math.sqrt(3))-20)+","+(middleH-7), strokeWidth:"3"}),
          React.DOM.path( {style:transparent, ref:"tl", stroke:"#2c3e50", d:"M"+(middleW)+","+(middleH+25)+"L"+((middleW-45*Math.sqrt(3))+20)+","+(middleH-7), strokeWidth:"3"}),
          React.DOM.path( {style:transparent, ref:"td", stroke:"#2c3e50", d:"M"+(middleW)+","+(middleH+25)+"L"+(middleW)+","+(middleH+94), strokeWidth:"3"}),
          React.DOM.circle( {style:grey, cx:middleW+45*Math.sqrt(3), cy:middleH-17, r:"20", stroke:"#2c3e50", strokeWidth:"3"} ),
          React.DOM.circle( {style:grey, cx:middleW-45*Math.sqrt(3), cy:middleH-17, r:"20", stroke:"#2c3e50", strokeWidth:"3"}),
          React.DOM.circle( {style:grey, cx:middleW, cy:middleH+114, r:"20", stroke:"#2c3e50", strokeWidth:"3"})
        ))
         ),
         React.DOM.div( {ref:"weird3", style:style}  , 
         React.DOM.span( {style:{marginRight: '10px'}, className:"pull-right"}, this.props.data[2].date,  "  "  ),
           React.DOM.h1(null, this.props.data[2].title),
           React.DOM.a( {href:baseUrl+this.props.data[2].url}, React.DOM.svg( {height:height+25, version:"1.1", width:width, xmlns:"http://www.w3.org/2000/svg", style:{position: 'absolute', left: 0-(window.innerWidth - 401)/2, top: 0}}, 
          React.DOM.path( {style:transparent,  ref:"triangle", stroke:"#2c3e50", d:"M"+middleW+","+(middleH-55)+"L"+(middleW-45*Math.sqrt(3))+","+(middleH+70)+"L"+(middleW+45*Math.sqrt(3))+","+(middleH+70)+"Z", strokeWidth:"3"}),
          React.DOM.path( {style:transparent, ref:"tr", stroke:"#2c3e50", d:"M"+(middleW)+","+(middleH+25)+"L"+((middleW+45*Math.sqrt(3))-20)+","+(middleH-7), strokeWidth:"3"}),
          React.DOM.path( {style:transparent, ref:"tl", stroke:"#2c3e50", d:"M"+(middleW)+","+(middleH+25)+"L"+((middleW-45*Math.sqrt(3))+20)+","+(middleH-7), strokeWidth:"3"}),
          React.DOM.path( {style:transparent, ref:"td", stroke:"#2c3e50", d:"M"+(middleW)+","+(middleH+25)+"L"+(middleW)+","+(middleH+94), strokeWidth:"3"}),
          React.DOM.circle( {style:grey, cx:middleW+45*Math.sqrt(3), cy:middleH-17, r:"20", stroke:"#2c3e50", strokeWidth:"3"} ),
          React.DOM.circle( {style:grey, cx:middleW-45*Math.sqrt(3), cy:middleH-17, r:"20", stroke:"#2c3e50", strokeWidth:"3"}),
          React.DOM.circle( {style:grey, cx:middleW, cy:middleH+114, r:"20", stroke:"#2c3e50", strokeWidth:"3"})
        ))
         ),
         React.DOM.div( {ref:"weird4", style:style}  , 
         React.DOM.span( {style:{marginRight: '10px'}, className:"pull-right"}, this.props.data[3].date,  "  "  ),
          React.DOM.h1(null, this.props.data[3].title),
          React.DOM.a( {href:baseUrl+this.props.data[3].url}, React.DOM.svg( {height:height+25, version:"1.1", width:width, xmlns:"http://www.w3.org/2000/svg", style:{position: 'absolute', left: 0-(window.innerWidth - 401)/2, top: 0}}, 
          React.DOM.path( {style:transparent,  ref:"triangle", stroke:"#2c3e50", d:"M"+middleW+","+(middleH-55)+"L"+(middleW-45*Math.sqrt(3))+","+(middleH+70)+"L"+(middleW+45*Math.sqrt(3))+","+(middleH+70)+"Z", strokeWidth:"3"}),
          React.DOM.path( {style:transparent, ref:"tr", stroke:"#2c3e50", d:"M"+(middleW)+","+(middleH+25)+"L"+((middleW+45*Math.sqrt(3))-20)+","+(middleH-7), strokeWidth:"3"}),
          React.DOM.path( {style:transparent, ref:"tl", stroke:"#2c3e50", d:"M"+(middleW)+","+(middleH+25)+"L"+((middleW-45*Math.sqrt(3))+20)+","+(middleH-7), strokeWidth:"3"}),
          React.DOM.path( {style:transparent, ref:"td", stroke:"#2c3e50", d:"M"+(middleW)+","+(middleH+25)+"L"+(middleW)+","+(middleH+94), strokeWidth:"3"}),
          React.DOM.circle( {style:grey, cx:middleW+45*Math.sqrt(3), cy:middleH-17, r:"20", stroke:"#2c3e50", strokeWidth:"3"} ),
          React.DOM.circle( {style:grey, cx:middleW-45*Math.sqrt(3), cy:middleH-17, r:"20", stroke:"#2c3e50", strokeWidth:"3"}),
          React.DOM.circle( {style:grey, cx:middleW, cy:middleH+114, r:"20", stroke:"#2c3e50", strokeWidth:"3"})
        )),
        svg
         ),
        content
        
      )
    )
  }
});

var awesome = React.renderComponent(
  Alchemy( {data:postsList} ), 
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
          {className:"postContent",
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

/*var posts = React.renderComponent(
  <Posts data={postsList} />, 
  document.getElementById('posts'));

*/
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
