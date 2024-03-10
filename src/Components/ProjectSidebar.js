import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function ProjectSidebar({project,setContent}) {
  const navigate = useNavigate();

  return (
    <>
    <div class="flex-shrink-0 p-3 bg-white" style={{width: "280px"}}>
    <a href="/" class="d-flex align-items-center pb-3 mb-3 link-dark text-decoration-none border-bottom">    
      <span class="fs-5 fw-semibold">{project.name}</span>
    </a>
    <ul class="list-unstyled ps-0">
      <li class="mb-1" onClick={() => setContent("Details")}>
        Details
      </li>
      <li class="mb-1" onClick={() => setContent("Task Sheet")} >
         Task Sheet
      </li>
      <li class="mb-1" onClick={() => setContent("Documents")}>
          Documents
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
    </>
  )
}
