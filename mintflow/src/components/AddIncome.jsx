// src/components/AddIncome.jsx
import React, { useState  } from 'react'

import { addincome } from '../controller/incomecontroller'


const AddIncome = ({isaddIncome,setIsAddIncome}) => {

  
  const [formData,setFormData]=useState({
    date:'',
    Amount:'',
    PaymentMethod:'',
    Category:'',
    Frequency:''

  })



  const onhandleChange=(e)=>{
    const {name,value}=e.target
    setFormData(prev=>({...prev,[name]:value}))
  }

  const handleSubmit=async(e)=>{
     e.preventDefault();
          try {
           const res=await addincome( formData );
           alert("income added successfully:", res);
            
            setFormData({
                    date:'',
                    Amount:'',
                    PaymentMethod:'',
                    Category:'',
                    Frequency:''

                    })
                   

          } catch (error) {
            console.log("Error adding income:", error);
            
          }
          console.log(formData);
  }

 

  return (
    <div className="w-full px-10 py-10">
      <h2 className="font-alfa text-rich text-4xl mb-8">Add Income</h2>
    <form onSubmit={handleSubmit} className='bg-white p-8 rounded-xl shadow-lg  flex flex-col gap-6'>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8 ">
        {/* Date */}
        <label className="text-lg font-medium text-gray-700 font-abritl">
          Date:
          <input
            type="date"
            name='date'
            value={formData.date}
            onChange={(e)=>onhandleChange(e)}
            className="mt-2 w-full py-3 px-4 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white focus:outline-none focus:ring-flow focus:border-rich cursor-pointer"
          />
        </label>

        {/* Amount */}
        <label className="text-lg font-medium text-gray-700 font-abritl">
          Amount:
          <input
            type="number"
            name='Amount'
            value={formData.Amount}
            onChange={(e)=>onhandleChange(e)}
            min={0}
            className="mt-2 w-full py-3 px-4 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white focus:outline-none focus:ring-flow focus:border-rich cursor-pointer [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
          />
        </label>

        {/* Payment Method */}
        <label className="text-lg font-medium text-gray-700 font-abritl">
          Payment Method:
          <select className="mt-2 w-full py-3 px-4 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white focus:outline-none focus:ring-flow focus:border-rich cursor-pointer" name='PaymentMethod'
            value={formData.PaymentMethod}
            onChange={(e)=>onhandleChange(e)}>
            <option value="" disabled hidden>Select Method</option>
           
            <option value="Bank Transfer">Bank Transfer</option>
            <option value="Cash">Cash</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Debit Card">Debit Card</option>
          </select>
        </label>

        {/* Category */}
        <label className="text-lg font-medium text-gray-700 font-abritl">
          Category:
          <select className="mt-2 w-full py-3 px-4 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white focus:outline-none focus:ring-flow focus:border-rich cursor-pointer"  name='Category'
            value={formData.Category}
            onChange={(e)=>onhandleChange(e)}>
              <option value="" disabled hidden>Select Category</option>
            
            <option value="Salary">Salary</option>
            <option value="Freelance">Freelance</option>
            <option value="Investment">Investment</option>
          </select>
        </label>

        {/* Frequency */}
        <label className="text-lg font-medium text-gray-700 font-abritl">
          Frequency:
          <select className="mt-2 w-full py-3 px-4 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white focus:outline-none focus:ring-flow focus:border-rich cursor-pointer" name='Frequency'
            value={formData.Frequency}
            onChange={(e)=>onhandleChange(e)}>
              <option value="" disabled hidden>Select Frequency</option>
           
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
            <option value="Yearly">Yearly</option>
          </select>
        </label>

        
      </div>
      <div className=' flex items-center justify-center gap-4 mt-6 font-abritl'>
            <button className='bg-rich text-white p-3 w-36 rounded cursor-pointer hover:bg-rich/90 transition-all duration-500'>Add</button>
            <button className='bg-rich text-white p-3 w-36 rounded cursor-pointer  hover:bg-rich/90 transition-all duration-500' onClick={()=>{setIsAddIncome(!isaddIncome)}}>Cancel</button>
        </div>
      </form>
    </div>
  )
}

export default AddIncome
