import React from 'react'
import { Link } from 'react-router-dom'

export default function Sidebar({teams,handleTeamCreated}) {
  return (
    <div>
    {
    <div class="flex-shrink-0 p-3 bg-white" style= {{width: "280px"}}>
    <a href="/" class="d-flex align-items-center pb-3 mb-3 link-dark text-decoration-none border-bottom">
    
      <span class="fs-5 fw-semibold">Gittu</span>
    </a>
    <ul class="list-unstyled ps-0">
      <li class="mb-1">
        <button class="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#home-collapse" aria-expanded="true">
         <Link to='/Home' >Home</Link> 
        </button>
      </li>
      <li class="mb-1">
        <button class="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#dashboard-collapse" aria-expanded="false">
          Personal Space
        </button>
        <div class="collapse" id="dashboard-collapse">
          <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
            <li><Link to="/Home/Todos" class="link-dark rounded">Todos</Link></li>
            <li><Link href="#" class="link-dark rounded">Quicks</Link></li>
          </ul>
        </div>
      </li>
      <li class="mb-1">
        <button class="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#orders-collapse" aria-expanded="false">
         Team Space
        </button>
        <div class="collapse" id="orders-collapse">
          <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
            <li><Link
            to={{
              pathname: '/Home/create-team',
              state: { handleTeamCreated: handleTeamCreated }
            }} 
            
            className="link-dark rounded">Create Team</Link></li>
            {
            teams.map((team)=>{
               return  <li><a href="#" class="link-dark rounded">{team.name}</a></li>
            })
            }
          </ul>
        </div>
      </li>
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
    }
  </div>
  )
}
