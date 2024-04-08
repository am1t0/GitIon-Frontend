import './App.css';
import Footer from './Components/Footer';
import Header from './Components/Header';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect,useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/Login';
import RegisterPage from './Components/Register';

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserData = async () => {

      try {
          const accessToken = localStorage.getItem('access_token');
          console.log(accessToken);
        if (!accessToken) {
          console.error('Access token not found');
          return;
        } 
      
        // Make an API call to get user data
        
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/users/user-data`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        });
         
       
        if (!response.ok) {
          console.error('Error:', response.statusText);
          return;
        }
       
        const data = await response.json();


      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };
    fetchUserData();
  }, [dispatch]);

  return (
   <>
    <Header isLoggedIn={true}/>
     <Outlet/>
    <Footer/>
   </>
  );
}

export default App;
