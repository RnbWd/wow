
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
    console.log(input);
    if (input < 3000 && input > 100)
      this.setState({value: event.target.value});
  },
  
  play: function() {
    synth.note(this.state.value);
  },
  microphone: function() {
    var a = new Gibberish.Input();
    delay = new Gibberish.Delay({ input:a, time:22050, feedback:.50 }).connect();
  },
  render: function() {
    var value = this.state.value;
    var input = React.DOM.input( {id:"textInput", type:"text", className:"form-control", value:value, onChange:this.handleInput} )
    var paragraph = React.DOM.p( {id:"awesome", className:"text-center lead"}, "Frequency: ", value)
    //var mic = <button className="btn btn-default microphone" onClick={this.microphone} >Microphone</button>
    //var audio = <audio ref="myAudio" className="player" src='../songs/deadmau5.mp3' controls></audio>;
    var play = React.DOM.button( {className:(value > 100 && value < 3000 && this.props.status) ? "btn btn-success play" : "btn btn-danger play", onClick:this.play, disabled:(value > 100 && value < 3000 && this.props.status) ? false : true} , "Play")
    return (
      React.DOM.div( {className:"container-fluid", onWheel:this.handleScroll} , 
      React.DOM.h1(null, "Gibberish Playground"),
          input,
          paragraph,
          play
      )
    )
  }
});
var Filters = React.createClass({displayName: 'Filters',
  getInitialState: function() {
    return {filter: synth, option: "a", status: "connect"}
  },
  handleFilter: function(event) {

    if (this.state.status == "disconnect") {
      this.connect();
    }

    this.setState({option: event.target.value});
    switch (event.target.value)
    {
    case "a":
      this.setState({filter: synth})
      break;
    case "b":
      this.setState({filter: distortion})
      break;
    case "c":
      this.setState({filter: delay})
      break;
    case "d":
      this.setState({filter: decimator})
      break;
    case "e":
      this.setState({filter: modulator})
      break;
    case "f":
      this.setState({filter: reverb})
      break;
    }
  },
  connect: function() {
    if (this.state.status == "connect") {
      this.state.filter.connect();
      this.setState({status: "disconnect"});
    } else {
      this.state.filter.disconnect();
      this.setState({status: "connect"});
    }
  },
   render: function() {
    var status = this.state.status;
    var connect = React.DOM.button( {className:(status == "connect") ? "btn btn-info connect" : "btn btn-warning connect", onClick:this.connect} , status)
    return (
      React.DOM.div(null, 
        Center( {status:(status == "connect") ? false : true} ),
        connect,
        React.DOM.div( {className:"filters"}, 
          React.DOM.h4(null, "Filters"),
          React.DOM.select( {className:"form-control", value:this.state.option, onChange:this.handleFilter}, 
            React.DOM.option( {value:"a"}, "None"),
            React.DOM.option( {value:"b"}, "Distortion"),
            React.DOM.option( {value:"c"}, "Delay"),
            React.DOM.option( {value:"d"}, "Decismator"),
            React.DOM.option( {value:"e"}, "Modulator"),
            React.DOM.option( {value:"f"}, "Reverb")
          )
        )
      )
    );
  }
});

var avatar = React.renderComponent(
  Filters(null ),
  document.getElementById("reactDiv")
);


