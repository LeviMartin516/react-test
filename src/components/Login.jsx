import React, { useState } from 'react';
import './Login.css';
import logoImage from "./assets/1k-logo.svg";
import backimage1 from "./assets/Screen1.png";
import backimage2 from "./assets/Screen2.png";
import backimage3 from "./assets/Screen3.png";
import { useNavigate } from "react-router-dom";
import sweetalert2 from "sweetalert2";
import api from '../api/api';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState(backimage1);

  const images = [backimage1, backimage2, backimage3];

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const token = await api.login(username, password);

      if (token) {
        // Navigate to the Dashboard page
        setTimeout(() => {
          setIsLogin(true);
          navigate('/Dashboard');
        }, 1000);


        // Show a success alert
        sweetalert2.fire({
          title: "Log in Successful!",
          text : isLogin ? 'Login' : 'Logging in.....',
          icon: "success"
        });
      }
    } catch (error) {
      console.error('Error during login:', error.message);

      // Show an error alert
      sweetalert2.fire({
        title: "Oops, something went wrong!",
        text: "Please check your username and password.",
        icon: "error"
      });
    }
  };

  return (
    <div className="Login">
      <div className="login-page">
        <div className="login-image-section">
          <img src={currentImage} style={{ width: '100%' }} alt="Background" />
        </div>
        <div className="login-form-section">
          <form className="login-form" onSubmit={handleSubmit}>
            <img src={logoImage} alt="Logo" className='first-logo' />
            <input
              type="text"
              className="login-form-field"
              placeholder="Username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              className="login-form-field"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="login-form-button">
              Log In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
