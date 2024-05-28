import React, { useState } from 'react'
import Descripton from '../Description.js'
import RemindersList from './RemindersList.js';
import CreateReminder from './CreateReminder.js';
import '../../../Styles/Reminders.css'

export default function Reminders() {

  const [remForm,setRemForm] = useState(false);
  return (
    <section id='reminder'>
      <div className="Topic">
        <h2>Reminders</h2>
      </div>

      {/* showing form for adding new reminder */}
      <div className="addnew" onClick={()=> setRemForm(true)}>
        <i class="fa-solid fa-plus"></i>
        <p id='add'>Add</p>
      </div>

      {
        remForm && <CreateReminder/>
      }

      {/* intro and options to create a new plan  */}
      {/* <Descripton desc={desc}/> */}

      {/* containing list of all reminders */}
      <RemindersList />

    </section>
  )
}
