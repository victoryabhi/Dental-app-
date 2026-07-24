import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';

const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID || "ai-based-pulp-capping";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBmN9L8BPv4K4S1S_klXVG92aqYXfX38Bg",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || `${projectId}.firebaseapp.com`,
  projectId: projectId,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || `${projectId}.firebasestorage.app`,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "28420093444",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:28420093444:web:ced9e174a44bc39ffda751",
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL || `https://${projectId}-default-rtdb.firebaseio.com`,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-XNKY26S2RC"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app, firebaseConfig.databaseURL);
export const storage = getStorage(app);

export default app;
