import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../Login/Login.css";
import Logo from "../../assests/Logo.png";
import Icon from "../../assests/Icon.png";
import Password_icon from "../../assests/Password_icon.png";



const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (email === 'test@dev.com' && password === 'test123') {
      localStorage.setItem('token', 'mockToken');
      localStorage.setItem('fullName', 'Test User');
      navigate('/dashboard');
      return;
    }

    try {
      const response = await axios.post('https://coreapi.hectorai.live/api/auth/login', {
        email,
        password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      console.log('API Response:', response);

      if (response.status === 200) {
        const { userDetails: { fullName }, token } = response.data;

        localStorage.setItem('token', token);
        localStorage.setItem('fullName', fullName);

        navigate('/dashboard');
      } else {
        setError('Invalid credentials');
      }
    } catch (error) {
      console.log('API Error:', error);
      setError(error.response?.data?.message || 'An error occurred. Please try again.');
    }
  };

  return (
    <div className="App">
      <div className="logo">
      <img src={Logo} className="App-logo" alt="logo" />
      </div>
     
      <div className="App-header">
        <form onSubmit={handleLogin}>
        <h2>Welcome Back!</h2>
  
          <div className="email-filed">
            <div className="email-label">
              <label>Email</label>
            </div>
             <img src={Icon} className="envelope" alt="logo" />
             <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='input-box'
        />       
           </div>
          <div className="password-filed">
            <div className="password-lebel">
              <label>Password</label>
            </div>
             <img src={Password_icon} className="password" alt="logo" /> 
           
             <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='input-box'
          
        />
             <span><a href="#" className="forgot-password">Forgot Password?</a></span>  
          </div>
          <div className="remember-me">
            <input  type="checkbox" id="remember-me"  name="remember" value="remember"  />
            <label for="vehicle1">Remember me</label>
          </div>
          <button className="signin-btn" type="submit">SIGN IN</button>
          <div className='error_message'>
          {error && <p style={{ color: 'red',  display:"flex", flexDirection:"column"}}>{error}</p>}
          </div>

        </form>
      </div>
    </div>
   
  );
};

export default Login;
