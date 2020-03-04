import * as firebase from 'firebase'

var config = {
    apiKey: "AIzaSyCoVYE8jjU3DzObJzAo8Xx-vak2BahEM8w",
    authDomain: "codec-485c4.firebaseapp.com",
    databaseURL: "https://codec-485c4.firebaseio.com",
    projectId: "codec-485c4",
    storageBucket: "codec-485c4.appspot.com",
    messagingSenderId: "203451086780",
    appId: "1:203451086780:web:08bff787de39fffb0fddb9",
    measurementId: "G-CQZFNN0SL8"
  };

export const firebaseApp = firebase.initializeApp(config);