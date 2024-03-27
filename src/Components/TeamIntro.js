import React, { useState,useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom';
import "../Styles/TeamIntro.css"
import getAccessToken from '../Store/auth';
import { useSelector } from 'react-redux';
import membAdd from "../Sound/membAdd.wav"

export default function TeamIntro() {
  // getting the team object that passed while navigating this route
  const location = useLocation();
  const team = location.state?.team;

  // getting the user from store
  const user = useSelector((state)=>state.user.user);

  // state variable for the storing details of each member
  const [member,setMember] = useState([]);

  const [arrow, setArrow] = useState(null);

  const [admin, setAdmin] = useState(null);

  const usernameRef = useRef();
  const audioRef = useRef();

  useEffect(() => {
    const getAdmin = () => {
      let adminMember = null;

      member.forEach(member => {
        if (team?.owner === member._id) {
          adminMember = member;
        }
      });

      return adminMember;
    };

    // Execute the getAdmin function and set the result to the admin state
    setAdmin(getAdmin());
  }, [member, team?.owner]); 

  useEffect(() => {
    // Fetch member details when the component mounts
    fetchMemberDetails();
  }, [team]);

  const fetchMemberDetails= async () =>{
     try {

      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/teams/members/${team._id}`, {
        method: 'GET',  // Adjust the method and endpoint based on your API
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getAccessToken()}`
        },
      });;

      if (!response.ok) {
        console.error('Error:', response.statusText);
        return;
      }
      const memberObj = await response.json();
      const memberData = await memberObj.data;
      setMember(memberData);
      
      
     } catch (error) {
      console.error('Error in showing members of teams:', error.message);
     }
  }

  const handleAddMember= async () =>{
    try{
        let username = usernameRef.current.value;

        if(!username) return  alert("Username can't be empty");

        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/teams/add-members`,{
          method: 'POST',
          body:JSON.stringify({
            username:username ,
            teamId: team._id
          }),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getAccessToken()}`
          },
        })
        
        if (!response.ok) {
          console.error('Error:', response.statusText);
          return;
        }
        const responseJson = await response.json();
        const addedMember = await responseJson.data;
        setMember([addedMember,...member]);
        
        // playing add sound on member successfully addition
        audioRef.current.play();

        usernameRef.current.value ='';
        
       } catch (error) {
        console.error('Error in showing members of teams:', error.message);
       }
  }

  const handleRemoveMember= async (memberId,memberName) =>{
       try {
         const response  = await fetch(`${process.env.REACT_APP_API_BASE_URL}/teams/remove-members`,{
          method: 'POST',
          body:JSON.stringify({
            memberId : memberId,
            teamId: team._id
          }),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getAccessToken()}`
          },
        })

        if (!response.ok) {
          console.error('Error:', response.statusText);
          return;
        }

        const updated = member.filter((m)=> m.fullname!==memberName)
        for (let index = 0; index < updated.length; index++) {
          const element = updated[index];
          console.log('name : '+element.fullname);
        }
        setMember(updated);

       } catch (error) {
        console.log("error in removing member : ",error)
       }
  }

  return (
    <div  className="team-intro">
        <div id="intro-memb">
          <div id="intro">
            <h3 >Meet the team {team?.name}!</h3>
            <div id="desc">
            <h6>{team?.description}</h6>
            </div>
             <div style={{width:'100%',height:'1px',background:'rgba(145, 144, 144, 0.4)'}}></div>
          </div>
          <div id="memb">
            <div id="search-add">
              <div >
              <input type="search" placeholder='Search team members' required/>
              <div className="logo">
              <i class="fa-solid fa-magnifying-glass"></i>
              </div>
              </div>
              { (user?._id===team?.owner) &&
              <div>
              <input type="search" ref={usernameRef}  placeholder='Enter username to add' />
              <div className="logo" onClick={handleAddMember} >
               <i className="fa-solid fa-plus"></i>
               <audio ref={audioRef} src={membAdd}/>
              </div>
              </div>
              }
            </div>
            <div id="teamMemb">
              {member.length === 0 && (
          <p>No team members found.</p>
        )}
              <div id="members">
              <li id='admin'><h6>{admin?.fullname}</h6> <h6>{admin?.email}</h6> <button className='btn btn-success'>admin</button></li>
              <ul>
                {
                  member.map((member)=>(
                    <>
                    <div id="eachMemb">

                     <li>
                     <div className="arrow" onClick={() => {setArrow(arrow===member.email?null:member.email) }}  style={{ rotate: (arrow===member.email) ? '0deg' : '-90deg'}} ><svg viewBox="-122.9 121.1 105.9 61.9" class="icon-arrow-down-mini" width="10" height="10"><path d="M-63.2,180.3l43.5-43.5c1.7-1.7,2.7-4,2.7-6.5s-1-4.8-2.7-6.5c-1.7-1.7-4-2.7-6.5-2.7s-4.8,1-6.5,2.7l-37.2,37.2l-37.2-37.2
 c-1.7-1.7-4-2.7-6.5-2.7s-4.8,1-6.5,2.6c-1.9,1.8-2.8,4.2-2.8,6.6c0,2.3,0.9,4.6,2.6,6.5l0,0c11.4,11.5,41,41.2,43,43.3l0.2,0.2
 C-73.5,183.9-66.8,183.9-63.2,180.3z"></path></svg></div>
                      <p>{member.fullname}</p> 
                      <p>{member.email}</p>
                      </li>
                
                     {(user?._id===team?.owner) && <button onClick={()=>handleRemoveMember(member._id,member.fullname)} className='btn btn-danger'>D</button>}
                       
                    </div>
                    {arrow===member.email && <h6>ISKO SHI DETAIL KE SATH SHOW KRNA HAI</h6>}
                    </>
                  ))
                  }
              </ul>
              </div>
            </div>
          </div>
        </div>
        {/* <div id="team-Imp">
          <div id="obj">
            <div id="objImg">
              nothing now!
            </div>
            <div id="objList">
              <ul>
                <li>Lorem ipsum dolor sit amet consectetur.</li>
                <li>Lorem ipsum dolor sit.</li>
                <li>Lorem ipsum dolor sit amet.</li>
                <li>Lorem ipsum dolor sit ame</li>
              </ul>
            </div>
          </div>
        </div> */}
    </div>
  )
}
