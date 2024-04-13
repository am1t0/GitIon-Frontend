import React, { useRef } from 'react'
import getAccessToken from '../../Utils/auth.js';
import { useLocation, useNavigate } from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux'
import { addTeam } from '../../Data_Store/Features/teamSlice.js';
import { fetchTeam } from '../../Data_Store/Features/teamSlice.js';
import "../../Styles/CreateTeam.css"

export default function CreateTeam(props) {
    const location = useLocation();
    const navigate = useNavigate();
    const handleTeamCreated = location.state?.handleTeamCreated || (()=>{});

    const nameRef = useRef();
    const descriptionRef = useRef();
    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        event.preventDefault();
      
        // passing the param..
        const name = nameRef.current.value;
        const description = descriptionRef.current.value;
        if(name && description)
        dispatch(addTeam({ name, description })).then(() => {
          dispatch(fetchTeam()); // Refresh team data after adding a new team
      });

        nameRef.current.value = '';
        descriptionRef.current.value = '';

      };

    const {adding} = useSelector((store)=>store.team.newTeamStatus);

    console.log('add hor rha hai kya '+adding);

  return (
    !adding &&
    <div className='content-3'>
       <div className='detail-3'>
      <div className="heading">
    <h2>Create Team</h2>
          </div>  
    <form onSubmit={handleSubmit}>
      <div  className="input-group">
        <input type="text" ref={nameRef} required placeholder='name'/>
      </div>
      <div className="input-group">
        <textarea  ref={descriptionRef} required placeholder='description ' style={{height:'80px'}} ></textarea>
      </div>
      <div>
        <button 
        type="submit"
        className='btn btn-warning my-3'
        >Create</button>
      </div>
    </form>
  </div>
  <div className="info">
  <div className="teamImg">
    <img src="https://as2.ftcdn.net/v2/jpg/02/90/47/09/1000_F_290470972_9rC0a3Cy1CAPCzz7ziTEIIkxbauYd9Oc.jpg" alt="" />
  </div>
      <h5>Teamwork</h5>
   <div className="para">
     <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Omnis, est blanditiis. Voluptate ducimus impedit nisi non delectus ea, dolorum possimus quibusdam quae, consequatur, accusantium distinctio quas vero nobis fugit veniam ullam pariatur enim inventore quia molestias voluptatem! Doloribus cum libero error vitae facilis.</p>
   </div>
   </div>
    </div>
  )
}
