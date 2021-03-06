
/** @jsx React.DOM */
var t1 = [];
var Center = React.createClass({displayName: 'Center',
 getInitialState: function() {
    return {value: "432"}
  },
  componentDidMount: function() {
    //var audioSource = Gibberish.context.createMediaElementSource(this.refs.myAudio.getDOMNode());
    //modulator = new Gibberish.RingModulation({ input:audioSource, frequency:1000, synthmp:.4, mix:1 });
    //modulator.connect();
  },
  handleScroll: function(event) {
    if(event.deltaY < 800) {
      //t1.push(Math.floor(event.deltaY));
      var note = Math.floor(event.deltaY/4);
      var changa = parseInt(this.state.value) + note;
      (changa > 100 && changa < 3000) ? this.setState({value: changa}) : '';
    }
  },
  handleMouse: function(event) {
    //console.log("x: "+event.clientX+" y: "+event.clientY);

  },
  handleInput: function(event) {
    var input = event.target.value;
    //console.log(input);
    //if (input < 3000 && input > 100)
      this.setState({value: event.target.value});
  },
  
  render: function() {
    var value = this.state.value;
    var input = React.DOM.input( {id:"textInput", type:"text", className:"form-control", value:value, onChange:this.handleInput} )
    var paragraph = React.DOM.p( {id:"awesome", className:"text-center lead"}, "Frequency: ", value)
    return (
      React.DOM.div( {className:"container-fluid", onWheel:this.handleScroll} , 
      React.DOM.h1(null, "Gibberish Playground"),
          input,
          paragraph
      )
    )
  }
});

var avatar = React.renderComponent(
  Center(null ),
  document.getElementById("reactDiv")
);


