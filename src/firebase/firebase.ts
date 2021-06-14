import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyCUxBEjfu7VPZHJdP3ZQpwO7pRG0ApPWz8",
      authDomain: "midly-tz.firebaseapp.com",
      databaseURL: "https://midly-tz-default-rtdb.europe-west1.firebasedatabase.app",
      projectId: "midly-tz",
      storageBucket: "midly-tz.appspot.com",
      messagingSenderId: "198328581682",
      appId: "1:198328581682:web:989cbf263c80ece7a7c62b"
  }
  
  export default firebase.initializeApp(firebaseConfig);