import firebase from "firebase";


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB-ydrV_NEcwAHUa-whnQdHVloW2k2VVdQ",
    authDomain: "app-1-1a49b.firebaseapp.com",
    projectId: "app-1-1a49b",
    storageBucket: "app-1-1a49b.appspot.com",
    messagingSenderId: "88270019530",
    appId: "1:88270019530:web:765817fe7faec7100b8d33",
    measurementId: "G-LNVRTYK0YJ"
  };


firebase.initializeApp(firebaseConfig)


const auth = firebase.auth()

export default auth