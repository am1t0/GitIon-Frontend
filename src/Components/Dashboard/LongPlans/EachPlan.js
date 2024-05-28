import React, { useState } from 'react'
import '../../../Styles/EachPlan.css'
import team from '../../../Images/LandingTeam.png'

export default function EachPlan({plan,setPlan}) {
  const [content,setContent] = useState(null);
  const [mnpClass,setMnpClass] = useState('mnp');
  const [mnppOp,setMnpOp] = useState(null); // for showing the modifying options for each plan
  
  // setting the id of plan of which modifying options is clicked
  const handleMnpShow=(title)=>{
    if(!mnppOp) {
      setMnpOp(title);
      setMnpClass('mnp-2');
    }
    else{ 
      setMnpOp(null);
      setMnpClass('mnp')
    }
  }
  return (    
    <div class="plan-card">
    <div class="plan-header">   {/* head of the card  */}
    <div>
      <span class="plan-tag">{plan.tag}</span>
      <span className='view' onClick={()=>{setPlan(plan)}}>view</span>
    </div>
      <div>
      <i class="fa-solid fa-ellipsis" id={`${mnpClass}`}  onClick={()=>handleMnpShow(plan.title)}></i>   {/* three dots for options to modify plans  */}
      { mnppOp===plan.title &&
      <ul id="mnpOp">       {/* providing options of modifying plan onClicking three dots icon */}
          <li>
          <i class="fa-solid fa-image"></i>
            <span>Set Image</span>
          </li>
          <li>
            <i id="upd" class="fa-solid fa-pen-to-square" aria-hidden="true"></i>
             <span>Edit</span>
          </li>
          <li>
          <i id="del" class="fa-solid fa-trash" aria-hidden="true"></i>
           <span>Delete</span>
           </li>
       </ul>
      }
      <span class="plan-duration">{plan.duration}</span>
      </div>
    </div>
    <div class="plan-image">
      <img src={team} alt={`plan Image`}/>
    </div>
    <div class="plan-progress">
      <div class="loading-bar">
        <div class="progress">
          {/* percentage show krna hai  */}
        {/* <p className="percentage">{plan.progress}</p> */}
        </div>     
      </div>
    </div>
    <section class="plan-content">
      <h6 class="plan-title">{plan.title}</h6>
     
      <p class="plan-description">{plan.description}</p>

    </section>
  </div>
  
  )
}
