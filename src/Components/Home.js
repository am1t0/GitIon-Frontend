import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import getAccessToken from '../Store/auth';


const Home = () => {

     const [teams,setTeams] = useState([]);

     const handleTeamCreated=(newTeam)=>{
      setTeams((prevTeams)=> [...prevTeams,newTeam]);
 }
     useEffect(()=>{

       const fetchTeams=async ()=>{

      try {
           const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/teams/teams-for-user`,
           {
             method:'GET',
             headers:{
               "Authorization":`Bearer ${getAccessToken()}`
             }
           })

           if (!response.ok) {
            console.error('Error:', response.statusText);
            return;
          }
          //console.log('response',response);
          const data = await response.json();

           
          await setTeams(data.data);
  

      } catch (error) {
         console.error('Error fetching user data:', error.message);
      }
    };
      fetchTeams();

   },[])
    
  

  return (
   <div style={{display:'flex'}}>    
    <Sidebar teams={teams} handleTeamCreated={handleTeamCreated} />
    <Outlet/>
   </div>
  );
};

export default Home;
