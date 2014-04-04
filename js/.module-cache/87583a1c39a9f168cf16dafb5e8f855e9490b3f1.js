
/** @jsx React.DOM */

/*
  Showdown
*/
var converter = new Showdown.converter();
    
var MarkdownEditor = React.createClass({displayName: 'MarkdownEditor',
  getInitialState: function() {
    return {value: 'Type some *markdown* here!', github: '', path: '', signin: '', login: '', sha: '', limit: '', remaining: ''};
  },
  componentDidMount: function() {
    var self = this;
    
  },
  handleChange: function() {
    this.setState({
      value: this.refs.textarea.getDOMNode().value,
      //height: this.refs.textcontent.getDOMNode().clientHeight
    });
  },
  getPost: function(path) {
    var self = this;
    $.ajax({
        type: "GET",
         url: "https://api.github.com/repos/RnbWd/portfolio/contents/"+path,
         headers: {
          Authorization: "token "+self.state.github
         },
         datatype: "jsonp",
         success: function(response) {
          console.log(response);
          self.setState({value: atob(response.content), path: response.path, sha: response.sha});
         },
         error: function(response) {
          console.log(response);
         }
      });
    this.rateLimit();
  },
  handleClick: function() {
    $.ajax({
        type: "PUT",
         url: "https://api.github.com/repos/RnbWd/portfolio/contents/_posts/"+this.state.path,
         headers: {
          Authorization: "token "+this.state.github
         },
         datatype: "jsonp",
         data: JSON.stringify({"path": "/_posts/"+this.state.path, "message": "hello", "content": btoa(this.state.value)}),
         success: function(response) {
          console.log(response);
         },
         error: function(response) {
          console.log(response);
         }
      });
    this.rateLimit();
  },
  handleSignin: function() {
    var self = this;
    $.ajax({
        type: "GET",
         url: "https://api.github.com/user",
         headers: {
          Authorization: "token "+ self.state.github
         },
         datatype: "jsonp",
         success: function(response) {
          console.log(response);
          self.setState({signin: 'in', login: response.login});
         },
         error: function(response) {
          console.log(response);
         }
      });
    this.rateLimit();
  },
  handleCommit: function() {
    var self = this;
    $.ajax({
        type: "PUT",
         url: "https://api.github.com/repos/RnbWd/portfolio/contents/"+this.state.path,
         headers: {
          Authorization: "token "+this.state.github
         },
         datatype: "jsonp",
         data: JSON.stringify({"path": this.state.path, "message": "hello", "content": btoa(this.state.value), "sha": this.state.sha}),
         success: function(response) {
          console.log(response);
          self.setState({sha: response.content.sha});
         },
         error: function(response) {
          console.log(response);
         }
      });
    this.rateLimit();
  },
  rateLimit:function() {
    var self = this;
    $.ajax({
        type: "GET",
         url: "https://api.github.com/rate_limit",
         headers: {
          Authorization: "token "+ self.state.github
         },
         datatype: "jsonp",
         success: function(response) {
          console.log(response);
          self.setState({limit: response.rate.limit, remaining: response.rate.remaining});
         },
         error: function(response) {
          console.log(response);
         }
      });
  },
  handleAuth: function(event) {
   this.setState({github: event.target.value});
   console.log('test');
  },
  handleName: function(event) {
   this.setState({path: event.target.value});
  },
  render: function() {
    var value = this.state.value;
    var github = this.state.github;
    var path = this.state.path;
    var login = this.state.login;
    var auth = React.DOM.input( {type:"text", className:"form-control", value:github, onChange:this.handleAuth} )
    var name = React.DOM.input( {type:"text", className:"form-control", value:path, onChange:this.handleName} )
    var btn =  React.DOM.button( {className:"btn btn-default submit", onClick:this.handleSignin}, "Submit")
    var commit =  React.DOM.button( {className:"btn btn-default submit", onClick:this.handleCommit}, "Commit")
    if (this.state.signin == '') {
      return (
        React.DOM.div( {className:"container-fluid brdr"}, 
         Signin( {btn:btn, auth:auth} )
        )
      )
    } else {
    return (
      React.DOM.div( {className:"container-fluid brdr"}, 
        "Logged in as: ", login, " Limit: ", this.state.limit, " Remaining: ", this.state.remaining,
        React.DOM.div( {className:"row"}, 
          React.DOM.div( {className:"input"}, 
            React.DOM.h3(null, "Input"),
            React.DOM.textarea(
              {className:"markdown",
              onChange:this.handleChange,
              ref:"textarea",
              value:value} )
          ),
          React.DOM.div( {className:"output"}, 
            React.DOM.h3(null, "Output"),
            React.DOM.div(
              {className:"content",
              ref:"textcontent",
              dangerouslySetInnerHTML:{
                __html: converter.makeHtml(value)
              }}
            )
          )
        ),
        commit
      )
    );
  }
  }
});

var Signin = React.createClass({displayName: 'Signin',
  render: function() {
    return (
      React.DOM.div( {className:"container-fluid brdr github"}, 
        React.DOM.div(null, 
        React.DOM.h3(null, "Authorization Code"),
          this.props.auth,
          this.props.btn 
        )
      )
    )
  }
});

var editor = React.renderComponent(
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
