import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLoggedIn,setUser } from './Features/UsersSlice';
import '../Styles/Login.css'

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
    <div className="account">
    <div className="content">
      <div className='regLog'>
      <h2>Login</h2>
      </div>
      <div className="form">
        <div className="inputBox">
          <input type="text" ref={usernameRef} required   placeholder='Username'/>
    
        </div>
        <div className="inputBox">
          <input type="text" ref={emailRef} required  placeholder='email'/>
        </div>
        <div className="inputBox">
          <input type="password" ref={passwordRef} required  placeholder='password'/>
    
        </div>
        <div className="inputBox">
          <button style={{width:'120px'}}className='btn btn-warning' type="button" onClick={handleLogin}>
            Login
          </button>
        </div>

      {/* <div className="logOpt">
      <div className="option">
        Google
      </div>
      <div className="option">
        Github
      </div>
        </div> */}
      </div>
    </div>
    <div className="other">

       <div className="image">
      <img src="https://storage.googleapis.com/gweb-uniblog-publish-prod/images/PracticeSetsLaunchBlogHeader.width-1200.format-webp.webp" alt="" />
      </div>
      <div className="para">
       <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam id libero incidunt repellendus aperiam voluptatum minima fugit harum beatae? Voluptatibus! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Neque obcaecati ratione explicabo nobis dolorem maiores rem ipsa veritatis perspiciatis. Aliquid incidunt cum quaerat quae aspernatur aperiam voluptatem beatae excepturi? Earum rem consequatur eaque id harum quibusdam cum optio atque error?</p> 
       </div>
    </div>
  </div>
);

  }

  export default Login;