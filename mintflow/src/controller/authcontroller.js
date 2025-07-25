import axios from 'axios';

import { signupWithEmail,loginWithEmail,loginWithGoogle,getIdToken,logout } from '../model/authmodel';


const BASE_URL='http://localhost:5000/cashpilot-e346e/us-central1/api/auth/';


export const getAuthHeader=async()=>{
    const token=await getIdToken();
    return {Authorization: `Bearer ${token}`};
}

export const handleSignup= async (name,email,password)=>{
    await signupWithEmail(email,password);
    const headers=await getAuthHeader();
    const res=await axios.post(`${BASE_URL}signup`,{name,email},{headers})
    return res.data;

}

export const handleLogin=async (email,password)=>{
    await loginWithEmail(email,password);
    const headers=await getAuthHeader();
    const res=await axios.get(`${BASE_URL}login`,{headers});
    return res.data;
}

export const handleGoogleLogin=async()=>{
    await loginWithGoogle();
    const headers =await getAuthHeader();
    const res=await axios.get(`${BASE_URL}login`,{headers});
    localStorage.setItem('user',JSON.stringify(res.data))
    return res.data;
    
    
}

export const handleLogout=async()=>{
    await logout();
    localStorage.removeItem('user');
}

