import './App.css';
import Footer from './Components/Common/Footer';
import Header from './Components/Common/Header';
import { useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import { Outlet} from 'react-router-dom';
import Login from './Components/Login.js'
import {useDispatch ,useSelector} from 'react-redux';
import { fetchUser } from './Data_Store/Features/userSlice';
import { fetchTeam } from './Data_Store/Features/teamSlice';
import { fetchProjects } from './Data_Store/Features/projectSlice.js';


function App() {

   const dispatch = useDispatch();
   const navigate = useNavigate();

  useEffect(()=>{
    dispatch(fetchUser());
    dispatch(fetchTeam());
  },[dispatch])

  const {isLoading} = useSelector((store)=> store.user);

  return (
  !isLoading?
   <div>
    <Header/>
     <Outlet/>
    {/* <Footer/> */}
   </div>
   :<div style={{display:'flex',alignContent:'center',justifyContent:'center'}}><h1>Loading...</h1></div>
  );
}

export default App;
