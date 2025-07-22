// src/components/MultipleBarChart.jsx
import React from 'react';
import Chart from 'react-apexcharts';

const BarChart = () => {
  const options = {
    chart: {
      type: 'bar',
      height: 300,
      toolbar: { show: false },
      zoom: { enabled: false }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '14px',
        borderRadius: 0
      }
    },
    dataLabels: { enabled: false },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    xaxis: {
      categories: [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ],
      labels: {
        style: {
          colors: '#9ca3af',
          fontSize: '13px',
          fontFamily: 'Inter, ui-sans-serif',
          fontWeight: 400
        },
        offsetX: -2,
        formatter: (title) => title.slice(0, 3)
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
      crosshairs: { show: false }
    },
    yaxis: {
      labels: {
        style: {
          colors: '#9ca3af',
          fontSize: '13px',
          fontFamily: 'Inter, ui-sans-serif',
          fontWeight: 400
        },
        formatter: (value) => value >= 1000 ? `${value / 1000}k` : value
      }
    },
    tooltip: {
      y: {
        formatter: (value) =>
          `$${value >= 1000 ? `${value / 1000}k` : value}`
      }
    },
    colors: ['#4A4E69', '#C9ADA7']
  };

  const series = [
    {
      name: 'Amount spent',
      data: [23000, 44000, 55000, 57000, 56000, 61000, 58000, 63000, 60000, 66000, 34000, 78000]
    },
    {
      name: 'Amount Remaining',
      data: [17000, 76000, 85000, 101000, 98000, 87000, 105000, 91000, 114000, 94000, 67000, 66000]
    }
  ];

  return <Chart options={options} series={series} type="bar" height={300} />;
};

export default BarChart;
