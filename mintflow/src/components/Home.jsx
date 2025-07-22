import React from 'react'
import Navbar from './Navbar'
import Budget from './Budget'
import Income from './Income'
import AddIncome from './AddIncome'
import ExpenseChart from './ExpenseChart'
import Report from './Report'
import { Outlet, Route, Routes } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <Navbar/>
     
        <Outlet/>
     
    </div>
  )
}

export default Home
