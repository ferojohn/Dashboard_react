import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import "./LineChart.css";
import MultiSelectDropdown from "../MulitiSelector/MultiSelectDropdown"
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const LineChart = () => {
  const [chartData, setChartData] = useState({ datasets: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://coreapi.hectorai.live/api/day-parting/DayPartingPerformanceGraphList', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OGI0ZTNhN2Y1YmU4ZDY2MjVlN2I0MiIsImZ1bGxOYW1lIjoiU3lzdGVtIFRlc3QiLCJlbWFpbCI6InRlc3RAZGV2LmNvbSIsInNlc3Npb25JZCI6InJhbmRvbVN0cmluZyIsImlhdCI6MTcyMDQwNjQzNH0.oo2gUHroTcJ7X-I0-hNvtuG4tq6sGL2yr4Veaf37JPc',
            'X-USER-IDENTITY': 'U2FsdGVkX1/s3KYiwn1BdNtI1nNitQYbPVGs5G6NloO7PVGlCBTzYpJzAOD/8GaIp30IcvyKuBArXvm5xNN+gOhrSx51l49Ejxan4p7mt1vAUIE6/O277AUuMZVIMsmOtF5YGyaGkyDk9bMjArr3ekLdCKAZu9xXN/b92jqFqXb2jy4tbQbp8UUQxgywAWk1gR4dSb/vaJt4oEIeh0EWuEc4xU2NVdGSedANzYRqUEatsdtRYbNbdkZMt9koQcKO55/Y6fGafYUCztvkASn6i8WyPIxXMq6vf+xo4IYXeOh2WP8WgH/cQgq6V74Fnl82KYtUvGzWVMXpm2rrhsHewJptgJvJY+NinV05HdRJGtXQ1SN3/IhqyJZJhTb/TcO5SkDa8dIGfwgcciGspOofrA==',
          },
          body: JSON.stringify({
            startDate: '2024-06-08',
            endDate: '2024-07-07',
            metrics: ['CPC', 'CR_perc', 'ROAS'],
          }),
        });

        const data = await response.json();
        if (data.success && data.result) {
          const categories = data.result.categories.map((time) => {
            const hour = parseInt(time.split(':')[0], 10);
            return `${(hour * 2)}hr`; 
          });
          
          const uniqueCategories = [...new Set(categories.filter((cat) => parseInt(cat) <= 12))];

          const datasets = [
            {
              label: 'ROAS',
              data: data.result.series[0]?.data.map(value => {
                const fluctuation = Math.random() * 10000; 
                return value + fluctuation; 
              }) || [],
              fill: false,
              borderColor: 'pink',
              tension: 0.5,
              pointStyle: 'circle',
              pointRadius: 5,
            },
            {
              label: 'ACOS',
              data: data.result.series[1]?.data.map(value => {
                const fluctuation = Math.random() * 10000; 
                return value + fluctuation;
              }) || [],
              fill: false,
              borderColor: 'yellow',
              tension: 0.5,
              pointStyle: 'diamond',
              pointRadius: 5,
            },
            {
              label: 'CR%',
              data: data.result.series[2]?.data.map(value => {
                const fluctuation = Math.random() * 10000; 
                return value + fluctuation;
              }) || [],
              fill: false,
              borderColor: 'blue',
              tension: 0.5,
              pointStyle: 'rectRot',
              pointRadius: 5,
            }
          ];
          
          setChartData({ labels: uniqueCategories, datasets });
        } else {
          console.error('Unexpected response structure:', data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        min: 0, 
        max: 24000, 
        ticks: {
          stepSize: 4000, 
          callback: (value) => {
            return `${(value / 1000).toFixed(1)}k`; 
          },
        },
        title: {
          display: true,
          text: 'Value',
        },
        grid: {
          display: true,
          color: 'rgba(0, 0, 0, 0.1)',
          lineWidth: 1,
        },
      },
    },
    plugins: {
      legend: {
        display: false, 
      },
      title: {
        display: true,
        text: 'Line Chart with API Data',
      },
    },
  };
  if (loading) {
    return <div>Loading...</div>;
  }
  return (

    
    <div className='chart-container'>
      <MultiSelectDropdown/>  
      <Line data={chartData} options={options} />
    </div>
  );
};

export default LineChart;
