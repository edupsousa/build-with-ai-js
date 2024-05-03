// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCnqYU9dT3OLUagUsPrR1gwQ7K3O3HnKfU",
  authDomain: "build-with-ai-js.firebaseapp.com",
  projectId: "build-with-ai-js",
  storageBucket: "build-with-ai-js.appspot.com",
  messagingSenderId: "526849588450",
  appId: "1:526849588450:web:c8e88bb20a2258e300b2bb",
  measurementId: "G-JRFSMMKSRS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.languageCode = 'pt-BR'

if (import.meta.env.DEV) {
  connectAuthEmulator(auth, 'http://localhost:9099');
}

export { auth };