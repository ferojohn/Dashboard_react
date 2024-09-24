import React from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import TopBar from '../../components/Topbar/TopBar';
import HeatmapChart from '../../components/HeatChart/HeatmapChart';
import LineChart from '../../components/LineChart/LineChart'
import './Dashboard.css';

const Dashboard = () => {

  return (
    <div className='dashboard-container'>
      <Sidebar />
      <div className='content'>
        <TopBar />
        <div className='dashboard-content'>
          <LineChart/>
          <div>
          <HeatmapChart/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
