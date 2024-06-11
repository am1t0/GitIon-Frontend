import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

export default function Notifications() {
    // user's data from store
    const user = useSelector((store)=> store.user.data);

    //invitations 
    const [invitations,setInvitations] = useState([])

    useEffect(()=>{
        const fetchPendingInvitations = async (userToken) => {
          const url = 'https://api.github.com/user/repository_invitations';
        
          try {
            const response = await fetch(url, {
              method: 'GET',
              headers: {
                'Authorization': `token ${userToken}`,
                'Accept': 'application/vnd.github.v3+json'
              }
            });
        
            if (response.ok) {
              const data = await response.json();
              setInvitations(data)
            } else {
              const errorData = await response.json().catch(() => null);
              console.error('Error fetching pending invitations:', errorData || response.statusText);
              return null;
            }
          } catch (error) {
            console.error('Error:', error);
            return null;
          }
        };
        fetchPendingInvitations(user.gitToken);
      },[])

  return (
    <div className="notifications">
    <h5>Notifications</h5>
       <section className="collaborations">
        <h6>Invites</h6>
        <ul>{
            invitations.map((invitation)=>(
              <div 
               key={invitation.id} 
               className='eachInv'
              >
                <p>Invitation to join {invitation.repository.full_name} from {invitation.inviter.login}</p>
                <button className='btn btn-primary mx-2'>accept</button>
                <button className='btn btn-danger mx-2'>decline</button>
              </div>
            ))
            }
        </ul>
       </section>
  </div>
  )
}
