import React, { Component } from 'react';
import './App.css';
import uuid from 'uuid';
import firebase from 'firebase';

var config = {
  apiKey: "AIzaSyBAfOLtHUPnrTS1qu6HEG30Gz6KNq3aJDA",
  authDomain: "simplesurvey-90f47.firebaseapp.com",
  databaseURL: "https://simplesurvey-90f47.firebaseio.com",
  projectId: "simplesurvey-90f47",
  storageBucket: "simplesurvey-90f47.appspot.com",
  messagingSenderId: "385103098542"
};

firebase.initializeApp(config);

class App extends Component {


  constructor(props){
    super(props);
    this.state = {
      id: uuid.v1(),
      name: '',
      answers: {
        q1: '',
        q2: '',
        q3: '',
        q4: ''
      },
      submitted: false
    }

    this.handleQuestionChange = this.handleQuestionChange.bind(this)
  }

  handleNameSubmit(event){
    event.preventDefault();
    var name = this.refs.name.value
    this.setState({
      name: name
    }, function(){
      console.log(this.state);
    })
    console.log(this.state);
  }

  handleQuestionSubmit(event){
    event.preventDefault();
    firebase.database().ref('surverys/'+this.state.id).set({
      name: this.state.name,
      answers: this.state.answers
    });
    this.setState({submitted: true}, function(){
      console.log('submitted');
    });
  }

  handleQuestionChange(event){
    var answers = this.state.answers;
    if(event.target.name === 'q1') {
      answers.q1 = event.target.value;
    } else if (event.target.name === 'q2') {
      answers.q2 = event.target.value;
    } else if (event.target.name === 'q3') {
      answers.q3 = event.target.value;
    } else if (event.target.name === 'q4') {
      answers.q4 = event.target.value;
    }
    this.setState({
      answers: answers
    }, function () {
      console.log(this.state);
    })
  }

  render() {
    var user;
    var questions;

    if (this.state.name && this.state.submitted === false ) {
      user = (
              <h2>Welcome {this.state.name}</h2>
      )
      questions = (
                    <span>
                      <h3>Survery questions</h3>
                      <form onSubmit={this.handleQuestionSubmit.bind(this)}>
                        <div>
                          <label>What is your favorite operating system?</label><br />
                          <input type='radio' name='q1' value='Windows' onChange={this.handleQuestionChange} /> Window <br />
                          <input type='radio' name='q1' value='OSX' onChange={this.handleQuestionChange} /> OSX <br />
                          <input type='radio' name='q1' value='Linux' onChange={this.handleQuestionChange} /> Linux <br />
                          <input type='radio' name='q1' value='Solaris' onChange={this.handleQuestionChange} /> Solaris <br />
                          <input type='radio' name='q1' value='Other' onChange={this.handleQuestionChange} /> Other <br />
                        </div>
                        <div>
                          <label>What is your favorite brand of TV?</label><br />
                          <input type='radio' name='q2' value='Sony' onChange={this.handleQuestionChange} /> Sony <br />
                          <input type='radio' name='q2' value='Samsung' onChange={this.handleQuestionChange} /> Samsung <br />
                          <input type='radio' name='q2' value='Panasonic' onChange={this.handleQuestionChange} /> Panasonic <br />
                          <input type='radio' name='q2' value='Vizzio' onChange={this.handleQuestionChange} /> Vizzio <br />
                          <input type='radio' name='q2' value='Other' onChange={this.handleQuestionChange} /> Other <br />
                        </div>
                        <div>
                          <label>What is your favorite Smartphone Brand?</label><br />
                          <input type='radio' name='q3' value='Apple' onChange={this.handleQuestionChange} /> Apple <br />
                          <input type='radio' name='q3' value='Samsung' onChange={this.handleQuestionChange} /> Samsung <br />
                          <input type='radio' name='q3' value='Nexus' onChange={this.handleQuestionChange} /> Nexus <br />
                          <input type='radio' name='q3' value='Blackberry' onChange={this.handleQuestionChange} /> Blackberry <br />
                          <input type='radio' name='q3' value='Other' onChange={this.handleQuestionChange} /> Other <br />
                        </div>
                        <div>
                          <label>What is your favorite Food?</label><br />
                          <input type='radio' name='q4' value='Noodles' onChange={this.handleQuestionChange} /> Noodles <br />
                          <input type='radio' name='q4' value='Burgers' onChange={this.handleQuestionChange} /> Burgers <br />
                          <input type='radio' name='q4' value='Milkshake' onChange={this.handleQuestionChange} /> Milkshake <br />
                          <input type='radio' name='q4' value='Chips' onChange={this.handleQuestionChange} /> Chips <br />
                          <input type='radio' name='q4' value='Other' onChange={this.handleQuestionChange} /> Other <br />
                        </div>
                        <button className='btn btn-primary'>Submit</button>
                      </form>
                    </span>
      )
    } else if (!this.state.name && this.state.submitted === false ) {

      user = <span>
              <h2>
                Please enter your name to begin the survey
              </h2>
              <form onSubmit={this.handleNameSubmit.bind(this)}>
                <input type='text' placeholder='Enter name...' ref='name' />
              </form>
             </span>
             questions = '';

    } else if (this.state.submitted === true ) {

      user = <h2>Thank you {this.state.name}</h2>
    }

    return (
      <div className="App">
        <div className='App-header'>
          <h2>Simple Survey</h2>
        </div>
        <div className='text-center'>
          {user}
        </div>
        <div className='container'>
          {questions}
        </div>
      </div>
    );
  }
}

export default App;
