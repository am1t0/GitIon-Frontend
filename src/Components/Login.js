import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import getAccessToken from '../Store/auth';
import { useDispatch } from 'react-redux';
import { setLoggedIn,setUser } from './Features/UsersSlice';

const  Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const emailRef = useRef(null);
  const errorRef = useRef(null);

  const handleLogin = async () => {
       
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: usernameRef.current.value,
          password: passwordRef.current.value,
          email: emailRef.current.value
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const responseData = await response.json();
      const { user, accessToken } = responseData.data;

      // Store the access token in localStorage
      localStorage.setItem('access_token', accessToken);
      dispatch(setLoggedIn(true));
      dispatch(setUser(user));
      navigate('/Home')

      
      // e.g., history.push('/dashboard');
    } catch (error) {
      // Handle login error
      console.error("Login failed:", error.message);
    }
  };

  return (
        <div>
          <h2>Login</h2>
          <form>
            <label>
              Username:
              <input type="text" ref={usernameRef} />
            </label>
            <br />
            <label>
              email:
              <input type="text" ref={emailRef} />
            </label>
            <br />
            <label>
              Password:
              <input type="password" ref={passwordRef} />
            </label>
            <br />
            <button type="button" onClick={handleLogin}>
              Login
            </button>
          </form>
          <p ref={errorRef} style={{ color: 'red' }}></p>
        </div>
      );

  }

  export default Login;