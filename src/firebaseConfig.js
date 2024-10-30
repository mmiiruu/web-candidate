import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyD_6bM36cmmwdUZa1v5Koxy7p_uwoyNDnw",
  authDomain: "livescoreboard-8039f.firebaseapp.com",
  databaseURL:
    "https://livescoreboard-8039f-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "livescoreboard-8039f",
  storageBucket: "livescoreboard-8039f.appspot.com",
  messagingSenderId: "903658219153",
  appId: "1:903658219153:web:b4ecd61426e5d2dd0a0130",
  measurementId: "G-B4YFHX2GHM",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // สร้าง auth instance
const database = getDatabase(app); // สร้าง database instance

// Export auth และ database เพื่อให้คอมโพเนนต์อื่น ๆ ใช้งานได้
export { auth, database };
