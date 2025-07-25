import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { handleLogout } from '../controller/authcontroller';
const Navbar = () => {
  const navigate=useNavigate();
  const onLogout = async () => {
    try {
      
      await handleLogout();
      alert("Logout successful");
      navigate('/');
    } catch (error) {
      console.log("Logout error:", error);
      
    }
    
  }
  
  return (
    <nav className="h-[70px] relative w-full px-6 md:px-16 lg:px-24 xl:px-32 flex items-center justify-between z-30 bg-gradient-to-r from-rich to-flow transition-all">
        
      <h3 className='text-mint text-4xl font-alfa'>Cash<span className='text-flow'>Pilot</span></h3>

      <ul className="text-white md:flex hidden items-center gap-10 font-abritl">
        <li><Link className="hover:text-white/70 transition cursor-pointer" to='/home/budget'>Budget</Link></li>
        <li><Link className="hover:text-white/70 transition cursor-pointer" to='/home/income'>Income</Link></li>
        <li><Link className="hover:text-white/70 transition cursor-pointer" to='/home/expense'>Expense</Link></li>
        <li><Link className="hover:text-white/70 transition cursor-pointer" to='/home/report'>Report</Link></li>
      </ul>

      <button type="button" className="bg-white text-gray-700 md:inline font-abritl hover:text-white cursor-pointer hidden text-sm hover:bg-mint/50 active:scale-95 transition-all w-40 h-11 rounded-full" onClick={()=>onLogout()}>
        Sign Out
      </button>

      <div className="mobile-menu absolute top-[70px] left-0 w-full bg-gradient-to-r from-indigo-700 to-violet-500 p-6 hidden md:hidden">
        <ul className="flex flex-col space-y-4 text-white text-lg">
          <li><Link to='/home/budget' className="text-sm">Budget</Link></li>
          <li><Link to='/home/income' className="text-sm">Income</Link></li>
          <li><Link to='/home/expense' className="text-sm">Expense</Link></li>
          <li><Link to='/home/report' className="text-sm">Report</Link></li>
        </ul>
        <button type="button" className="bg-white text-gray-700 mt-6 inline md:hidden text-sm hover:opacity-90 active:scale-95 transition-all w-40 h-11 rounded-full" >
          Sign Out
        </button>
      </div>
    </nav>
  )
}

export default Navbar
