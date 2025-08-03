import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyDGQJ0cO3EZyp-ntixUNBpwifPkG62821Y",
  authDomain: "career-pathfinder-a3a24.firebaseapp.com",
  databaseURL: "https://career-pathfinder-a3a24-default-rtdb.firebaseio.com",
  projectId: "career-pathfinder-a3a24",
  storageBucket: "career-pathfinder-a3a24.firebasestorage.app",
  messagingSenderId: "10439379670",
  appId: "1:10439379670:web:0841c5b49ac9e2aab8d777",
  measurementId: "G-9K6ETHCGXK"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);