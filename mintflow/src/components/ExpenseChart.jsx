import React, { useEffect, useRef, useState } from 'react'
import ReactApexChart from 'react-apexcharts'
import { getSpent } from '../controller/incomecontroller'

const ExpenseChart = () => {
  const [series, setSeries] = useState([{ name: 'Outcome', data: [] }])
  const [categories, setCategories] = useState([])
  const [todayIndex, setTodayIndex] = useState(-1)
  const [zoomRange, setZoomRange] = useState({})
  const chartWrapperRef = useRef(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getSpent()
        const data = res || []

        const today = new Date()
        const year = today.getFullYear()
        const startDate = new Date(year, 0, 1)
        const tomorrow = new Date(today)
        tomorrow.setDate(tomorrow.getDate() + 1)

        const fullDates = []
        let d = new Date(startDate)
        while (d <= tomorrow) {
          fullDates.push(new Date(d))
          d.setDate(d.getDate() + 1)
        }

        const expenseMap = {}
        data.forEach(item => {
          const key = new Date(item.date).toISOString().split('T')[0]
          expenseMap[key] = (expenseMap[key] || 0) + item.amount
        })

        const chartData = []
        const chartLabels = []
        fullDates.forEach(date => {
          const key = date.toISOString().split('T')[0]
          const label = `${date.getDate()} ${date.toLocaleString('default', { month: 'short' })}`
          chartLabels.push(label)
          chartData.push(expenseMap[key] || 0)
        })

        setSeries([{ name: 'Outcome', data: chartData }])
        setCategories(chartLabels)

        const todayLabel = `${today.getDate()} ${today.toLocaleString('default', { month: 'short' })}`
        const index = chartLabels.findIndex(label => label === todayLabel)
        setTodayIndex(index)

        // Zoom to current month
        const currentMonth = today.toLocaleString('default', { month: 'short' })
        const startMonthIndex = chartLabels.findIndex(label => label.includes(currentMonth))
        const endMonthIndex = chartLabels.findLastIndex(label => label.includes(currentMonth))
        setZoomRange({ min: startMonthIndex, max: endMonthIndex })

        setTimeout(() => scrollToToday(chartLabels), 500)
      } catch (err) {
        console.error('Failed to fetch chart data', err)
      }
    }

    fetchData()
  }, [])

  const scrollToToday = (labels) => {
    const today = new Date()
    const todayLabel = `${today.getDate()} ${today.toLocaleString('default', { month: 'short' })}`
    const index = labels.findIndex(label => label === todayLabel)
    if (index !== -1 && chartWrapperRef.current) {
      const scrollX = index * 30 - 100
      chartWrapperRef.current.scrollTo({ left: scrollX, behavior: 'smooth' })
    }
  }

  const scrollChart = (direction) => {
    if (chartWrapperRef.current) {
      const amount = 400
      chartWrapperRef.current.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: 'smooth' })
    }
  }

  const options = {
    chart: {
      type: 'area',
      zoom: {
        enabled: true,
        autoScaleYaxis: true
      },
      toolbar: {
        show: true,
        tools: {
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true
        }
      }
    },
    annotations: {
      xaxis: [
        // Today's vertical line
        todayIndex !== -1
          ? {
              x: categories[todayIndex],
              borderColor: '#FF5733',
              label: {
                style: { color: '#fff', background: '#FF5733' },
                text: 'Today'
              }
            }
          : null,
        // Current month shading
        zoomRange.min !== undefined && zoomRange.max !== undefined
          ? {
              x: categories[zoomRange.min],
              x2: categories[zoomRange.max],
              fillColor: '#c3dafe',
              opacity: 0.2,
              label: {
                text: 'This Month',
                style: {
                  background: 'transparent',
                  color: '#4a5568'
                }
              }
            }
          : null
      ].filter(Boolean)
    },
    markers: {
      size: 4,
      colors: ['#4A4E69'],
      strokeColor: '#fff',
      strokeWidth: 2,
      hover: { size: 6 }
    },
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth', width: 2 },
    fill: {
      type: 'gradient',
      gradient: {
        type: 'vertical',
        shadeIntensity: 1,
        opacityFrom: 0.1,
        opacityTo: 0.8
      }
    },
    xaxis: {
      type: 'category',
      categories: categories,
      labels: {
        rotate: -45,
        style: {
          fontSize: '10px',
          colors: '#9ca3af'
        }
      },
      min: zoomRange.min,
      max: zoomRange.max
    },
    yaxis: {
      labels: {
        style: {
          colors: '#9ca3af',
          fontSize: '12px'
        },
        formatter: (value) => value >= 1000 ? `${value / 1000}k` : value
      }
    },
    tooltip: {
      y: {
        formatter: (value) => `$${value >= 1000 ? `${value / 1000}k` : value}`
      }
    },
    grid: { borderColor: '#e5e7eb' },
    colors: ['#4A4E69']
  }

  return (
    <div className="bg-white p-4 rounded-xl shadow-md mt-10 relative">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        Daily Expense Overview ({new Date().getFullYear()})
      </h2>

      <button
        onClick={() => scrollChart('left')}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full z-10 hover:bg-gray-300"
      >
        ◀
      </button>
      <button
        onClick={() => scrollChart('right')}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full z-10 hover:bg-gray-300"
      >
        ▶
      </button>

      <div ref={chartWrapperRef} className="overflow-x-auto">
        <div style={{ minWidth: `${categories.length * 30}px` }}>
          <ReactApexChart options={options} series={series} type="area" height={400} />
        </div>
      </div>
    </div>
  )
}

export default ExpenseChart
