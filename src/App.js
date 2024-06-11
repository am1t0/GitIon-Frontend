import './App.css';
import Footer from './Components/Common/Footer';
import Header from './Components/Common/Header';
import { useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import { Outlet} from 'react-router-dom';
import {useDispatch ,useSelector} from 'react-redux';
import { fetchUser } from './Data_Store/Features/userSlice';
import { fetchProjects } from './Data_Store/Features/projectsSlice.js';

function App() {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const {isLoading,isError} = useSelector((store)=> store.user);
  
  useEffect(()=>{
    dispatch(fetchUser())
    dispatch(fetchProjects())
  },[dispatch])

  // when  the user is not logged in and tries to access any other page except login then redirect them to login
  useEffect(() => {
    if (!isLoading && isError) {
      navigate('/login'); 
    }
  }, [isLoading, isError, navigate]);

  return (
  !isLoading?
    
   <div>
    <Header/>
    <Outlet/>
    <Footer/>
   </div>

   :<h1>Loading...</h1>
  );
}

export default App;
