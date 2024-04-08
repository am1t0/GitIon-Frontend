import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "../Styles/TeamSidebar.css"

export default function TeamSidebar({team,projects,handleDeleteTeam}) {
  const navigate = useNavigate();
  const handleOnProjectCreate=(name)=>{   
        navigate(`/${name}/create-project`, {state: {team}})
  }

  console.log('Projects in teamSidebar : ',projects)
  const handleProjectClick=(project)=>{
    //{console.log(name)}
        navigate(`/project/${project.name}`, {state: {project,team}})
  }
  return (
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
        {projects.map((project) => (
           <li className='clr' key={project.id} onClick={()=>{handleProjectClick(project)}}>  
            {project.name}
           </li>
            ))}
        </ul>
        </div>
            </li>
            <li className='clr' id='createProject' onClick={()=>{handleOnProjectCreate(team.name)}}>Create Project</li>
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