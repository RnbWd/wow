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
    //this.forceUpdate();
    this.props.weird = this.refs.weird.getDOMNode();
    //triangle = this.refs.svg.getDOMNode();
    this.props.confuse = this.refs.confuse.getDOMNode();
    this.props.weird3 = this.refs.comp.getDOMNode();

    //this.props.weird4 = this.refs.weird4.getDOMNode();
    
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
    var self = this;
    var confuse = this.props.confuse;
    var comp = this.props.weird3;
    if (event) {
      if (event.deltaY){
      t1.push(event.deltaY);
      
    } else if (event.changedTouches) {
      t1 = [0, event.changedTouches.item(0).clientY]
    }
  }
      //console.log(t1);
      total = t1.reduce(function(a, b) {
        return a + b;
      });
      
      console.log(total);
      
      var doIt = function() {
        //ROTATION Z LOOKS COOL!
       // window.requestAnimationFrame(self.update);
        var bannerTween = new TweenMax.to(weird, 60, {rotationY: (total), transformOrigin:"50% 50% -200px", transformPerspective:400, force3D: true, useFrames: true});
        var bannerTween2 = new TweenMax.to(confuse, 60, {width: (total/3), transformOrigin:"50% 50% -200px", transformPerspective:400, force3D: true, useFrames: true});
          var bannerTween3 = new TweenMax.to(comp, 60, {height: (total/6), rotationX: (-total), transformOrigin:"50% 50% -200px", transformPerspective:400, force3D: true, useFrames: true});
         //var bannerTween4 = new TweenMax.to(weird4, 60, {rotationY: (total+270), transformOrigin:"50% 50% -200px", transformPerspective:400, force3D: true, useFrames: true});
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
  handleTouch: function(event) {
    event.preventDefault();
    this.setState({touch: event.changedTouches.item(0).clientY.toString()});
    this.handleScroll(event);
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
    var style = {
                 
                 
                 WebkitBackfaceVisibility:'hidden',
                 overflow: 'hidden',
                 zIndex: 25,
                 WebkitClipPath: 'polygon(\
                  50% 0, 80% 0, 50% 30%,\
                  50% 90%, 100% 0, 100% 50%,\
                  75% 100%, 25% 100%, 0 50%, 0 0,\
                  50% 90%, 50% 30%, 20% 0\
                )'
                
               };

    return (
      React.DOM.div(  {className:"weird",  style:{height: window.innerHeight}, onWheel:this.handleScroll, onTouchMove:this.handleTouch}, 
       React.DOM.h3( {style:{position: 'fixed', zIndex: 35, textAlign: 'center'}} , "Much Scroll"),
        React.DOM.div( {className:"shibe", style:{position: 'fixed', zIndex: 35}, ref:"weird"} 
          
        ),
        React.DOM.div( {style:style, className:"confuse", ref:"confuse"}
          
        ),
        React.DOM.img( {style:{height: 0, position: 'fixed', left: 0, top: 0,zIndex: 40, borderRadius: '50%'}, ref:"comp", src:"images/cs.jpg"} )
      )
    )
  }
});

var awesome = React.renderComponent(
  Alchemy( {data:postsList} ), 
  document.getElementById('alchemy'));


