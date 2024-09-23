import React, { useEffect, useState } from 'react';
import "./HeatmapChart.css"
const HeatmapTable = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  const formatAmount = (num) => {
    if (num === null || num === undefined) return '0';
    let formattedNum = parseFloat(num).toPrecision(6).replace('.', ',');
      return formattedNum.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const colorMapping = {
    CPC: '#5932EA',
    CR_perc: '#FFD9F3',
    ROAS: '#90DEF3'
  };

  const formatHour = (hour) => {
    let formattedHour = hour % 12 || 12;
    let period = hour < 12 ? 'AM' : 'PM';
    return `${formattedHour} ${period}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://coreapi.hectorai.live/api/day-parting/heatmap-list', {
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

        const result = await response.json();

        if (result.success && result.result) {
          const formattedData = result.result.reduce((acc, item) => {
            const dayData = item.Hourly_Data.map(hourly => [
              hourly.time_part,
              hourly.CPC || 0,
              hourly.CR_perc || 0,
              hourly.ROAS || 0,
            ]);
            acc[item.weekday] = dayData;
            return acc;
          }, {});
          setData(formattedData);
        } else {
          console.error('No valid data in response:', result);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const calculateTotals = (day) => {
    let totalCPC = 0;
    let totalCR = 0;
    let totalROAS = 0;

    if (data[day]) {
      data[day].forEach(hourData => {
        totalCPC += hourData[1] || 0;
        totalCR += hourData[2] || 0;
        totalROAS += hourData[3] || 0;
      });
    }

    return {
      totalCPC,
      totalCR,
      totalROAS,
    };
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="table-container">
      <div className='heat-map-heading'> Heat Map</div>
      <div className='sub-heading'>Select hours to schedule Dayparting</div>
      <table className="heatmap-table">
        <thead>
          <tr>
            <th>Hour</th>
            {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => (
              <th key={day} colSpan="3">{day}</th>
            ))}
          </tr>
          <tr>
            <th></th>
            {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => (
              <React.Fragment key={day}>
                <th>CPC</th>
                <th>CR%</th>
                <th>ROAS</th>
              </React.Fragment>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 24 }).map((_, hourIndex) => (
            <tr key={hourIndex}>
              <td>{formatHour(hourIndex)}</td>
              {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => (
                <React.Fragment key={day}>
                  {data[day] && data[day][hourIndex] ? (
                    <>
                      <td style={{ backgroundColor: colorMapping.CPC }}>
                        {formatAmount(data[day][hourIndex][1])}
                      </td>
                      <td style={{ backgroundColor: colorMapping.CR_perc }}>
                        {formatAmount(data[day][hourIndex][2])}
                      </td>
                      <td style={{ backgroundColor: colorMapping.ROAS }}>
                        {formatAmount(data[day][hourIndex][3])}
                      </td>
                    </>
                  ) : (
                    <>
                      <td style={{ backgroundColor: colorMapping.CPC }}>0</td>
                      <td style={{ backgroundColor: colorMapping.CR_perc }}>0</td>
                      <td style={{ backgroundColor: colorMapping.ROAS }}>0</td>
                    </>
                  )}
                </React.Fragment>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th>Totals</th>
            {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => {
              const { totalCPC, totalCR, totalROAS } = calculateTotals(day);
              return (
                <React.Fragment key={day}>
                  <td>{formatAmount(totalCPC)}</td>
                  <td>{formatAmount(totalCR)}</td>
                  <td>{formatAmount(totalROAS)}</td>
                </React.Fragment>
              );
            })}
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default HeatmapTable;
