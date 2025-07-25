import React, { useEffect, useState } from 'react'
import { addbudget } from '../controller/incomecontroller';



const MonthlyExpense = ({isSpendingPlan,setIsSpendingPlan}) => {
  const [formData,setFormData]=useState({
    date: '',
    paymentMethod: '',
    amountAllocated: '',
    amountSpent: '',
    category: '',
  })

 
  const handleChange=(e)=>{
    const {name,value}=e.target;
    setFormData((prev)=>({...prev,[name]:value}))
  }

  const handleSubmit=async (e)=>{
      e.preventDefault();
      try {
       const res=await addbudget( formData );
       alert("Expense added successfully:", res);
        
        setFormData({
          date: '',
          paymentMethod: '',
          amountAllocated: '',
          amountSpent: '',
          category: '',
        })
      } catch (error) {
        console.log("Error adding expense:", error);
        
      }
      console.log(formData);
      
  }
  return (
   <div className="w-full px-10 py-10">
      <h2 className="font-alfa text-rich text-4xl mb-8">Log Expense</h2>
    <form onSubmit={handleSubmit} className='bg-white p-8 rounded-xl shadow-lg  flex flex-col gap-6'>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8 ">
        {/* Date */}
        <label className="text-lg font-medium text-gray-700 font-abritl">
          Date:
          <input
            type="date"
            name='date'
            value={formData.date}
            onChange={(e)=>handleChange(e)}
            className="mt-2 w-full py-3 px-4 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white focus:outline-none focus:ring-flow focus:border-rich cursor-pointer"
          />
        </label>

        
        {/* Payment Method */}
        <label className="text-lg font-medium text-gray-700 font-abritl">
          Payment Method:
          <select className="mt-2 w-full py-3 px-4 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white focus:outline-none focus:ring-flow focus:border-rich cursor-pointer" name='paymentMethod' value={formData.paymentMethod} onChange={(e)=>handleChange(e)}>
            {formData.paymentMethod ==="" && <option value="">Select Payment Method</option>}
            <option value="Bank Transfer">Bank Transfer</option>
            <option value="Cash">Cash</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Debit Card">Debit Card</option>
          </select>
        </label>

        {/*  Amount Allocated */}
        <label className="text-lg font-medium text-gray-700 font-abritl">
          Amount Allocated:
          <input
            type="number"
            min={0}
            className="mt-2 w-full py-3 px-4 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white focus:outline-none focus:ring-flow focus:border-rich cursor-pointer [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
            name='amountAllocated'
            value={formData.amountAllocated}
            onChange={(e)=>handleChange(e)}
          />
        </label>

          {/*  Amount spent */}
        <label className="text-lg font-medium text-gray-700 font-abritl">
          Amount spent:
          <input
            type="number"
            min={0}
            className="mt-2 w-full py-3 px-4 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white focus:outline-none focus:ring-flow focus:border-rich cursor-pointer [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
            name='amountSpent' 
            value={formData.amountSpent}
            onChange={(e)=>handleChange(e)}
          />
        </label>


        {/* Category */}
        <label className="text-lg font-medium text-gray-700 font-abritl">
          Category:
          <select className="mt-2 w-full py-3 px-4 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white focus:outline-none focus:ring-flow focus:border-rich cursor-pointer" name='category' value={formData.category} onChange={(e)=>handleChange(e)}>
            {formData.category ==="" &&<option value="">Select Category</option>}
            
            <option value="Housing">Housing</option>
            <option value="Food">Food</option>
            <option value="Transportation">Transportation</option>
            <option value="Utilities& Bills">Utilities & Bills</option>
            <option value="Health & Medical">Health & Medical</option>
            <option value="Education">Education</option>
            <option value="Personal&Lifestyle">Personal & Lifestyle</option>
            <option value="Entertainment">Entertainment</option>
             <option value="Debt Repayment">Debt Repayment</option>
             

          </select>
        </label>

     

        
      </div>
      <div className=' flex items-center justify-center gap-4 mt-6 font-abritl'>
            <button className='bg-rich text-white p-3 w-36 rounded cursor-pointer hover:bg-rich/90 transition-all duration-500' >Add</button>
            <button className='bg-rich text-white p-3 w-36 rounded cursor-pointer  hover:bg-rich/90 transition-all duration-500' onClick={()=>{setIsSpendingPlan(!isSpendingPlan)}}>Cancel</button>
        </div>
      </form>
    </div>
  )
}

export default MonthlyExpense

