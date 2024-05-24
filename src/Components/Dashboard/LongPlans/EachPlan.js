import React, { useState } from 'react'
import '../../../Styles/EachPlan.css'
import team from '../../../Images/LandingTeam.png'

export default function EachPlan({plan}) {
  const [content,setContent] = useState(null);
  
  return (
    <div class="plan-card">
    <div class="plan-header">
      <span class="plan-tag">{plan.tag}</span>
      <span class="plan-duration">{plan.duration}</span>
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

       <div className='open'><i class="gfg-icon gfg-icon_arrow-down gfg-icon_header"></i></div>
      <div className="plan-milestones">
      {
        plan.milestones.map((milestone)=>{
            return <div className='milestone'>
             <input type="checkbox" id='milestone'/>
             <p>{milestone}</p>
              </div>
        })
      }
      </div>
    </section>
  </div>
  
  )
}
