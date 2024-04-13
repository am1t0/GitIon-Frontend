import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import Login from './Login';


const Home = () => {

  const {isLoggin} = useSelector((store)=>store.user);

  return (
   <div >   
     {
      isLoggin 
      ? <div style={{display:'flex'}}>
       <Sidebar />
       <Outlet/>
       </div>
      : <Login/> 
     }
   </div>
  );
};

export default Home;
