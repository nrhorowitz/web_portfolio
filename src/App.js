import React, { Component } from 'react';
import ReactGA from 'react-ga';
import $ from 'jquery';
import './App.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import About from './Components/About';
import Resume from './Components/Resume';
import Contact from './Components/Contact';
import Photo from './Components/Testimonials';
import Portfolio from './Components/Portfolio';

import firebase from './Components/Firebase';

var pendingRequests = {}
class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      foo: 'bar',
      resumeData: {},
      localData: {}
    };

    ReactGA.initialize('UA-110570651-1');
    ReactGA.pageview(window.location.pathname);

    this.data = this.data.bind(this);
  }

  getResumeData(){
    $.ajax({
      url:'/resumeData.json',
      dataType:'json',
      cache: false,
      success: function(data){
        this.setState({resumeData: data});
      }.bind(this),
      error: function(xhr, status, err){
        console.log(err);
        alert(err);
      }
    });
  }

  componentDidMount(){
    this.getResumeData();
  }

  data(tree, id) {
    if ((tree + id) in pendingRequests) {
      return;
    }
    var current = this.state.localData;
    if (current[tree] === undefined) {
      current[tree] = {};
    }
    if (current[tree][id] === undefined) {
      pendingRequests[tree + id] = true;
      firebase.firestore().collection(tree).doc(id).get().then(doc => {
        if (!doc.exists) {
          console.log('No such document!');
        } else {
          delete pendingRequests[tree + id];
          current[tree][id] = doc.data();
          this.setState({localData: current});
          return null;
        }
      }).catch(err => {
        console.log('Error getting document', err);
      });
    }
    return current[tree][id];
  }

  render() {
    return (
      <div className="App">
        <Header data={this.state.resumeData.main}/>
        
        <About data={this.state.resumeData.main}/>
        
        <Resume data={this.state.resumeData.resume}/>
        
        {/*<Portfolio data={this.state.resumeData.portfolio}/>*/}
        
        <Photo 
          data={this.state.resumeData.testimonials}
          firebase={firebase}
          data={this.data}
        />
        <Contact data={this.state.resumeData.main}/>
        <Footer data={this.state.resumeData.main}/>
      </div>
    );
  }
}

export default App;
