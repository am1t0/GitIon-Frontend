import React from 'react'
import { useLocation,useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';
import getAccessToken from '../Store/auth';
import { useRef } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { setRepo } from './Features/RepoSlice';

export default function CreateProject() {
  const nameRef = useRef(null);
  const descriptionRef = useRef(null);
  const startDateRef = useRef(null);
  const endDateRef = useRef(null);

  const RnameRef = useRef();
  const RdescriptionRef = useRef();
  const RprivacyRef  = useRef();

    const navigate = useNavigate();
    const location = useLocation();
    const team = location.state?.team;
    const [leaderToken, setLeaderToken] = useState('');
    const [project,setProject] = useState('');

    const dispatch = useDispatch();

    const [show,setShow] = useState('projectForm');

    useEffect(() => {
      const fetchLeaderToken = async () => {
        try {
          const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/users/gitToken/${team?.owner}`,{
            method:'GET',
            headers:{
              'Content-Type': 'application/json',
              'Authorization':`Bearer ${getAccessToken()}`
            }
          });
          if (!response.ok) throw new Error(await response.text());

          const data = await response.json();

          setLeaderToken(data.data.gitToken);
      
        } catch (error) {
          console.error('Error fetching leader token:', error);
        }
      };
  
      fetchLeaderToken();
    }, []); 

    const handleProjectCreate = async (event) => {
        event.preventDefault();
           
        try {
          const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/projects/create-project`, {
             method:'POST',
             headers: {
                'Content-Type': 'application/json',
                 'Authorization':`Bearer ${getAccessToken()}`
              },
              body: JSON.stringify({
                name: nameRef.current.value,
                details: {
                  description: descriptionRef.current.value,
                  startDate: startDateRef.current.value,
                  endDate: endDateRef.current.value,
                },
                teamId: team?._id,
              }),
          });
          console.log(response);
          if (!response.ok) {
            console.error('Error:', response.statusText);
            return;
          }
          const newProject = await response.json();
          console.log("New Project created is ",newProject.data)
          setProject(newProject.data);
        
          setShow('repoForm');
      
        } catch (error) {
          console.error('Error creating todo:', error.message);
          
        }
        console.log('Project Create called')
      };

const handleCreateRepository = async () => {
   // console.log(RnameRef.current.value,RdescriptionRef.current.value,RprivacyRef.current.value === 'private');
        try {
          const response = await fetch('https://api.github.com/user/repos', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${leaderToken}`,
            },
            body: JSON.stringify({
              name: RnameRef.current.value,
              description: RdescriptionRef.current.value,
              private: RprivacyRef.current.value === 'private',
            }),
          });
        
          const data = await response.json();
          console.log('Data of repo send is :',data.owner);
          //dispatch(setRepo(data))

          if (response.ok) {
           const response =  await fetch(`${process.env.REACT_APP_API_BASE_URL}/projects/repoDetail`, {
               method: 'POST',
               headers: {
                 'Content-Type': 'application/json',
                 'Authorization':`Bearer ${getAccessToken()}`
               },
               body: JSON.stringify({
                 projectId: project._id, // Replace with the actual project ID
                 repoName: data.name,
                 owner:data.owner.login,
               }),
             });
             console.log('Data after project create repo Detail gusayi ',response)
             let result=await response.json();
             console.log('AAGEE ',result);
            alert(`Repository created successfully!`);
            
            
            window.location.reload();
     
          } else {
            alert(`Error creating repository: ${data.message}`);
            console.error('Error creating repository:', data);
          }
        } catch (error) {
          alert(`An unexpected error occurred: ${error.message}`);
          console.error('Unexpected error:', error);
        }
      };
  return (
    <div className='container'>
   { show==='projectForm' &&   <form>
    <label>
      Project Name:
      <input type="text" ref={nameRef} />
    </label>
    <br />

    <label>
      Description:
      <input type="text" ref={descriptionRef} />
    </label>
    <br />

    <label>
      Start Date:
      <input type="datetime-local" ref={startDateRef} />
    </label>
    <br />

    <label>
      End Date:
      <input type="datetime-local" ref={endDateRef} />
    </label>
    <br />

    <button onClick={handleProjectCreate}>Create</button>
  </form>}


   { show==='repoForm' && <div>
      <h2>Create Repository</h2>
      <form>
        <label htmlFor="repoName">Repository Name:</label>
        <input
          type="text"
          id="repoName"
          ref={RnameRef}
          required
        /><br />

        <label htmlFor="repoDescription">Repository Description:</label>
        <textarea
          id="repoDescription"
          ref={RdescriptionRef}
        ></textarea><br />

        <label htmlFor="repoPrivacy">Repository Privacy:</label>
        <select
          id="repoPrivacy"
          ref={RprivacyRef}
        >
          <option value="public">Public</option>
          <option value="private">Private</option>
        </select><br />

        <button type="button" onClick={handleCreateRepository}
          style={{background:'yellow', padding:'3px',margin:'10px',borderRadius:'10px'}}
        >
          Create Repository
        </button>

        <button type='button' style={{background:'yellow', padding:'3px',margin:'10px',borderRadius:'10px'}} onClick={()=>{navigate('/')}}>Cancel </button>
      </form>
    </div>}
    </div>
   
  )
}
