import app from "firebase/app"
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDAc0vof0sC6OkLkkeY__-ZOF5mhFTJrfY",
    authDomain: "logincuc.firebaseapp.com",
    projectId: "logincuc",
    storageBucket: "logincuc.appspot.com",
    messagingSenderId: "860008370910",
    appId: "1:860008370910:web:66b874cce57424c7cce84f",
    measurementId: "G-488DWF991W"
  };
  
  app.initializeApp(firebaseConfig);
  const db = app.firestore();
  const auth = app.auth();
  export { db, auth }