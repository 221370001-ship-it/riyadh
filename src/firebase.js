import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCSDeaTB3vaCLfO5f-a8FyXEorGq4Uruy4",
  authDomain: "riyadh-chamber.firebaseapp.com",
  projectId: "riyadh-chamber",
  storageBucket: "riyadh-chamber.firebasestorage.app",
  messagingSenderId: "610741823420",
  appId: "1:610741823420:web:171c334915366762f4adb9",
  measurementId: "G-9FW3ZFY4T2"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
