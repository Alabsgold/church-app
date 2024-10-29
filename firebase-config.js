// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBNvoiZc2MOFORBmJH5KcT813ICc0WkSjE",
  authDomain: "churchapp-c77e1.firebaseapp.com",
  projectId: "churchapp-c77e1",
  storageBucket: "churchapp-c77e1.appspot.com",
  messagingSenderId: "555328642443",
  appId: "1:555328642443:web:d2a5e7771fb364bcdba38e",
  measurementId: "G-LZ288D9035"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);