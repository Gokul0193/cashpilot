import { useState } from 'react'
import './App.css'
import Begin from './components/Begin'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Budget from './components/Budget'
import Income from './components/Income'
import ExpenseChart from './components/ExpenseChart'
import Report from './components/Report'
import MonthlyExpense from './components/MonthlyExpense'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path='/' element={<Begin />} />
        
        <Route path='/home' element={<Home />}>
          <Route  index element={<Budget />} />
          <Route path='budget' element={<Budget />} />
          <Route path='income' element={<Income />} />
          <Route path='expense' element={<ExpenseChart/>} />
          <Route path='report' element={<Report />} />
        </Route>
      </Routes>
      
    </>
  )
}

export default App
