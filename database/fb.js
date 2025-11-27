import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA_-T5wwWRX8edniW7SSR8BzPpkSILZYtA",
  authDomain: "financetracker-c6a3b.firebaseapp.com",
  projectId: "financetracker-c6a3b",
  storageBucket: "financetracker-c6a3b.firebasestorage.app",
  messagingSenderId: "1012843730624",
  appId: "1:1012843730624:web:9805bae3a9570f51e13f25",
  measurementId: "G-JR30K1G9HD"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);


const   dbContext = getFirestore(app);

export { dbContext };