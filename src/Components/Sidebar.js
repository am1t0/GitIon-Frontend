import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../Styles/Sidebar.css'
import {useSelector,useDispatch} from 'react-redux';
import {setTeam }from '../Data_Store/Features/currTeamSlice'    // yhhhhhhhaa dhayna
import { fetchProjects } from '../Data_Store/Features/projectSlice';
import getAccessToken from '../Utils/auth';
import userSlice from '../Data_Store/Features/userSlice';

export default function Sidebar({handleTeamCreated }) {
  
  const user = useSelector((store)=>store.user.data);     // user for navigating to it's profile 

  const navigate = useNavigate();   
 
  const handleTeamClick = (team) => {         // for navigating to the team 
      navigate(`/${team._id}/${team.name}`);
  }

  
  const teams = useSelector((store)=>store.team?.data?.data)


  return (
   <div className="sidebar">
  <div className="logo">
    <i className="fab fa-github"></i>
    <span>Gittion</span>
  </div>
  <ul className="list-unstyled my-4">
  <li>
      <button className="custom btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#user-collapse" aria-expanded="false">
        <div id="user">
        <i class="fa-solid fa-circle-user"></i>
        <h6>User</h6>
        </div>
      </button>
      <div className="collapse" id="user-collapse">
        <ul className="list-unstyled pos">
          <li>
            <Link to={`/profile/${user?.fullname}`} className='link'>       {/* navigating to the profile of user  */}
            <i class="fa-solid fa-user"></i>
              <p>profile</p>
            </Link>
          </li>
          <li>
            <Link to="/" className='link'>
            <i class="fa-solid fa-gear"></i>
            <p>setting</p>
            </Link>
          </li>
          <li>
            <Link to="/todos" className='link'>           {/* navigating to the todos of user  */}
            <i class="fa-regular fa-circle-dot"></i>
            <p>todos</p>
            </Link>
          </li>
          <li>
            <Link to="/" className='link'>
            <i class="fa-solid fa-right-from-bracket"></i>
            <p>log out</p>
            </Link>
          </li>
        </ul>
      </div>
    </li>
    <li>
      <button className="custom btn btn-toggle collapsed" data-bs-toggle="collapse" data-bs-target="#personal-collapse" aria-expanded="false">
        <h6>Personal Space</h6>
      </button>
      <div className="collapse" id="personal-collapse">
        <ul className="list-unstyled pos">
          <li>
            <Link to="/Todos" className='link'>
              <i class="fa-solid fa-bullseye"></i> 
              <p>Todos</p>
            </Link>
          </li>
          <li>
            <Link to="/" className='link'>
            <i class="fa-solid fa-thumbtack"></i> 
            <p>Quicks</p>
            </Link>
          </li>
        </ul>
      </div>
    </li>
    <li>
      <button className="custom btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#team-collapse" aria-expanded="false">
        <h6>Team Space</h6>
      </button>
      <div className="collapse" id="team-collapse">
        <ul className="pos list-unstyled">
          <li>
            <button className="teams btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#teams-collapse" aria-expanded="false">
            <i class="fa-brands fa-unity"></i>
            <p>Teams</p>
            </button>
            <div className="collapse" id="teams-collapse">
              <ul className="pos list-unstyled">
                {teams?.map((team) => (
                  <li onClick={() => handleTeamClick(team)} key={team?._id}  className='teamName'>{team?.name}</li>
                ))}
              </ul>
            </div>
          </li>
          <li>
            <Link
              to={{
                pathname: '/create-team',
                state: { handleTeamCreated: handleTeamCreated }
                }}
              className='link'      >  
                <i class="fa-solid fa-monument"></i>
                 <p>Build team</p>
              </Link>
          </li>
        </ul>
      </div>
    </li>
  </ul>
</div>

  )
}
