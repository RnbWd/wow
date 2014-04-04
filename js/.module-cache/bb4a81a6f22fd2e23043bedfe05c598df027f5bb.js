
/** @jsx React.DOM */

/*
  Showdown
*/
//var converter = new Showdown.converter();
var navTween;
var outputTween;
var leftTween;
var Token = Backbone.Model.extend({
  defaults: {
    token: ''
  }
});
var AuthToken = Backbone.Collection.extend({
  model: Token,
  localStorage: new Backbone.LocalStorage("localStore")
});
var token = new Token();
var auth = new AuthToken();
auth.fetch();
if (auth.length < 1)
  auth.add(token);
    
var MarkdownEditor = React.createClass({displayName: 'MarkdownEditor',
  getInitialState: function() {
    return {
      value: '', 
      github: auth.first().get('token'), 
      path: '', 
      sha: '', 
      limit: '', 
      remaining: '', 
      layout: '', 
      title: '',
      edit: 0
    };
  },
  componentDidMount: function() {
     if (this.state.github != '') {
      this.handleSignin();
      //this.getPost(posts[0].path);
      //this.setState({title: posts[0].title});
     }
    
     this.props.nav = document.getElementById('contentNav');
     
     this.props.leftLink = document.getElementById('linkLeft');
     TweenLite.to(this.props.leftLink, 0, {autoAlpha: 0});
    
   
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
          var love = response.content.replace(/\s/g, '');
          var auto = atob(love);
          var split = auto.split("---");
          if (split.length < 2) {
            self.setState({value: auto, path: response.path, sha: response.sha});
          } else {
            self.setState({value: split[2].trim(), layout: split[1].trim(), path: response.path, sha: response.sha});
          }
          console.log(split);
          //console.log(eval(self.state.layout));
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
          self.setProps({signin: 'in', login: response.login});
          auth.first().save({'token': self.state.github});
          $('#contentNav').show();
          $('#contentNav a:first-child').click();
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
         data: JSON.stringify({"path": this.state.path, "message": "hello", "content": btoa("---\n"+this.state.layout+"\n---\n"+this.state.value), "sha": this.state.sha}),
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
  handleEdit: function() {
    this.setState({edit: 1});
    this.props.input = this.refs.input.getDOMNode();
     this.props.output = this.refs.output.getDOMNode();
   
    navTween = TweenLite.to(this.props.nav, 1, {left: "-100%", force3D: true});
    outputTween = TweenLite.to(this.props.output, 0.5, {left: "51%", width: "48%", force3D: true});    
    leftTween = TweenLite.to(this.props.leftLink, 0.5, {autoAlpha: 0.7, force3D: true});
  },
  handleAll: function() {
      this.setState({edit: 0});

     if (navTween && outputTween) {
      navTween.reverse();
      outputTween.reverse();
      leftTween.reverse();
      console.log('on');
     }
  },
  handleAuth: function(event) {
   this.setState({github: event.target.value});
   console.log('test');
  },
  handleScrolls: function(event) {
    this.props.output.scrollTop = event.target.scrollTop;
  },
  handleLayout: function(event) {
   this.setState({layout: event.target.value});
  },
  render: function() {
    var inputStyle;
    var outputStyle;
    var value = this.state.value;
    var github = this.state.github;
    var path = this.state.path;
    var login = this.props.login;
    var auth = React.DOM.input( {type:"text", className:"form-control", value:github, onChange:this.handleAuth} )
    var name = React.DOM.input( {type:"text", className:"form-control", value:path, onChange:this.handleName} )
    var btn =  React.DOM.button( {className:"btn btn-default submit pull-right", onClick:this.handleSignin}, "Submit")
    var commit =  React.DOM.button( {className:"btn btn-default navbar-btn navbar-right", onClick:this.handleCommit}, "Commit")
    var edit = React.DOM.button( {onClick:this.handleEdit, className:"btn btn-default navbar-btn navbar-left"}, "Edit Post")
    var all = React.DOM.button( {onClick:this.handleAll, className:"btn btn-default navbar-btn navbar-left"}, "All Post")

    //var layout =  <div><textarea value={this.state.layout} onChange={this.handleLayout} /></div>
    if (this.state.edit === 0) {
      inputStyle = {display: 'none', visibility: 'hidden'};
    } else if (this.state.edit === 1) {
      inputStyle = {display: 'inline-block'}
    }
    if (this.props.signin == '') {
      return (
        React.DOM.div( {className:"container-fluid brdr"}, 
         Signin( {btn:btn, auth:auth} )
        )
      )
    } else {
    return (
      React.DOM.div( {className:""}, 
        React.DOM.nav( {className:"navbar navbar-default"}, 
        React.DOM.a( {href:"/", className:"navbar-left navbar-btn btn"}, "Home"),
        React.DOM.p( {className:"navbar-text navbar-right"} , "Logged in as: ", login, " Limit: ", this.state.limit, " Remaining: ", this.state.remaining),
        all,
        edit,
          React.DOM.input( {type:"text", style:{textAlign: "center", fontSize: "28px", fontWeight: "bold"}, className:"form-control navbar-form navbar-left", value:this.state.title} ),
          commit
          ),
          React.DOM.div( {ref:"input", style:inputStyle, className:"input"}, 
            React.DOM.textarea(
              {className:"markdown form-control",
              onScroll:this.handleScrolls,
              onChange:this.handleChange,
              ref:"textarea",
              value:value} )
            ),
          React.DOM.div( {ref:"output", className:"output"}, 
            React.DOM.div(
              {className:"",
              ref:"textcontent",
              dangerouslySetInnerHTML:{
                __html: marked(value)
              }}
            )
          )
        
       
      )
    );
  }
  }
});

var Signin = React.createClass({displayName: 'Signin',
 
  componentDidMount: function() {
     //this.props.style = {background: "teal", width: 100, height: 100};
     //this.forceUpdate();
  },
  handleClick: function() {
    var self = this;
    if (self.props.style.width < 150)
      var tween = new TweenLite.to(self.props.style, 2, {width:200, onComplete: function() {console.log(self.props.style)}, onUpdate: function(){self.forceUpdate()}});
    if (self.props.style.width > 150)
      var tween = new TweenLite.to(self.props.style, 2, {width:100, onComplete: function() {console.log(self.props.style)}, onUpdate: function(){self.forceUpdate()}});

  },
  render: function() {
    return (
      React.DOM.div( {className:"container-fluid brdr github"}, 
        React.DOM.div(null, 
        React.DOM.h3(null, title),
          this.props.auth,
          this.props.btn 
        )
      )
    )
  }
});

editor = React.renderComponent(
  MarkdownEditor( {signin:""} ), 
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
