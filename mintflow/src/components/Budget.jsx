import React, { useEffect, useState } from 'react'
import BarChart from './Barchart'
import MonthlyExpense from './MonthlyExpense'
import { getbudget } from '../controller/incomecontroller'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/firebase';

const Budget = () => {
    const [isSpendingPlan,setIsSpendingPlan] = useState(false)
    const [name,setName]=useState("")
    const [budgetData, setBudgetData] = useState([]);

  useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (user) => {
    if (user) {
      const parsedUser = JSON.parse(localStorage.getItem('user'));
      setName(parsedUser ? parsedUser.userdata.name : 'User');

      try {
        const data = await getbudget();
        setBudgetData(data);
        console.log(data);
      } catch (err) {
        console.error('Error fetching budget:', err);
      }
    } else {
      console.warn('User not logged in.');
    }
  });

  return () => unsubscribe(); // cleanup on unmount
}, []);

  

    console.log(localStorage.getItem('user'));
    
    
  return (
<div className='flex flex-col gap-10 p-10 '>
        
              
    {
        !isSpendingPlan ?
        (
            <div>
                    <div className='flex flex-col gap-10 '>
        <div className='flex items-center justify-between'>
            <h2 className='font-abritl text-rich'>Hello <span className='text-flow'>  {name} !</span></h2>
             <button className='font-oswald cursor-pointer text-rich font-semibold text-lg text-center hover:bg-rich hover:text-white transition-all duration-500  w-40 h-11 rounded border-2 border-rich ' onClick={()=>{setIsSpendingPlan(!isSpendingPlan)}}>
                        Spending Plan
            </button>
        </div>
        
        <div className="flex flex-col">
            <div className="-m-1.5 overflow-x-auto">
                <div className="p-1.5 min-w-full inline-block align-middle">
                    <div className="overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700 border-2 border-gray-200">
                            <thead>
                                <tr className='text-center font-abritl text-flow text-lg'>
                                    <th scope="col" className="px-6 py-3 text-center  font-medium  uppercase ">Date</th>
                                    <th scope="col" className="px-6 py-3 text-center  font-medium  uppercase ">Category</th>
                                    <th scope="col" className="px-6 py-3 text-center  font-medium uppercase">Amount Allocated</th>
                                    <th scope="col" className="px-6 py-3 text-center  font-medium  uppercase">Amount Spent</th>
                                    <th scope="col" className="px-6 py-3 text-center  font-medium  uppercase">Amount Remaining</th>
                                </tr>
                            </thead>

                            <tbody>
                            

                               {
                                    budgetData?.map((item, index) => (
                                        <tr key={index} className="odd:bg-white even:bg-rich even:text-white text-center font-oswald text-xl">
                                            <td className="px-6 py-4 whitespace-nowrap">{item.date}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{item.category}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">${item.amountAllocated}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">${item.amountSpent}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">${item.amountRemaining}</td>
                                        </tr>
                                    ))
                               }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>

    {/* Chart */}
     <div className="mt-10">
       

            <BarChart/>
        </div>
            </div> 
        )
        :
        (
            <MonthlyExpense isSpendingPlan={isSpendingPlan} setIsSpendingPlan={setIsSpendingPlan}/>
        )
    }

    
    
    
  

        

</div>
      
      

  )
}

export default Budget
