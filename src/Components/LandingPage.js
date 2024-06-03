import React, { useEffect } from 'react'
import '../Styles/LandingPage.css'
import team from '../Images/LandingTeam.png'
import personal from '../Images/personal.png'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


const LandingPage = () => {

  // getting all user's data
  const { data, isLoading } = useSelector((store) => store.user);

  // list of all teams for user
  const teams = useSelector((store)=>store.team?.data?.data)

  const upper = (name)=>{
     return name[0].toUpperCase()+name.slice(1);
  }
  return (
    <div className='landingPage'>
      <h4>Welcome back, {data.fullname} !</h4>
      <div className="notifications">
        <h5>Notifications</h5>
      </div>

      <div className="parts">
        <section className="personal-space">
          <h4>Personal Space</h4>
          <div className="items">
            <div className="boxes">
              <h5>Todos</h5>
              <p> Manage your daily tasks and stay organized
                with your personal to-do list.   </p>
                <div className="goTo">
                 <i class="fa-solid fa-arrow-up-right-from-square"></i>
                 <p><Link to='/dashboard'>View all todos</Link></p>
                </div>
            </div>
            <div className="boxes">
              <h5>Long Plans</h5>
              <p>Plan your future projects and keep track of     your long-term goals.  </p>
              <div className="goTo">
                 <i class="fa-solid fa-arrow-up-right-from-square"></i>
                 <p><Link to='/dashboard'>View all plans</Link></p>
                </div>
            </div>
            <div className="boxes">
              <h5>Reminders</h5>
              <p>Never miss an important date or deadline with your reminders </p>
              <div className="goTo">
                 <i class="fa-solid fa-arrow-up-right-from-square"></i>
                 <p><Link to='/dashboard'>View all reminders</Link></p>
                </div>
            </div>
          </div>
        </section>
        <section className='team-space'>
          <h5>Team Space</h5>
          <div className="items">
           
           <div className="teamsGoto">
            <div className="thd">
            <h5>Teams</h5>
             <button type="button"><Link to={'/create-team'}>Create</Link></button>
            </div>
            <div className="Tsrch">
               <input type="search" placeholder='search team..' />
            </div>
            <div className="Tlist">
               {
                teams?.map((team)=>{
                  return <li><Link to={`${team._id}/${team.name}`}>{upper(team.name)}</Link></li>
                })
               }
            </div>
           </div>

            <div className="boxes">
              <h5>Tasks</h5>
              <p>Assign and complete tasks to ensure your team projects are on track.</p>
              <div className="goTo">
                 <i class="fa-solid fa-arrow-up-right-from-square"></i>
                 <p>View all tasks</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};


export default LandingPage;
