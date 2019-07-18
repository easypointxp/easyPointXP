import * as firebase from "firebase"

const firebaseConfig = {
    apiKey: "AIzaSyDZkYTSUiZZmrhLxPc-SWJKrKSxG8Lf7ds",
    authDomain: "easypointxpbr.firebaseapp.com",
    databaseURL: "https://easypointxpbr.firebaseio.com",
    projectId: "easypointxpbr",
    storageBucket: "",
    messagingSenderId: "371123852905",
    appId: "1:371123852905:web:da7a49c5bc842383"
  };
 
export default class FireBase{

    static auth; 

    static init(){
        firebase.initializeApp(firebaseConfig);
        FireBase.auth = firebase.auth();
    }
}