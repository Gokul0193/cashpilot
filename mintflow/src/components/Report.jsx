import React, { useEffect, useState } from 'react'
import { getbudget, getincome } from '../controller/incomecontroller'

const Report = () => {

     const [categorySummary, setCategorySummary] = useState([]);
  const [totalExpense, setTotalExpense] = useState(0);
  const [categorySummaryIncome, setCategorySummaryIncome] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [now,setNow]=useState('')


    useEffect(()=>{
        const fetchExpense= async()=>{
            const res= await getbudget()
            console.log("report",res);
            const data=res || [];

            const now=new Date();
            setNow(now.toLocaleDateString())
            const currentmonth=now.getMonth()+1;
            const currentYear=now.getFullYear();

            const filteredData=data.filter(item=>{
                const date=new Date(item.date);
                return(date.getFullYear()==currentYear && date.getMonth()+1==currentmonth);
                
            });

            const categoryMap={}

            filteredData.forEach(item => {
                const category=item.category|| 'Uncategorized';
                const spent=parseFloat(item.amountSpent)||0

                if (categoryMap[category]){
                    categoryMap[category]+=spent
                }else{
                     categoryMap[category]=spent
                }
            });

            const categoryList=Object.entries(categoryMap).map(([category,totalSpent])=>({
                category,
                totalSpent

            }))

            const total=categoryList.reduce((sum,item)=>sum+item.totalSpent,0)
            setCategorySummary(categoryList);
      setTotalExpense(total);

      console.log("categoryList",categoryList);
      console.log("total",total);
    
        }

          const fetchIncome=async()=>{
            const res= await getincome()
            console.log("income",res);
            const data=res || [];

            const today=new Date();
            const getYear=today.getFullYear();
            const getmonth=today.getMonth()+1;

            const filterdData=data.filter(item=>{
                const date=new Date(item.date);

                return (date.getFullYear()==getYear && date.getMonth()+1==getmonth)
            })

           const categoryMap={}

            filterdData.forEach(item=>{
                const category=item.Category|| 'Uncategorized';
                const Amount=item.Amount||0;

                if (categoryMap[category]) {
                    categoryMap[category]+=Amount
                }else{
                    categoryMap[category]=Amount
                }

            })

            const categoryList=Object.entries(categoryMap).map(([category,totalIncome])=>({
                category,
                totalIncome

            }))

            const total=categoryList.reduce((sum,item)=>sum+item.totalIncome,0)
             setCategorySummaryIncome(categoryList);
      setTotalIncome(total);

            console.log("totalIncome",total);
            console.log(categorySummaryIncome);
            
            
        }
        fetchExpense()
        fetchIncome()

       
    },[])

    
  return (
    <div className='flex flex-col items-center  min-h-screen bg-gray-100 py-10 px-40'>
      <div className='w-full border-2 border-gray-200 bg-white p-8 rounded-lg shadow-lg '>
        <div className='border-b-2 border-gray-200 pb-4 mb-6'>
            <h2 className='font-oswald  text-4xl mb-3'>Income/Expense Report</h2>
            <p className='font-abritl text-lg'>Generated on :{now}</p>

        </div>
        
     

        <div className="flex flex-col ">
            <div className="-m-1.5 overflow-x-auto">
                <div className="p-1.5 min-w-full inline-block align-middle">
                    <div className="overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700 border-2 border-gray-200">
                            <thead>
                                <tr className='border-b-2 border-gray-200  '>
                                    <th className='text-start pl-3 py-4 font-oswald text-lg'>Income Total : <span>{totalIncome} /-</span></th>
                                </tr>
                                <tr className='text-center font-abritl text-flow text-lg'>
                                    <th scope="col" className="px-6 py-3 text-center  font-medium  uppercase ">Category</th>
                                    <th scope="col" className="px-6 py-3 text-center  font-medium uppercase">Total Amount</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    categorySummaryIncome.map((item,index)=>{
                                        return  <tr key={index} className="odd:bg-white even:bg-rich even:text-white text-center font-oswald text-xl">
                                    <td className="px-6 py-4 whitespace-nowrap  ">{item.category}</td>
                                    <td className="px-6 py-4 whitespace-nowrap ">{item.totalIncome} /-</td>
                                </tr>
                                    })
                                }
                               

                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>


        <div className="flex flex-col mt-10">
            <div className="-m-1.5 overflow-x-auto">
                <div className="p-1.5 min-w-full inline-block align-middle">
                    <div className="overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700 border-2 border-gray-200">
                            <thead>
                                <tr className='border-b-2 border-gray-200  '>
                                    <th className='text-start pl-3 py-4 font-oswald text-lg'>Expenses Total : <span>{totalExpense}  /-</span></th>
                                </tr>
                                <tr className='text-center font-abritl text-flow text-lg'>
                                    <th scope="col" className="px-6 py-3 text-center  font-medium  uppercase ">Category</th>
                                    <th scope="col" className="px-6 py-3 text-center  font-medium uppercase">Total Amount</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    categorySummary.map((item,index)=>{
                                        return   <tr key={index} className="odd:bg-white even:bg-rich even:text-white text-center font-oswald text-xl">
                                    <td className="px-6 py-4 whitespace-nowrap  ">{item.category}</td>
                                    <td className="px-6 py-4 whitespace-nowrap ">{item.totalSpent } /-</td>
                                </tr>
                                    })
                                }
                              

                               
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <div className='bg-rich w-full mt-5 p-4'>
            <p className='text-white text-center font-abritl'>Net Balance : <span className='text-white'>{parseFloat(totalIncome)-parseFloat(totalExpense)} /-</span></p>
        </div>
      </div>
    </div>
  )
}

export default Report
