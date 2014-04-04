
/** @jsx React.DOM */
var t1 = [];

var Center = React.createClass({displayName: 'Center',
 getInitialState: function() {
    return {value: "432"}
  },
  componentDidMount: function() {
    this.props.container = this.refs.container.getDOMNode();
    //this.props.width = this.props.container.clientWidth;
  },
  componentWillUpdate: function() {
    //this.props.width = this.props.container.clientWidth;
  },
  handleScroll: function(event) {

    var width = this.props.container.clientWidth - 120;
    var note = Math.floor(event.deltaY/4);
    var changa = parseInt(this.state.value) + note;
    (changa > -1 && changa < width) ? this.setState({value: changa}) : '';
    
    console.log(this.props.container.clientWidth);
  },
  handleMouse: function(event) {
    //console.log("x: "+event.clientX+" y: "+event.clientY);

  },
  handleInput: function(event) {
    var input = event.target.value;
    var width = this.props.container.clientWidth - 120;
    if (input < width && input > -1)
      this.setState({value: event.target.value});
  },
  
  render: function() {
    
    var value = this.state.value;
    var input = React.DOM.input( {id:"textInput", type:"text", className:"form-control", value:value, onChange:this.handleInput} )
    var paragraph = React.DOM.p( {id:"awesome", className:"text-center lead"}, "Frequency: ", value)
    var boxStyle = {left: value}
    return (
      React.DOM.div( {ref:"container", className:"container-fluid brdr", onWheel:this.handleScroll} , 
      React.DOM.h1(null, "Gibberish Playground"),
          input,
          paragraph,
          Box( {style:boxStyle})
      )
    );
  }
});
var Box = React.createClass({displayName: 'Box',
  getInitialState: function() {
    return null
  },
  componentDidMount: function() {
    //var audioSource = Gibberish.context.createMediaElementSource(this.refs.myAudio.getDOMNode());
    //modulator = new Gibberish.RingModulation({ input:audioSource, frequency:1000, synthmp:.4, mix:1 });
    //modulator.connect();
  },
  render: function() {
    var style = this.props.style;
    return (
      React.DOM.div( {className:"box btn", style:  style}
      )
    );
  }
});

var avatar = React.renderComponent(
  Center(null ),
  document.getElementById("reactDiv")
);


