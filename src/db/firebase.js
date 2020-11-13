import firebase from 'firebase';

firebase.initializeApp({
  apiKey: "AIzaSyA8IjIXj8oKzpeNPzNb87mSB2GrfYIQ22c",
  authDomain: "fir-auth-c91a1.firebaseapp.com",
  databaseURL: "https://fir-auth-c91a1.firebaseio.com",
  projectId: "fir-auth-c91a1",
  storageBucket: "fir-auth-c91a1.appspot.com",
  messagingSenderId: "92877570975",
  appId: "1:92877570975:web:3e270fbb2cb681cba033aa",
  measurementId: "G-JB0NZ4TZSW"
});

var fireDb = firebase.database();
console.log('firebase:', firebase);
console.log('fireDb:', fireDb);

export { firebase, fireDb };