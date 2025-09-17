import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Firebase config from  Firebase project
const firebaseConfig = {
  apiKey: "AIzaSyAFPsxnVxMzFufGu2WSACFssDphc4dq1do",
  authDomain: "web-app-86f54.firebaseapp.com",
  projectId: "web-app-86f54",
  storageBucket: "web-app-86f54.appspot.com",  
  messagingSenderId: "115095530324",
  appId: "1:115095530324:web:33e839df8adb72ec0076c1",
  measurementId: "G-BC3KQ9QQZ3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

console.log("Firebase Initialized", app);

export { db };
export default app;
