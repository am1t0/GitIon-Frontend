import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import getAccessToken from '../Utils/auth';
import { useSelector } from 'react-redux';
import '../Styles/Profile.css'
import github from '../Images/github.png';
import linkedin from '../Images/linkedin.png'
import email from '../Images/gmail.png';
import ProfileEditForm from './ProfileEditForm';

export default function Profile() {
  const [user, setUser] = useState();
  const [editform,setEditForm] = useState(false);
  const { username } = useParams();

  // abhi direct store se le aa user details
  const { data } = useSelector((store) => store.user);

  useEffect(() => {
    setUser(data);
    const fetchUserDetails = async () => {
      try {


        const response = await fetch('', {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch repository contents');
        }

        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Error fetching repository contents:', error.message);
      }
    };

    //   fetchUserDetails();
  }, [])

  return (
    <div className='frame'>
      {
        editform && <ProfileEditForm setEditForm={setEditForm}/>
      }
      <div className="left-frm">
        <div className="prf-img">
          <section className="img"></section>
          <section className='names'>
            <div>
            <h5>{user?.fullname}</h5>
            <h6>@{user?.username}</h6>
            </div>
             <div className="prf-ed">
             <i class="fa-regular fa-pen-to-square" onClick={()=> setEditForm(true)}></i>
             </div>
          </section>
        </div>

        <div className="coreDetail">
          <section>
            {/* <p id='part'>Contacts</p> */}
            <ul id='c-info'>
              <li><p className='lt'>Phone</p> <p className='rt'>+91 9893691684</p></li>
              <li><p className='lt'>Address</p><p className='rt'>S-12 4th Street New York , USA</p></li>
            </ul>
            <div className="socials">
              <a href="#"><img src={github} alt="" /></a>
              <a href="#"><img src={linkedin} alt="" /></a>
              <a href="#"><img src={email} alt="" /></a>
            </div>
          </section>
        </div>

      </div>
      <div className="right-frm">
        <div className="detl">
          <section className="block">
            <p id='part'>College</p>
            <h6>Institute of Engineering and Technology</h6>
            <p>12-Khandwa Naka , IT-park, Indore, M.P</p>
          </section>
            <section className="block">
              <p id='part'>skills</p>
            <div >
              <h6>Web development</h6>
              <div className='web-skills'>
                <span>React</span>
                <span>CSS</span>
                <span>JS</span>
                <span>ReactJs</span>
                <span>ExpressJS</span>
                <span>MongoDB</span>
                <span>Mongoose</span>
                <span>HTML</span>
                <span>Kubernates</span>
                <span>Reed</span>
                <span>CI/CD pipeline</span>
                <span>C</span>
                <span>Java</span>
                <span>Bootstrap</span>
                <span>SQL</span>
                <span>Node Js</span>
              </div>
            </div>
          </section>
          <section className="block">
            <p id='part'>Teams</p>
             <ul className='teams'>
              <li>Dev Darsan</li>
              <li>Hello</li>
              <li>ML Hunters</li>
              <li>DevHarbour</li>
             </ul>
          </section>
        </div>

      </div>
    </div>
  )
}
