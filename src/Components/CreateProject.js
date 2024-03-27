import React from 'react'
import { useLocation,useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';
import getAccessToken from '../Store/auth';
import { useRef } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { setRepo } from './Features/RepoSlice';
import '../Styles/CreateProject.css'

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

    const [show,setShow] = useState('repoForm');

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
    <div className="outerBox">
    <div className='project-n-repo'>
      
   { show==='projectForm' &&   <form className='projectForm'>
       <div id='titleDiv'>
        <h5>Create Project</h5>
       </div>
        
      <div className="inputs">
        <label htmlFor="name"><p>Name of Project*</p></label>
         <input type="text" ref={nameRef} />
      </div>
       <div className="inputs">
       <label htmlFor="description"><p>Description*</p></label>
         <textarea type="text" ref={descriptionRef}/>
       </div>

      <div className="inputs">
      <label htmlFor="start-date"><p>project start date</p></label>
         <input type="datetime-local" ref={startDateRef} placeholder='start date'/>
      </div>
      <div className="inputs">
      <label htmlFor="end-date"><p>Project end date</p></label>
         <input type="datetime-local" ref={endDateRef} placeholder='end date'/>
      </div>
 
    <div className="projectBtn">
        <button className='btn btn-success' onClick={handleProjectCreate}>Create</button>
    </div>
  </form>}


   { show==='repoForm' && <div>
      <h2>Create Repository</h2>
      <form>
        <div className="inputs">
           <input type="text" id="repoName" ref={RnameRef} required /> 
        </div>

        <div className="inputs">
           <textarea id="repoDescription" ref={RdescriptionRef} ></textarea>
        </div>

        <div className="inputs">
           <select id="repoPrivacy" ref={RprivacyRef}>
             <option value="public">Public</option>
             <option value="private">Private</option>
           </select>
        </div>

        <button type="button" className='btn btn-success' onClick={handleCreateRepository}>
          Create Repository
        </button>

        <button type='button' style={{background:'yellow', padding:'3px',margin:'10px',borderRadius:'10px'}} onClick={()=>{navigate('/')}}>Cancel </button>
      </form>
    </div>}
    </div>
    <div className="other">
       <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eius nihil maiores ut nam laboriosam aut commodi sunt, sed veniam animi quos distinctio. Minima suscipit nihil, perspiciatis cumque esse odit adipisci fuga obcaecati nisi eius, recusandae, consectetur officia optio beatae porro necessitatibus iste. Quia magnam, aliquid quaerat in inventore laudantium expedita perferendis alias ut veritatis aperiam voluptas rem adipisci optio. Cumque accusantium ipsum voluptates minima explicabo, necessitatibus eius quae ab quo quaerat, nesciunt ratione sed porro iusto repellendus, consectetur inventore id impedit esse tenetur. Unde repellat dolores corrupti quaerat! Natus vel fugiat debitis id officia in omnis et explicabo qui eos?</p>
    </div>
    </div>
  )
}
