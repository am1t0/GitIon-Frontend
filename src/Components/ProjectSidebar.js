import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../Styles/ProjectSidebar.css'

export default function ProjectSidebar({setContent }) {

  return (
    <>
      <div className="flex-shrink-0 p-3 bg-white projectSidebar">
        <div className="logo">
          <i class="fa-brands fa-github"></i>
          <span style={{ fontWeight: 'bolder' }}>Gittion</span>
        </div>
        <li className="border-top my-3 list-unstyled"></li>
        <ul class="list-unstyled ps-0">
        <li className="mb-1">
              <button className="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="collapse" aria-expanded="true" onClick={()=>setContent("Details")}>
                <h6>Details</h6>
              </button>
            </li>
            <li className="mb-1">
              <button className="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="collapse" aria-expanded="true" onClick={()=>setContent("Task Sheet")}>
                <h6>Task Sheet</h6>
              </button>
            </li>
            <li className="mb-1">
              <button className="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="collapse" aria-expanded="true" onClick={()=>setContent("Documents")}>
                <h6>Documents</h6>
              </button>
            </li>
          <li class="border-top my-3"></li>
          <li class="mb-1">
            <button class="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#account-collapse" aria-expanded="false">
              <h6>Account</h6>
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
