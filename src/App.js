import './App.css';
import Footer from './Components/Footer';
import Header from './Components/Header';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect,useState } from 'react';
import getAccessToken from './Store/auth';
import { setLoggedIn, setUser } from './Components/Features/UsersSlice';
import { Outlet, useNavigate } from 'react-router-dom';
import Home from './Components/Home';

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state)=>state.user.isLoggedIn);

  useEffect(() => {
    const fetchUserData = async () => {

      try {
          const accessToken = getAccessToken();
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
  
        dispatch(setLoggedIn(true));
        dispatch(setUser(data));

      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };
    fetchUserData();
  }, [dispatch,localStorage]);

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     navigate('/Home');
  //   }
  // }, [isLoggedIn, navigate]);

  return (
   <>
    <Header/>
     <Outlet/>
    <Footer/>
   </>
  );
}

export default App;
