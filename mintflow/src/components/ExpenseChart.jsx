import React from 'react'
import ReactApexChart from 'react-apexcharts'

const ExpenseChart = () => {
  const series = [
    {
      name: 'Outcome',
      data: [27000, 38000, 60000, 77000, 40000, 50000, 49000, 29000, 42000, 27000, 42000, 50000]
    }
  ]

  const options = {
    chart: {
      height: 300,
      type: 'area',
      toolbar: { show: false },
      zoom: { enabled: false }
    },
    dataLabels: { enabled: false },
    stroke: {
      curve: 'smooth',
      width: 2
    },
    fill: {
      type: 'gradient',
      gradient: {
        type: 'vertical',
        shadeIntensity: 1,
        opacityFrom: 0.1,
        opacityTo: 0.8
      }
    },
    grid: {
      strokeDashArray: 2,
      borderColor: '#e5e7eb'
    },
    xaxis: {
      type: 'category',
      categories: [
        '25 Jan', '26 Jan', '27 Jan', '28 Jan', '29 Jan', '30 Jan',
        '31 Jan', '1 Feb', '2 Feb', '3 Feb', '4 Feb', '5 Feb'
      ],
      labels: {
        style: {
          colors: '#9ca3af',
          fontSize: '15px',
          fontFamily: 'Inter, ui-sans-serif',
          fontWeight: 400,
         
        }
      },
      axisBorder: { show: false },
      axisTicks: { show: false }
    },
    yaxis: {
      labels: {
        style: {
          colors: '#9ca3af',
          fontSize: '15px',
          fontFamily: 'Inter, ui-sans-serif',
          fontWeight: 400,
          
        },
        formatter: (value) => (value >= 1000 ? `${value / 1000}k` : value)
      }
    },
    tooltip: {
      y: {
        formatter: (value) => `$${value >= 1000 ? `${value / 1000}k` : value}`
      }
    },
    colors: ['#4A4E69'] // Purple for Outcome
  }

  return (
    <div className="bg-white p-4 rounded-xl shadow-md mt-10">
      <h2 className="text-3xl font-semibold font-oswald text-gray-700 mb-4">Expense Overview</h2>
      <ReactApexChart options={options} series={series} type="area" height={480} />
    </div>
  )
}

export default ExpenseChart
