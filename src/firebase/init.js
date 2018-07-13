import firebase from 'firebase';
import firestore from 'firebase/firestore';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyDcOddrHNLMm_ppBjBFUOX7idwvBO8BMBc",
  authDomain: "udemy-geo-location.firebaseapp.com",
  databaseURL: "https://udemy-geo-location.firebaseio.com",
  projectId: "udemy-geo-location",
  storageBucket: "udemy-geo-location.appspot.com",
  messagingSenderId: "1078458786811"
};

const firebaseApp = firebase.initializeApp(config);
firebaseApp.firestore().settings({ timestampsInSnapshots: true });
export default firebaseApp.firestore();
