import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import "./MultiSelectDropdown.css";

const MultiSelectDropdown = () => {
  const [options, setOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await fetch('https://coreapi.hectorai.live/api/day-parting/DayPartingPerformanceGraphList', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OGI0ZTNhN2Y1YmU4ZDY2MjVlN2I0MiIsImZ1bGxOYW1lIjoiU3lzdGVtIFRlc3QiLCJlbWFpbCI6InRlc3RAZGV2LmNvbSIsInNlc3Npb25JZCI6InJhbmRvbVN0cmluZyIsImlhdCI6MTcyMDQwNjQzNH0.oo2gUHroTcJ7X-I0-hNvtuG4tq6sGL2yr4Veaf37JPc',
            'X-USER-IDENTITY': 'U2FsdGVkX1/s3KYiwn1BdNtI1nNitQYbPVGs5G6NloO7PVGlCBTzYpJzAOD/8GaIp30IcvyKuBArXvm5xNN+gOhrSx51l49Ejxan4p7mt1vAUIE6/O277AUuMZVIMsmOtF5YGyaGkyDk9bMjArr3ekLdCKAZu9xXN/b92jqFqXb2jy4tbQbp8UUQxgywAWk1gR4dSb/vaJt4oEIeh0EWuEc4xU2NVdGSedANzYRqUEatsdtRYbNbdkZMt9koQcKO55/Y6fGafYUCztvkASn6i8WyPIxXMq6vf+xo4IYXeOh2WP8WgH/cQgq6V74Fnl82KYtUvGzWVMXpm2rrhsHewJptgJvJY+NinV05HdRJGtXQ1SN3/IhqyJZJhTb/TcO5SkDa8dIGfwgcciGspOofrA==',
          },

        });

        const data = await response.json();
        console.log('Full API Response:', data);

        if (data.success && Array.isArray(data.result)) {
          const metricsOptions = data.result.map(metric => ({
            value: metric.id,
            label: metric.name,
          }));
          setOptions(metricsOptions);
        } else {
          console.error('No valid result found:', data);
        }
      } catch (error) {
        console.error('Error fetching metrics:', error);
      }
    };

    fetchMetrics();
  }, []);

  const handleChange = (selected) => {
    setSelectedOptions(selected);
    console.log('Selected options:', selected);
  };

  return (

    
    <div className='selecter_wrapper'>
      <div className='selecter_info'>
         <h5>Performance chart</h5>
          <p>Key performance for Dayprinting Schedule Performance Evaluation</p>
       </div>
       <div className='selecter'>
        <Select  
       isMulti
       options={options}
       value={selectedOptions}
       onChange={handleChange}
       placeholder="Select metrics..."
     />
    </div>
  </div>
  );
};

export default MultiSelectDropdown;
