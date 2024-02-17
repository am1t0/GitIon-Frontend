import React, { useRef } from 'react'
import getAccessToken from '../Store/auth';
import { useLocation } from 'react-router-dom';

export default function CreateTeam(props) {
    const location = useLocation();
    const handleTeamCreated = location.state?.handleTeamCreated || (()=>{});

    const nameRef = useRef();
    const descriptionRef = useRef();

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
          const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/teams/create-team`, {
             method:'POST',
             headers: {
                'Content-Type': 'application/json',
                 'Authorization':`Bearer ${getAccessToken()}`
              },
              body: JSON.stringify({
                name: nameRef.current.value,
                description: descriptionRef.current.value,
              }),
          });
          if (!response.ok) {
            console.error('Error:', response.statusText);
            return;
          }
          const newTeam = await response.json();
          console.log("New Team created is ",newTeam)
          handleTeamCreated(newTeam.data);
    
          // Clear form fields
          nameRef.current.value = '';
          descriptionRef.current.value = '';
        } catch (error) {
          console.error('Error creating todo:', error.message);
          
        }
      };
  return (
    <>
       <div>
    <h2>Create New Team</h2>
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" ref={nameRef} required />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea id="description" ref={descriptionRef} required></textarea>
      </div>
      <div>
        <button type="submit">Create Team</button>
      </div>
    </form>
  </div>
    </>
  )
}
