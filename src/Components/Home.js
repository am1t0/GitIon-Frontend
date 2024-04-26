import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import Login from './Login';


const Home = () => {

  return (
   <div >  
     <Sidebar/>
     <Outlet/>
   </div>
  );
};

export default Home;
