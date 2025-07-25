import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { getmonthlyData } from '../controller/incomecontroller'; // Make sure this function is implemented and returns correct monthly data

const BarChart = () => {
  const [chartSeries, setChartSeries] = useState([
    { name: 'Amount spent', data: [] },
    { name: 'Amount Remaining', data: [] }
  ]);

  useEffect(() => {
    const fetch = async () => {
      const data = await getmonthlyData(); // Expected: { Jan: {amountSpent, amountRemaining}, Feb: {...}, ... }
      console.log('Monthly Data:', data);

      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

      const spentData = months.map(month => data[month]?.amountSpent || 0);
      const remainingData = months.map(month => data[month]?.amountRemaining || 0);

      setChartSeries([
        { name: 'Amount spent', data: spentData },
        { name: 'Amount Remaining', data: remainingData }
      ]);
    };

    fetch();
  }, []);

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
          `$${value >= 1000 ? `${value / 1000}K` : value}`
      }
    },
    colors: ['#4A4E69', '#C9ADA7']
  };

  return <Chart options={options} series={chartSeries} type="bar" height={300} />;
};

export default BarChart;
