import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import getAccessToken from '../Utils/auth';
import { useSelector } from 'react-redux';
import '../Styles/Profile.css'

export default function Profile() {
  const [user, setUser] = useState();
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
      <div className="left-frm">
        <div className="prf-img">
            <div className="img"></div>
        </div>
        <div className="detl">
          <section>
            <div className="block">
              <span>college</span>
              <p className="ln"></p>
            </div>
            <div id='work-colg'>
              <h5>Institute of Engineering and Technology, INDORE</h5>
              <p>45-khandwa Naka , Indore , M.P</p>
            </div>
          </section>
          <section>
            <div className="block">
              <span>skills</span>
              <p className="ln"></p>
            </div>
            <div >
              <h5>Web development</h5>
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
                <span>CI/CD pipline</span>
                <span>Git</span>
              </div>
            </div>
          </section>
        </div>
      </div>
      <div className="right-frm">
        <div className="upDetail">
          <section>
          <h3>{user?.fullname}</h3>
          <h6>{user?.username}</h6>
         </section>
        </div>
        <div className="coreDetail">
            <section>
               <span>Contact Information</span>
               <ul id='c-info'>
                <li><p className='lt'>Phone</p> <p className='rt'>9893691684</p></li>
                <li><p className='lt'>Address</p><p className='rt'>S-12 4th Street New York , USA</p></li>
                <li><p className='lt'>E-mail</p><a href="#" className='rt'>@amitpandey.gmail.com</a></li>
               </ul>
            </section>
        </div>
      </div>
    </div>
  )
}
