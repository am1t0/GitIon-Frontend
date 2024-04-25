import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import "../../Styles/TeamSidebar.css"
import { setProject } from '../../Data_Store/Features/currProjectSlice';
import { fetchData } from '../../Data_Store/Features/repoContentSlice';

export default function TeamSidebar({handleDeleteTeam}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const projects = useSelector((store)=> store.project)
  const currTeam = useSelector((store)=> store.currTeam);

  const handleOnProjectCreate=(name)=>{   
        navigate(`/${currTeam.name}/create-project`)
  }
  const handleProjectClick=(project)=>{

        // collecting the repo data associated with project then also  setting it as current project in Redux Store
        dispatch(fetchData({project,})).then(()=>{

        dispatch(setProject(project))
        
        navigate(`/project/${project.name}`)

      }).catch((error) => {
        // Handle any errors that might occur during the fetching of projects
        console.error('Error fetching repo:', error);
      });
  }

   
  return(
    <div class="flex-shrink-0 p-3 bg-white teamSidebar">
       
    <ul class="list-unstyled ps-0">
      <div className="border-bottom my-3" style={{display:'flex'}}>
    <h5 className='mx-3'>Gittion</h5>
     {/* DELETING THE TEAM  */}
     {/* <h6 onClick={()=>{handleDeleteTeam(team._id)}} style={{color:'red',cursor:'pointer'}}>X</h6> */}
      </div>
      <li class="mb-1">
        <button class="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#dashboard-collapse" aria-expanded="false">
          <h6 className='clr'>Projects</h6>
        </button>
        <div class="collapse" id="dashboard-collapse">
          <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
          <li class="mb-1">
        <button class="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#order-collapse" aria-expanded="false">
          <li className='clr'>Your Projects</li>
        </button>
        <div className="collapse" id="order-collapse">
        <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
        { !projects.isLoading ? projects.data.map((project) => (
           <li className='clr' key={project.id} onClick={()=>{handleProjectClick(project)}}>  
            {project.name}
           </li>
            )): <h1>Loading...</h1>
          
          }
        </ul>
        </div>
            </li>
            <li className='clr' id='createProject' onClick={()=>{handleOnProjectCreate(currTeam.name)}}>Create Project</li>
          </ul>
        </div>
      </li>
      {/* <li class="mb-1">
        <button class="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#orders-collapse" aria-expanded="false">
          Tasks
        </button>
        <div class="collapse" id="orders-collapse">
          <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
            <li><a href="#" class="link-dark rounded">New</a></li>
            <li><a href="#" class="link-dark rounded">Processed</a></li>
            <li><a href="#" class="link-dark rounded">Shipped</a></li>
            <li><a href="#" class="link-dark rounded">Returned</a></li>
          </ul>
        </div>
      </li>
      <li class="mb-1">
        <button class="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#documents-collapse" aria-expanded="false">
          Documents
        </button>
        <div class="collapse" id="documents-collapse">
          <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
            <li><a href="#" class="link-dark rounded">New</a></li>
            <li><a href="#" class="link-dark rounded">Processed</a></li>
            <li><a href="#" class="link-dark rounded">Shipped</a></li>
            <li><a href="#" class="link-dark rounded">Returned</a></li>
          </ul>
        </div>
      </li> */}
      <li class="border-top my-3"></li>
      <li class="mb-1">
        <button className="clr btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#account-collapse" aria-expanded="false">
          Account
        </button>
        <div class="collapse" id="account-collapse">
          <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
            <li><a href="#" class="link-dark rounded">New...</a></li>
            <li><a href="#" class="link-dark rounded">Profile</a></li>
            <li><a href="#" class="link-dark rounded">Settings</a></li>
            <li><a href="#" class="link-dark rounded">Sign out</a></li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
  )
}