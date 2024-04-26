import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import '../Styles/Login.css'
import { Link } from 'react-router-dom';

const  Login = () => {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const emailRef = useRef(null);
  const [error,setError] = useState();

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
       console.log(response)
      if (!response.ok) {
         throw new Error('Something went wrong');
      }

      const responseData = await response.json();
      const { user, accessToken } = responseData.data;

      // Store the access token in localStorage
      localStorage.setItem('access_token', accessToken);
  
      window.location.reload();

      
      // e.g., history.push('/dashboard');
    } catch (error) {
        setError(error);
        setTimeout(() => {
          setError(null);
        }, 5000);
    }
  };

  return (
    <div className="account">
    <div className="content">
      <div className='regLog'>
      <h2>Login to your account</h2>
         <div id="notAccount">
            <h5>Don't have an account? </h5>
            <Link to='/register'><h5>Sign up</h5></Link>
         </div>
      </div>
      <div className="form">
      {error && <div className="error">{error?.message}</div>}
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
    {/* <div className="other">

       <div className="image">
      <img src="https://storage.googleapis.com/gweb-uniblog-publish-prod/images/PracticeSetsLaunchBlogHeader.width-1200.format-webp.webp" alt="" />
      </div>
      <div className="para">
       <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam id libero incidunt repellendus aperiam voluptatum minima fugit harum beatae? Voluptatibus! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Neque obcaecati ratione explicabo nobis dolorem maiores rem ipsa veritatis perspiciatis. Aliquid incidunt cum quaerat quae aspernatur aperiam voluptatem beatae excepturi? Earum rem consequatur eaque id harum quibusdam cum optio atque error?</p> 
       </div>
    </div> */}
  </div>
);

  }

  export default Login;