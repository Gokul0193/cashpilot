import React from 'react'

const Report = () => {
  return (
    <div className='flex flex-col items-center  min-h-screen bg-gray-100 py-10 px-40'>
      <div className='w-full border-2 border-gray-200 bg-white p-8 rounded-lg shadow-lg '>
        <div className='border-b-2 border-gray-200 pb-4 mb-6'>
            <h2 className='font-oswald  text-4xl mb-3'>Income/Expense Report</h2>
            <p className='font-abritl text-lg'>Generated on :</p>

        </div>
        
     

        <div className="flex flex-col ">
            <div className="-m-1.5 overflow-x-auto">
                <div className="p-1.5 min-w-full inline-block align-middle">
                    <div className="overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700 border-2 border-gray-200">
                            <thead>
                                <tr className='border-b-2 border-gray-200  '>
                                    <th className='text-start pl-3 py-4 font-oswald text-lg'>Income Total : <span>$12500</span></th>
                                </tr>
                                <tr className='text-center font-abritl text-flow text-lg'>
                                    <th scope="col" className="px-6 py-3 text-center  font-medium  uppercase ">Category</th>
                                    <th scope="col" className="px-6 py-3 text-center  font-medium uppercase">Total Amount</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr className="odd:bg-white even:bg-rich even:text-white text-center font-oswald text-xl">
                                    <td className="px-6 py-4 whitespace-nowrap  ">Salary</td>
                                    <td className="px-6 py-4 whitespace-nowrap ">$130</td>
                                </tr>

                                <tr className="odd:bg-white even:bg-rich even:text-white text-center font-oswald text-xl">
                                     <td className="px-6 py-4 whitespace-nowrap  ">Freelance</td>
                                     <td className="px-6 py-4 whitespace-nowrap ">$130</td>
                                 </tr>
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
                                    <th className='text-start pl-3 py-4 font-oswald text-lg'>Expenses Total : <span>$12500</span></th>
                                </tr>
                                <tr className='text-center font-abritl text-flow text-lg'>
                                    <th scope="col" className="px-6 py-3 text-center  font-medium  uppercase ">Category</th>
                                    <th scope="col" className="px-6 py-3 text-center  font-medium uppercase">Total Amount</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr className="odd:bg-white even:bg-rich even:text-white text-center font-oswald text-xl">
                                    <td className="px-6 py-4 whitespace-nowrap  ">Salary</td>
                                    <td className="px-6 py-4 whitespace-nowrap ">$130</td>
                                </tr>

                                <tr className="odd:bg-white even:bg-rich even:text-white text-center font-oswald text-xl">
                                     <td className="px-6 py-4 whitespace-nowrap  ">Freelance</td>
                                     <td className="px-6 py-4 whitespace-nowrap ">$130</td>
                                 </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <div className='bg-rich w-full mt-5 p-4'>
            <p className='text-white text-center font-abritl'>Net Balance : <span className='text-white'>$12500</span></p>
        </div>
      </div>
    </div>
  )
}

export default Report
