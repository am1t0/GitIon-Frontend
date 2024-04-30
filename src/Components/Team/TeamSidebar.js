import React, { useEffect ,useState} from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import "../../Styles/TeamSidebar.css"
import { setProject } from '../../Data_Store/Features/currProjectSlice';
import { fetchData } from '../../Data_Store/Features/repoContentSlice';
import { fetchProjects } from '../../Data_Store/Features/projectSlice';

export default function TeamSidebar({setShow}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const projects = useSelector((store)=> store.project);

  const handleProjectClick=(project)=>{

        // collecting the repo data associated with project then also  setting it as current project in Redux Store
        dispatch(fetchData({project,selectedBranch:'main'})).then(()=>{

        dispatch(setProject(project))
        
        navigate(`/project/${project.name}/${project._id}`)

      }).catch((error) => {
        // Handle any errors that might occur during the fetching of projects
        console.error('Error fetching repo:', error);
      });
  }

   
  return(
    <div className="flex-shrink-0 p-3 bg-white teamSidebar">
       
    <ul className="list-unstyled ps-0">
      <div className="border-bottom my-3" style={{display:'flex'}}>
    <h5 className='mx-3'>Gittion</h5>
     {/* DELETING THE TEAM  */}
     {/* <h6 onClick={()=>{handleDeleteTeam(team._id)}} style={{color:'red',cursor:'pointer'}}>X</h6> */}
      </div>
      <li className="mb-1">
        <button className="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#dashboard-collapse" aria-expanded="false">
          <h6 className='clr'>Projects</h6>
        </button>
        <div className="collapse" id="dashboard-collapse">
          <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
          <li className="mb-1">
        <button className="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#order-collapse" aria-expanded="false">
          <li className='clr'>Your Projects</li>
        </button>
        <div className="collapse" id="order-collapse">
        <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
        { !projects.isLoading ? projects.data?.map((project) => (
           <li className='clr' key={project._id} onClick={()=>{handleProjectClick(project)}}>  
            {project.name}
           </li>
            )): <h1>Loading...</h1>
          
          }
        </ul>
        </div>
            </li>
       <li className='clr' id='createProject' onClick={()=> setShow(false)}>Create Project</li>
          </ul>
        </div>
      </li>
      {/* <li className="mb-1">
        <button className="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#orders-collapse" aria-expanded="false">
          Tasks
        </button>
        <div className="collapse" id="orders-collapse">
          <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
            <li><a href="#" className="link-dark rounded">New</a></li>
            <li><a href="#" className="link-dark rounded">Processed</a></li>
            <li><a href="#" className="link-dark rounded">Shipped</a></li>
            <li><a href="#" className="link-dark rounded">Returned</a></li>
          </ul>
        </div>
      </li>
      <li className="mb-1">
        <button className="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#documents-collapse" aria-expanded="false">
          Documents
        </button>
        <div className="collapse" id="documents-collapse">
          <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
            <li><a href="#" className="link-dark rounded">New</a></li>
            <li><a href="#" className="link-dark rounded">Processed</a></li>
            <li><a href="#" className="link-dark rounded">Shipped</a></li>
            <li><a href="#" className="link-dark rounded">Returned</a></li>
          </ul>
        </div>
      </li> */}
      <li className="border-top my-3"></li>
      <li className="mb-1">
        <button className="clr btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#account-collapse" aria-expanded="false">
          Account
        </button>
        <div className="collapse" id="account-collapse">
          <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
            <li><a href="#" className="link-dark rounded">New...</a></li>
            <li><a href="#" className="link-dark rounded">Profile</a></li>
            <li><a href="#" className="link-dark rounded">Settings</a></li>
            <li><a href="#" className="link-dark rounded">Sign out</a></li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
  )
}