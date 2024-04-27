import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import Login from './Login';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const Home = () => {

  const navigate = useNavigate();
  
  const {isLoading,isError} = useSelector((store)=> store.user);
  useEffect(() => {
    if (!isLoading && isError) {
      navigate('/login'); 
    }
  }, [isLoading, isError, navigate]);

  return (
    !isLoading &&
   <div style={{display:'flex'}}>  
     <Sidebar/>
     <Outlet/>
   </div>
  );
};

export default Home;
