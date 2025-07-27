import React, { useEffect, useState } from 'react'
import { MdOutlineModeEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";

import AddIncome from './AddIncome';
import { getincome } from '../controller/incomecontroller';
const Income = () => {
    const [isaddIncome,setIsAddIncome]=useState(false)
    const [income,setIncome]=useState([])
    useEffect(()=>{
        const fetch=async()=>{
          const data=  await getincome()
          console.log(data);
          setIncome(data)
          
        }
        fetch()
    },[])
  return (
    <div className='flex flex-col gap-10 p-10 '>
     

      {
        !isaddIncome ? 
        (
                  
                <div className="flex flex-col">
                    <div  className='flex flex-col gap-10 mb-10 '>
                        <h2 className='font-alfa text-rich'>
                            Income
                        </h2>
                        <button className='font-oswald cursor-pointer text-rich font-semibold text-lg text-center hover:bg-rich hover:text-white transition-all duration-500  w-40 h-11 rounded border-2 border-rich ' onClick={()=>{setIsAddIncome(!isaddIncome)}}>
                        Add Income
                        </button>
                    </div>

            <div className="-m-1.5 overflow-x-auto">
                <div className="p-1.5 min-w-full inline-block align-middle">
                    <div className="overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700 border-2 border-gray-200">
                            <thead>
                                <tr className='text-center font-abritl text-flow text-lg'>
                                    <th scope="col" className="px-6 py-3 text-center  font-medium   uppercase ">Date</th>
                                    <th scope="col" className="px-6 py-3   font-medium text-center uppercase ">Category</th>
                                    <th scope="col" className="px-6 py-3 text-center  font-medium uppercase">Amount</th>
                                    <th scope="col" className="px-6 py-3 text-center  font-medium  uppercase">Payment Method</th>
                                    <th scope="col" className="px-6 py-3 text-center font-medium  uppercase">Frequency</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    income.map((item,index)=>{
                                        return  <tr key={index} className="odd:bg-white even:bg-rich even:text-white text-center font-oswald text-xl">
                                            <td className="px-6 py-4 whitespace-nowrap  ">{item.date}</td>
                                            <td className="px-6 py-4 whitespace-nowrap ">{item.Category}</td>
                                            <td className="px-6 py-4 whitespace-nowrap  ">{item.Amount}</td>
                                            <td className="px-6 py-4 whitespace-nowrap ">{item.PaymentMethod}</td>
                                            <td className="px-6 py-4 whitespace-nowrap ">{item.Frequency}</td>
                                            <td className="px-6 py-4 whitespace-nowrap flex items-center justify-center gap-5 "><button className='border-2 odd:border-rich even:border-white p-2 rounded cursor-pointer'><MdOutlineModeEdit /></button> <button className='border-2 border-rich p-2 rounded cursor-pointer'><MdDeleteOutline /></button></td>
                    
                                </tr>
                                    })
                                }
                               

                                
                                 
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        )
        :
        
        (
            <AddIncome isaddIncome={isaddIncome} setIsAddIncome={setIsAddIncome} />
        )
      }
        
       
    </div>
  )
}

export default Income
