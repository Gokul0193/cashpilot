import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { handleSignup } from '../controller/authcontroller'

const Signup = ({setIsClick}) => {
  const [name,setName]=useState('')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')

  const signup=async(e)=>{
    e.preventDefault();
    try {
      
      const res=await handleSignup(name,email,password);
      alert(res.message);
      setEmail('');
      setName('');
      setPassword('');
    } catch (error) {
      alert( 'An error occurred during signup');
    }
  }
  return (
    <div >
        <h2 className="text-4xl font-semibold mb-6 text-center text-gray-800">Register On <span className='font-oswald text-flow'>Cash<span className='text-rich font-oswald'>Pilot</span></span></h2>
      <form  onSubmit={signup}  className='w-96 p-6 rounded-lg sahdow-lg font-abritl '>

     <input  className="w-full bg-transparent border my-3 border-gray-500/30 outline-none rounded-full py-2.5 px-4" type="text" placeholder="Enter your Name" value={name} required onChange={(e)=>{setName(e.target.value)}}/>
    <input id="email" className="w-full bg-transparent border my-3 border-gray-500/30 outline-none rounded-full py-2.5 px-4" type="email" placeholder="Enter your email" value={email} required onChange={(e)=>{setEmail(e.target.value)}}/>

   <input id="password" className="w-full bg-transparent border mt-1 border-gray-500/30 outline-none rounded-full py-2.5 px-4" type="password" placeholder="Enter your password" value={password} required onChange={(e)=>{setPassword(e.target.value)}}/>
   
    <button type="submit" className="w-full mb-3 bg-rich py-2.5 rounded-full text-white cursor-pointer mt-5">Register</button>
    <p className="text-center mt-4">Have already an account? <a className="text-rich underline cursor-pointer" onClick={()=>setIsClick(false)}>Login</a></p>
</form>
    </div>
  )
}

export default Signup
