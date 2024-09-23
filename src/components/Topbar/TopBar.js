import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import './Topbar.css';
import dark from '../../assests/dark.png';
import iconbtn from '../../assests/iconbtn.png';
import user from '../../assests/user.png';
import profile from '../../assests/profile.png';
import profile1 from '../../assests/profile1.png';

const TopBar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.target.closest('.topbar-icons')) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <div className='topbar'>
      <h2 className='title'>Dashboard</h2>
      <div className='topbar-icons'>
        <img src={iconbtn} alt='Icon Button' className='topbar-icon' />
        <img src={dark} alt='Dark Mode' className='topbar-icon' />
        <img
          src={user}
          alt='User'
          className='topbar-icon'
          onClick={handleDropdownToggle}
        />
        <div className={`dropdown-menu ${isDropdownOpen ? 'active' : ''}`}>
          <ul>
            <li style={{paddingLeft:'0px'}}><img src={profile} alt='Profile' /></li>
            <li style={{paddingLeft:'16px'}}  className='logout'>
              <button onClick={handleLogout} className="logout-btn">
                <img src={profile1} alt='Logout Icon' />
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
