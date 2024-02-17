import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Sidebar from './Sidebar';
import Ok from './Ok';
import { Outlet } from 'react-router-dom';


const Home = () => {
    
     const user = useSelector((state)=> state.user.user?.data)
    
  return (
   <div style={{display:'flex'}}>
    <Sidebar/>
    <Outlet/>
   </div>
  );
};

export default Home;
