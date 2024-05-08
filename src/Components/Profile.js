import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import getAccessToken from '../Utils/auth';
import { useDispatch, useSelector } from 'react-redux';
import '../Styles/Profile.css'
import github from '../Images/github.png';
import linkedin from '../Images/linkedin.png'
import email from '../Images/gmail.png';
import ProfileEditForm from './ProfileEditForm';
import { fetchUser } from '../Data_Store/Features/userSlice';

export default function Profile() {
  const dispatch = useDispatch();
  const [user, setUser] = useState();
  const [loading , setLoading] = useState(false);
  const profileRef = useRef();
  const [editform, setEditForm] = useState(false);
  const { username } = useParams();

  const { data, isLoading } = useSelector((store) => store.user);

  const handleProfileChange = async () => {
    setLoading(true);
    const selectedFile = profileRef.current.files[0];

    if (!selectedFile) {
        console.error('No file selected');
        return;
    }

    const formData = new FormData();
    formData.append('profile', selectedFile);

    try {
        const response = await fetch( `${process.env.REACT_APP_API_BASE_URL}/users/profile-photo/${user?.username}`, {
            method: 'POST',
            headers:{
              'Authorization': `Bearer ${getAccessToken()}`
            },
            body: formData,
        });

        if (response.ok) {
            console.log('File uploaded successfully');
            // window.location.reload();
            dispatch(fetchUser()).then(()=>{
              setLoading(false);

            })

            
        } else {
            console.error('File upload failed:', response.statusText);
        }
    } catch (error) {
        console.error('Error uploading file:', error);
    }
};

  // JAB TU DUSRE KI PROFILE DEKHEGA TO USERNAME SE BHI DATA NIKALNA PADEGA
  useEffect(() => {

    setUser(data);

    // const fetchUserDetails = async () => {
    //   try {


    //     const response = await fetch('', {
    //       headers: {
    //         Authorization: `Bearer ${getAccessToken()}`,
    //       },
    //     });
    //     if (!response.ok) {
    //       throw new Error('Failed to fetch repository contents');
    //     }

    //     const data = await response.json();
    //     // setUser(data);
    //   } catch (error) {
    //     console.error('Error fetching repository contents:', error.message);
    //   }
    // };

    //   fetchUserDetails();
  }, [user])

  return (

    (!isLoading ) ?
    <div className='frame'>
      {
        editform && <ProfileEditForm setEditForm={setEditForm} username={username} setUser={setUser} />
      }
      <div className="left-frm">
        <div className="prf-img">
          <section className={user?.profile ? "img with-image" : "img without-image"}>
            {user?.profile ? (
              !loading ?<img src={user?.profile} alt="" /> :<div class="spinner-border" id='img-load' role="status">
              <span class="sr-only">Loading...</span>
            </div>
            ) : (
              <div className="no-image-placeholder">No Image</div>
            )}
            <p className='hoverProfile'><input type="file" name="profile" id='profile-upload' ref={profileRef} onChange={handleProfileChange}/>Upload photo</p>
          </section>

          <section className='names'>
            <div>
              <h5>{user?.fullname}</h5>
              <h6>@{user?.username}</h6>
            </div>
            <div className="prf-ed">
              <i class="fa-regular fa-pen-to-square" onClick={() => setEditForm(true)}></i>
            </div>
          </section>
        </div>

        <div className="coreDetail">
          <section>
            {/* <p id='part'>Contacts</p> */}
            <ul id='c-info'>
              <li><p className='lt'>Phone</p> <p className='rt'>+91 {user?.phone}</p></li>
              <li><p className='lt'>Address</p><p className='rt'>{user?.address}</p></li>
            </ul>
            <div className="socials">
              <a target='_blank' href={user?.githubProfile}><img src={github} alt="" /></a>
              <a target='_blank' href={user?.linkedinProfile}><img src={linkedin} alt="" /></a>
              <a target='_blank' href={user?.email}><img src={email} alt="" /></a>
            </div>
          </section>
        </div>

      </div>
      <div className="right-frm">
        <div className="detl">
          <section className="block">
            <p id='part'>College</p>
            <h6>{user?.collegName}</h6>
            <p>{user?.collegeAddress}</p>
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
    : <h1>Loading...</h1>
  )
}
