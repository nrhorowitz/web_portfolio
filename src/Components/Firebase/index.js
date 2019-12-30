import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAebHZFjLuhfrDQRTR78cVXMKTn-a4PWmE",
    authDomain: "nathan-horowitz.firebaseapp.com",
    databaseURL: "https://nathan-horowitz.firebaseio.com",
    projectId: "nathan-horowitz",
    storageBucket: "nathan-horowitz.appspot.com",
    messagingSenderId: "841580252798",
    appId: "1:841580252798:web:9d83bed11cd6edb75b922f",
    measurementId: "G-85P387FZZ1"
  };
firebase.initializeApp(firebaseConfig);

export default firebase;