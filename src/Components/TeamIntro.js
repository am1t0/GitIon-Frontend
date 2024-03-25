import React, { useState,useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom';
import "../Styles/TeamIntro.css"
import getAccessToken from '../Store/auth';
import { useSelector } from 'react-redux';

export default function TeamIntro() {
  // getting the team object that passed while navigating this route
  const location = useLocation();
  const team = location.state?.team;

  // getting the user from store
  const user = useSelector((state)=>state.user.user);

  // state variable for the storing details of each member
  const [member,setMember] = useState([]);

  const usernameRef = useRef();

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
        setMember([...member,addedMember]);

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
            <h3 >Meet the team {team.name}!</h3>
            <div id="desc">
            <h6>{team.description}</h6>
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
              { (user?._id===team.owner) &&
              <div>
              <input type="search" ref={usernameRef}  placeholder='Enter username to add' />
              <div className="logo">
               <i onClick={handleAddMember} className="fa-solid fa-plus"></i>
              </div>
              </div>
              }
            </div>
            <div id="teamMemb">
              {member.length === 0 && (
          <p>No team members found.</p>
        )}
              <div id="members">
              {/* <h5 className='com'>Members</h5> */}
              <ul>
                {
                  member.map((member)=>(
                    <>
                    <div id="eachMemb">
                        
                       {(member._id!==team.owner) 
                       ? <li><p>{member.fullname}</p> <p>{member.email}</p></li>
                       : <li id='admin'><h6>{member.fullname}</h6><h6>{member.email}</h6> <button className='btn btn-success'>admin</button></li> }
                
                     {(member._id!==team.owner && user?._id===team.owner) && <button onClick={()=>handleRemoveMember(member._id,member.fullname)} className='btn btn-danger'>D</button>}
                       
                    </div>
                    </>
                  ))
                  }
              </ul>
              </div>
            </div>
          </div>
        </div>
        <div id="team-Imp">
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
        </div>
    </div>
  )
}
