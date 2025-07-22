import React, { useState } from 'react'
import Login from './Login'
import Signup from './Signup'

const Begin = () => {
  const [isClick,setIsClick]=useState(false)
  return (
    <div className=' flex items-center justify-between' >
        <div className='bg-flow h-screen w-1/2 text-center flex items-center justify-center font-alfa'>
            <h1 className='text-mint'>Cash<span className='text-rich'>Pilot</span></h1>
        </div>
        <div className='flex items-center  pt-15 justify-center w-1/2 h-screen'>
           {
            isClick ? (<Signup setIsClick={setIsClick}/>):(<Login setIsClick={setIsClick}/> )
            
          } 
           
        </div>
        
      
    </div>
  )
}

export default Begin
