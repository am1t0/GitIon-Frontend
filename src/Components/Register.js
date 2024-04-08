import React, { useRef } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const  usernameRef = useRef();
  const  emailRef = useRef();
  const  fullnameRef = useRef();
  const  passwordRef = useRef();
  const skillsRef = useRef();
  const gitTokenRef = useRef();
  
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
          skills: skillsRef.current.value.split(','),
          gitToken: gitTokenRef.current.value,
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

         // Wait for Redux state to update before navigating
        await new Promise((resolve) => setTimeout(resolve, 0));

        navigate('/Home')

    } catch (error) {
      // Handle registration error
      console.error("Registration failed:", error.message);
    }
  };

  return (
    <div className='account'>
      <div className="content">
        <div className="regLog">
         <h2>Register</h2>
        </div>
      <div className='form'>
        <div className='inputBox'>
          <input type="text"  ref={usernameRef} placeholder='Username'/>
        </div>
  
        <div className='inputBox'>
          <input type="email" ref={emailRef} placeholder='email'/>
        </div>
        
        <div className='inputBox'>
          <input type="text" ref={skillsRef}  placeholder='skills with spaces'/>
        </div>

        <div className='inputBox'>
          <input type="text" ref={fullnameRef} placeholder='fullname'/>
        </div>

        <div className='inputBox'>
          <input type="text" ref={gitTokenRef} placeholder='gitToken'/>
        </div>
        
        
        <div className='inputBox'>
          <input type="password" ref={passwordRef}  placeholder='password'/>
        </div>
        

        <div className="inputBox">
        <button 
        style={{width:'120px'}}
        className='btn btn-warning'
        type="button" 
        onClick={handleRegister}>
          Register
        </button>
        </div>
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
};

export default RegisterPage;

