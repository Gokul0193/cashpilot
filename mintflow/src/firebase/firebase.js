import {initializeApp} from 'firebase/app';
import{getAuth ,GoogleAuthProvider} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBoy93v33_UvKl44_506YxNhFGVFavnE0k",
  authDomain: "cashpilot-e346e.firebaseapp.com",
  projectId: "cashpilot-e346e",
  storageBucket: "cashpilot-e346e.firebasestorage.com",
  messagingSenderId: "71803141557",
  appId: "1:71803141557:web:94394b9d9739b7b44f2dfc"
};

const app=initializeApp(firebaseConfig);
const auth=getAuth(app);
const googleProvider=new GoogleAuthProvider();

export {auth,googleProvider}