import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfigAPI = import.meta.env.VITE_FIREBASE_CONFIG_API
const firebaseConfigAUTH = import.meta.env.VITE_FIREBASE_CONFIG_AUTH
const firebaseConfigPROJECT = import.meta.env.VITE_FIREBASE_CONFIG_PROJECT
const firebaseConfigSTORAGE = import.meta.env.VITE_FIREBASE_CONFIG_STORAGE
const firebaseConfigMESSAGING = import.meta.env.VITE_FIREBASE_CONFIG_MESSAGING
const firebaseConfigAPPID = import.meta.env.VITE_FIREBASE_CONFIG_APPID
const firebaseConfigMEASUREMENT = import.meta.env.VITE_FIREBASE_CONFIG_MEASUREMENT

const firebaseConfig = {
  apiKey: firebaseConfigAPI,
  authDomain: firebaseConfigAUTH,
  projectId: firebaseConfigPROJECT,
  storageBucket: firebaseConfigSTORAGE,
  messagingSenderId: firebaseConfigMESSAGING,
  appId: firebaseConfigAPPID,
  measurementId: firebaseConfigMEASUREMENT
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
const analytics = getAnalytics(appFirebase);

const db = getFirestore(appFirebase);
const auth = getAuth(appFirebase);
const storage = getStorage(appFirebase);


export {db, auth, storage, };