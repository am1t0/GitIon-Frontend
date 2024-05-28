import React, { useState } from 'react'
import '../../../Styles/EachReminder.css'

export default function EachReminder({ reminder, mnOp, handleReminderClick}) {
  
    return (
        <div className="reminder">
            <div className='remHead'>
                <span className="remTag">{reminder.tag}</span>
                {/* on clicking dots options should be visible  */}
                <i class="fa-solid fa-ellipsis" id='dots' onClick={()=>handleReminderClick(reminder.id)}></i>
                {
                      mnOp===reminder.id &&
                      <ul id="opL">       {/* providing options of modifying plan onClicking three dots icon */}
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
            </div>
            <div className='mBox'>
            <div className="remTitle">
                <h5>{reminder.title}</h5>
            </div>
            <div className="remDesc">
                <p>{reminder.description}</p>
            </div>
            </div>
            {/* creating a horizontal line */}
            <div className="hr">
                <hr />
            </div>
            <div className="remFoot">
                <div className="location">
                    <i class="fa-solid fa-location-dot"></i>
                    <span>{reminder.location}</span>
                </div>
                 <div className="timeDate">
                    <p>{reminder.dueDate}</p>
                    <p>{reminder.time}</p>
                 </div>
            </div>
        </div>
    )
}
