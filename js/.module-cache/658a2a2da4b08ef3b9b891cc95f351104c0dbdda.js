
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
  },
  handleMouse: function(event) {
    //console.log("x: "+event.clientX+" y: "+event.clientY);

  },
  handleInput: function(event) {
    var input = event.target.value;
    var width = this.props.container.clientWidth - 120;
    if (input <= width && input > 0)
      this.setState({value: event.target.value});
    //if (input == 0)
      //this.setState({value: 0});
  },
  
  render: function() {
    
    var value = this.state.value;
    var width = (this.props.container) ? this.props.container.clientWidth-120 : '';
    var input = React.DOM.input( {id:"textInput", type:"text", className:"form-control", value:value, onChange:this.handleInput} )
    var paragraph = React.DOM.p( {id:"awesome", className:"text-center lead"}, "Min: 0 Current: ", value, " Max: ", width)
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

/*
  Showdown
*/
var converter = new Showdown.converter();

var MarkdownEditor = React.createClass({displayName: 'MarkdownEditor',
  getInitialState: function() {
    return {value: 'Type some *markdown* here!'};
  },
  handleChange: function() {
    this.setState({value: this.refs.textarea.getDOMNode().value});
  },
  render: function() {
    return (
      React.DOM.div( {className:"container-fluid brdr"}, 
        React.DOM.div( {className:"input"}, 
          React.DOM.h3(null, "Input"),
          React.DOM.textarea(
            {className:"markdown",
            onChange:this.handleChange,
            ref:"textarea",
            defaultValue:this.state.value} )
        ),
        React.DOM.div( {className:"output"}, 
          React.DOM.h3(null, "Output"),
          React.DOM.div(
            {className:"content",
            dangerouslySetInnerHTML:{
              __html: converter.makeHtml(this.state.value)
            }}
          )
        ) 
      )
    );
  }
});

var showman = React.renderComponent(
  MarkdownEditor(null ), 
  document.getElementById('showdownDiv'));

