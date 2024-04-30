import React from 'react'
import { useLocation,useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';
import getAccessToken from '../../Utils/auth.js';
import { useRef } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import '../../Styles/CreateProject.css'

export default function CreateProject() {

  // PROJECT FORM DETAILS VARIABLES
  const nameRef = useRef(null);
  const projectOverViewRef = useRef();
  const projectObjectivesViewRef = useRef();
  const techStackRef = useRef();
  
  // REPOFORM DETAILS VARAIBLES
  const RprivacyRef  = useRef();
  const RdescriptionRef  = useRef();
  const RnameRef = useRef();
  const RownerRef = useRef();


    const navigate = useNavigate();
    const currTeam = useSelector((store)=>store.currTeam.data);
    const [leaderToken, setLeaderToken] = useState('');
    const [project,setProject] = useState('');


    const [show,setShow] = useState('project');
    const [connectOrCreate,setConnectOrCreate] = useState(null);

    useEffect(() => {
      const fetchLeaderToken = async () => {
        try {
          const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/users/gitToken/${currTeam?.owner}`,{
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
                projectOverview : projectOverViewRef.current.value,
                projectObjectives : projectObjectivesViewRef.current.value.split(','),
                techStack : techStackRef.current.value.split(','),
                teamId: currTeam?._id,
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
        
          setShow('repoOptions');
      
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
      
          if (response.ok) {
           const response =  await fetch(`${process.env.REACT_APP_API_BASE_URL}/projects/repoDetail`, {
               method: 'POST',
               headers: {
                 'Content-Type': 'application/json',
                 'Authorization':`Bearer ${getAccessToken()}`
               },
               body: JSON.stringify({
                 projectId: project._id, 
                 repoName: data.name,
                 owner:data.owner.login,
               }),
             });
            
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
 
const handleConnectRepository = async () => {

  try {
    const response =  await fetch(`${process.env.REACT_APP_API_BASE_URL}/projects/repoDetail`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization':`Bearer ${getAccessToken()}`
      },
      body: JSON.stringify({
        projectId: project._id, 
        repoName: RnameRef.current.value,
        owner:RownerRef.current.value,
      }),
    });
    let result=await response.json();
    console.log('AAGEE ',result);
   alert(`Repository connected successfully!`);
   
  } catch (error) {
     console.log("Some error!");
  }
  
}      
  return (
    <div className="outerBox">
    <div className='project-n-repo'>
      
      {/* form for project creation  */}
   { show==='project' &&   <form className='projectForm'>
       <div className='titleDiv'>
        <h4>Create Project</h4>
       </div>
        
      <div className="inputs">
        <label htmlFor="name"><p>Name of Project*</p></label>
         <input type="text" ref={nameRef} />
      </div>
       <div className="inputs">
       <label htmlFor="project-overview"><p>Project Overview*</p></label>
         <textarea type="text" ref={projectOverViewRef}/>
       </div>

      <div className="inputs">
      <label htmlFor="project-objective"><p>Project Objectives*</p></label>
         <input type="text" ref={projectObjectivesViewRef} />
      </div>
      <div className="inputs">
      <label htmlFor="tech-stack"><p>Tech Stack*</p></label>
         <input type="text" ref={techStackRef}/>
      </div>
 
    <div className="projectBtn">
        <button className='btn btn-success' onClick={handleProjectCreate}>Create</button>
    </div>
  </form>}

    {/* after project creation whether user wants to create or connect an existing repo  */}
   { (show==='repoOptions') &&
    <div className='repoBtn'>
    <button type="button" className='btn btn-success' onClick={() => { setConnectOrCreate('create'); setShow(null); }}>
      Create Reposatory
    </button>
    <button type="button" className='btn btn-success' onClick={() => { setConnectOrCreate('connect'); setShow(null); }}>
      Access Existing Repo
    </button>
   </div>
   }

    {/* connect an existing repo  */}
   {
    connectOrCreate==='connect' && <div>
    <form>
    <div className='titleDiv'>
      <h4>Connect Repo</h4>
     </div>
      <div className="inputs">
      <label htmlFor="name"><p>Name of Reposatory*</p></label>
         <input type="text" id="repoName" ref={RnameRef} required /> 
      </div>

      <div className="inputs">
      <label htmlFor="owner"><p>Owner of Reposatory*</p></label>
         <input type="text" id="repoOwner" ref={RownerRef} required /> 
      </div>

    <div className='repoBtn'>
      <button type="button" className='btn btn-success' onClick={handleConnectRepository}>
        Connect
      </button>
    </div>

    <div className="repoBtn">
    <button type='button' className='btn btn-warning' onClick={()=> navigate('/')}>
        Cancel 
      </button>
    </div>

    </form>
  </div>}

   {/* creating a repo  */}
   { connectOrCreate==='create' && <div>
      <form>
      <div className='titleDiv'>
        <h4>Create Repo</h4>
       </div>
        <div className="inputs">
        <label htmlFor="name"><p>Name of Reposatory*</p></label>
           <input type="text" id="repoName" ref={RnameRef} required /> 
        </div>

        <div className="inputs">
        <label htmlFor="name"><p>Description*</p></label>
           <textarea id="repoDescription" ref={RdescriptionRef} ></textarea>
        </div>

        <div className="inputs"> 
        <label htmlFor="name"><p>Public or Private the repo*</p></label>
           <select id="repoPrivacy" ref={RprivacyRef}>
             <option value="public">Public</option>
             <option value="private">Private</option>
           </select>
        </div>

      <div className='repoBtn'>
        <button type="button" className='btn btn-success' onClick={handleCreateRepository}>
          Create Reposatory
        </button>
      </div>

      <div className="repoBtn">
      <button type='button' className='btn btn-warning' onClick={()=> navigate('/')}>
          Cancel 
        </button>
      </div>

      </form>
    </div>}
    </div>
    <div className="other">
       <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eius nihil maiores ut nam laboriosam aut commodi sunt, sed veniam animi quos distinctio. Minima suscipit nihil, perspiciatis cumque esse odit adipisci fuga obcaecati nisi eius, recusandae, consectetur officia optio beatae porro necessitatibus iste. Quia magnam, aliquid quaerat in inventore laudantium expedita perferendis alias ut veritatis aperiam voluptas rem adipisci optio. Cumque accusantium ipsum voluptates minima explicabo, necessitatibus eius quae ab quo quaerat, nesciunt ratione sed porro iusto repellendus, consectetur inventore id impedit esse tenetur. Unde repellat dolores corrupti quaerat! Natus vel fugiat debitis id officia in omnis et explicabo qui eos?</p>
    </div>
    </div>
  )
}
