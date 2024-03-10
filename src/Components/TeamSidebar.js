import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function TeamSidebar({team,projects,handleDeleteTeam}) {
  const navigate = useNavigate();
  const handleOnProjectCreate=(name)=>{
    console.log('harami idhar to aa rha hai ',name)
        
        navigate(`/${name}/create-project`, {state: {team}})
  }

  const handleProjectClick=(project)=>{
    //{console.log(name)}
        navigate(`/project/${project.name}`, {state: {project,team}})
  }
  return (
    <div class="flex-shrink-0 p-3 bg-white" style= {{width: "280px"}}>
       
    <ul class="list-unstyled ps-0">
      <div className="border-bottom my-3" style={{display:'flex'}}>
    <h6 className='mx-3'>Team {team.name}</h6>
     <h6 onClick={()=>{handleDeleteTeam(team._id)}} style={{color:'red',cursor:'pointer'}}>X</h6>
      </div>
      <li class="mb-1">
        <button class="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#dashboard-collapse" aria-expanded="false">
          Projects
        </button>
        <div class="collapse" id="dashboard-collapse">
          <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
            <li onClick={()=>{handleOnProjectCreate(team.name)}}>Create Project
            </li>
            {projects.map((project) => (
           <li key={project.id} onClick={()=>{handleProjectClick(project)}}>  
            {project.name}
    </li>
))}
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
        <button class="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#account-collapse" aria-expanded="false">
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
