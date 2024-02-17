import React, { useRef } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setLoggedIn, setUser } from './Features/UsersSlice';

const RegisterPage = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const  usernameRef = useRef();
  const  emailRef = useRef();
  const  fullnameRef = useRef();
  const  passwordRef = useRef();
  
  const handleRegister = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: usernameRef.current.value,
          email: emailRef.current.value,
          fullname: fullnameRef.current.value,
          password: passwordRef.current.value,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
      }

      const responseData = await response.json();
      console.log("The response is: ",responseData);
      const { user, accessToken } = responseData.data;

         
      localStorage.setItem('access_token', accessToken);

       dispatch(setLoggedIn(true));
        dispatch(setUser(user));

         // Wait for Redux state to update before navigating
        await new Promise((resolve) => setTimeout(resolve, 0));

        navigate('/Home')

    } catch (error) {
      // Handle registration error
      console.error("Registration failed:", error.message);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form>
        <label>
          Username:
          <input type="text"  ref={usernameRef} />
        </label>
        <br />
        <label>
          Email:
          <input type="email" ref={emailRef} />
        </label>
        <br />
        <label>
          fullname:
          <input type="fullname" ref={fullnameRef} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" ref={passwordRef}  />
        </label>
        <br />
        <button type="button" onClick={handleRegister}>
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;

