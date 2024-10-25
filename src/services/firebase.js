import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyC_-_cookcBWadwqaY3Vifzl0cXhfrJwR0",
  authDomain: "proyecto-codergames.firebaseapp.com",
  projectId: "proyecto-codergames",
  storageBucket: "proyecto-codergames.appspot.com",
  messagingSenderId: "295436008016",
  appId: "1:295436008016:web:95ddd905385b1d0e9a2f55",
  measurementId: "G-0YQR14PHM0"
};


const app = initializeApp(firebaseConfig);


export const db = getFirestore(app);


const analytics = getAnalytics(app);