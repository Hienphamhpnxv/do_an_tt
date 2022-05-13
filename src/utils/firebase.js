// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAjk0IlTnSuhV7pwiTYz0ZpmOaBnrL_mCw",
  authDomain: "haui-management.firebaseapp.com",
  projectId: "haui-management",
  storageBucket: "haui-management.appspot.com",
  messagingSenderId: "756368564787",
  appId: "1:756368564787:web:558a09ac2984af142cf946",
  measurementId: "G-KPYJV2VNBK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export const firebaseInstance = {
  storage,
};
