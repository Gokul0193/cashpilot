import { createUserWithEmailAndPassword,signInWithEmailAndPassword,signInWithPopup } from "firebase/auth";

import {auth,googleProvider} from '../firebase/firebase';

export const signupWithEmail=async(email,password)=>{
    await createUserWithEmailAndPassword(auth,email,password);
}

export const loginWithEmail=async(email,password)=>{
    await signInWithEmailAndPassword(auth,email,password)
}

export const loginWithGoogle=async()=>{
    await signInWithPopup(auth,googleProvider)
}

export const getIdToken=async()=>{
    const user=auth.currentUser;
    return user ? await user.getIdToken():null;
}

export const logout=async()=>{
    try {
         await auth.signOut();
         console.log("User logged out successfully");
         
    } catch (error) {
        log("Error logging out:", error);
    }
   
}
