import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../Styles/Sidebar.css'

export default function Sidebar({ teams, handleTeamCreated }) {
  const navigate = useNavigate();
  const handleTeamClick = (team) => {
    navigate(`/${team.name}`, { state: { team } })
  }

  return (
    <div className='sidebar'>
      {
        <div className="flex-shrink-0 p-3 bg-white" style={{ width: "280px" }}>
          <a href="/" className="d-flex align-items-center pb-3 mb-3 link-dark text-decoration-none border-bottom">
            <span className="fs-5 fw-semibold">Gittu</span>
          </a>
          <ul className="list-unstyled ps-0">
            <li className="mb-1">
              <button className="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="collapse" aria-expanded="true">
                <h6>User</h6>
              </button>
            </li>
            <li className="mb-1">
              <button className="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#dashboard-collapse" aria-expanded="false">
                <h6>Personal Space</h6>
              </button>
              <div className="collapse" id="dashboard-collapse">
                <ul className="forw">
                  <li><Link to="/Todos">Todos</Link></li>
                  <li><Link href="#" className="link-dark rounded">Quicks</Link></li>
                </ul>
              </div>
            </li>
            <li className="mb-1">
              <button className="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#orders-collapse" aria-expanded="false">
                <h6>Team Space</h6>
              </button>
              <div className="collapse" id="orders-collapse">
                <ul className="forw">
                  <li className="mb-1 team">
                    <p data-bs-toggle="collapse" data-bs-target="#teams-collapse" aria-expanded="false">
                      Teams
                    </p>
                    <div className="collapse" id="teams-collapse">
                      <ul className="forw">
                        {
                          teams.map((team) => {
                            return <li
                              onClick={() => { handleTeamClick(team) }} key={team._id}
                              className="team">{team.name}</li>
                          })
                        }
                      </ul>
                    </div>
                  </li>
                  <li>
                    <Link
                      to={{
                        pathname: '/create-team',
                        state: { handleTeamCreated: handleTeamCreated }
                      }}
                      className="link-dark rounded">Create Team</Link></li>
                </ul>
              </div>
            </li>
            <li className="border-top my-3"></li>
            <li className="mb-1">
              <button className="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#account-collapse" aria-expanded="false">
                Account
              </button>
              <div className="collapse" id="account-collapse">
                <ul className="forw">
                  <li><a href="#" className="link-dark rounded">New...</a></li>
                  <li><a href="#" className="link-dark rounded">Profile</a></li>
                  <li><a href="#" className="link-dark rounded">Settings</a></li>
                  <li><a href="#" className="link-dark rounded">Sign out</a></li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      }
    </div>
  )
}
