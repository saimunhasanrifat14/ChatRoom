// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDXMn1VnXbDbMMH5R4qdXoYJTwhLTHmYtQ",
  authDomain: "chatroom-c1d94.firebaseapp.com",
  projectId: "chatroom-c1d94",
  storageBucket: "chatroom-c1d94.firebasestorage.app",
  messagingSenderId: "1068440533192",
  appId: "1:1068440533192:web:b5e078549f80c0a88d4dfd",
  measurementId: "G-D3Z9PKZ6CG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;