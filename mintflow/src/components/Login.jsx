import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { handleGoogleLogin, handleLogin } from '../controller/authcontroller'

const Login = ({setIsClick}) => {
  const navigate=useNavigate()


  const [email,setEmail]=useState('')
   const [password,setPassword]=useState('')

   const login=async(e)=>{
    e.preventDefault();
    try {
      const res=await handleLogin(email,password);
      console.log(res);
      alert('Login successful:', res.useedata.name);
      setEmail('');
      setPassword('');
      navigate('/home');
      
    } catch (error) {
      console.log('Login failed:', error);
      
    }
   }

     const googleLogin=async()=>{
      try{
        const res=await handleGoogleLogin();
        alert('Google login successful:', res);
        navigate('/home');
         console.log(res);
        
      }
      catch(error){
        console.log('Google login failed:', error);
      }
    }
  return (
    <div className='w-96 p-6 rounded-lg sahdow-lg '>
        <h2 className='text-flow text-center mb-10 font-oswald text-5xl'>Welcome back</h2>
       <form onSubmit={login} className='font-abritl'>
        <input id="email" className="w-full bg-transparent border my-3 border-gray-500/30 outline-none rounded-full py-2.5 px-4" type="email" placeholder="Enter your email" value={email} required onChange={(e)=>setEmail(e.target.value)}/>
        <input id="password" className="w-full bg-transparent border mt-1 border-gray-500/30 outline-none rounded-full py-2.5 px-4" type="password" placeholder="Enter your password" value={password} required onChange={(e)=>setPassword(e.target.value)}/>
        <div className="text-right py-4">
            <a className="text-rich underline" href="#">Forgot Password</a>
        </div>
        <button type="submit" className="w-full mb-3 bg-rich py-2.5 rounded-full text-white cursor-pointer" >Log in</button>
    </form>
     <p className="text-center mt-4 text-rich font-abritl">Don’t have an account? <a  className="text-flow underline cursor-pointer" onClick={()=>setIsClick(true)}>Signup</a></p>
      <button type="button" className="w-full flex items-center gap-2 justify-center my-3 bg-white border border-gray-500/30 py-2.5 rounded-full text-rich font-abritl" onClick={()=>googleLogin()}>
        <img className="h-4 w-4" src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleFavicon.png" alt="googleFavicon"/>
        Log in with Google
    </button>
       
    </div>
  )
}

export default Login
