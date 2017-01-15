import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyA2p1X8zRbnEDdG6dOnHqeRsrDKNWG50qA',
  authDomain: 'quiz-5bbfa.firebaseapp.com',
  databaseURL: 'https://quiz-5bbfa.firebaseio.com',
  storageBucket: "quiz-5bbfa.appspot.com",
  messagingSenderId: "501213638866"
};

firebase.initializeApp(config);
const database = firebase.database();

export default database;