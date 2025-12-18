
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import  { GoogleAuthProvider  , getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyDNq3HHrkvU0Jj-YGoXq_s64m4Tn-gcHA0",
  authDomain: "ecommerce-82d9d.firebaseapp.com",
  projectId: "ecommerce-82d9d",
  storageBucket: "ecommerce-82d9d.firebasestorage.app",
  messagingSenderId: "348111213910",
  appId: "1:348111213910:web:05effaf7474101172f32f7",
  measurementId: "G-041EPVETW6"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider =new  GoogleAuthProvider()
export {auth, provider}