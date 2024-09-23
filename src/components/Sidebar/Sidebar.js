import React from 'react';
import './Sidebar.css'; 
import Header from "../../assests/Header.png";
import menu from "../../assests/menu.png";
import Footer from "../../assests/Footer.png";
import Group  from "../../assests/Group.png";
import Dashboard  from "../../assests/Dashboard.png";
import sidebar_footer from "../../assests/sidebar_footer.png"


const Sidebar = () => {
  return (
    <div className='sidebar'>
      <header>
        <img src={Header} alt='Header'/>
      </header>
      <div className='center'>
        <img src={menu} alt='Menu'/>
        <div className='hidden-sidebar'>
          <div className='title'><img src={Group} alt='' className='title_logo'/></div>
          <ul className='middle'>
            <li><img src={Dashboard} alt=""/></li>
          </ul>
          <footer className='side-hidden-footer'>
             <img src={sidebar_footer} alt=""/>
          </footer>
        </div>
      </div>
      <footer>
        <img src={Footer} alt='Footer'/>
      </footer>
    </div>
  );
};

export default Sidebar;
