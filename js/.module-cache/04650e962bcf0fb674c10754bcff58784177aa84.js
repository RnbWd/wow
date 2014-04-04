
/** @jsx React.DOM */

/*
  Showdown
*/
var converter = new Showdown.converter();

var MarkdownEditor = React.createClass({displayName: 'MarkdownEditor',
  getInitialState: function() {
    return {value: 'Type some *markdown* here!', github: ''};
  },
  handleChange: function() {
    this.setState({
      value: this.refs.textarea.getDOMNode().value,
      //height: this.refs.textcontent.getDOMNode().clientHeight
    });
  },
  handleClick: function() {

  },
  render: function() {
    var github = this.state.github;
    var input = React.DOM.input( {id:"textInput", type:"text", className:"form-control", value:github, onChange:this.handleInput} )
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
            ref:"textcontent",
            dangerouslySetInnerHTML:{
              __html: converter.makeHtml(this.state.value)
            }}
          )
        ), 
        React.DOM.button( {className:"btn btn-default submit", onClick:this.handleClick}, "Submit")
      )
    );
  }
});

var showman = React.renderComponent(
  MarkdownEditor(null ), 
  document.getElementById('showdownDiv'));







/*
var t1 = [];

var Center = React.createClass({
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
    var input = <input id="textInput" type="text" className="form-control" value={value} onChange={this.handleInput} />
    var paragraph = <p id="awesome" className="text-center lead">Min: 0 Current: {value} Max: {width}</p>
    var boxStyle = {left: value}
    return (
      <div ref="container" className="container-fluid brdr" onWheel={this.handleScroll} >
      <h1>Gibberish Playground</h1>
          {input}
          {paragraph}
          <Box style={boxStyle}/>
      </div>
    );
  }
});
var Box = React.createClass({
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
      <div className="box btn" style = {style}>
      </div>
    );
  }
});

var avatar = React.renderComponent(
  <Center />,
  document.getElementById("reactDiv")
);
*/
