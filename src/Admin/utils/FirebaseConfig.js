import { initializeApp } from "firebase/app";
import { getStorage} from 'firebase/storage'



const firebaseConfig = {
  apiKey: "AIzaSyBW_LnWmvAprS_7eKl6y9NwumLA0og4PQg",
  authDomain: "e-commerce-web-cf8f0.firebaseapp.com",
  projectId: "e-commerce-web-cf8f0",
  storageBucket: "e-commerce-web-cf8f0.appspot.com",
  messagingSenderId: "207745803744",
  appId: "1:207745803744:web:09d9d1dff0b19660b23785"
};


const app = initializeApp(firebaseConfig);

export const storage = getStorage(app)