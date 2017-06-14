import * as firebase from "firebase"

const config = {
  apiKey: "AIzaSyBoVxlksUhUf47HSxcoKnw1CoOdMQ_EPIs",
  authDomain: "justbit-support.firebaseapp.com",
  databaseURL: "https://justbit-support.firebaseio.com",
  projectId: "justbit-support",
  storageBucket: "justbit-support.appspot.com",
  messagingSenderId: "794178785094"
};

firebase.initializeApp(config)

export const firebaseDatabase = firebase.database();

export default firebase
