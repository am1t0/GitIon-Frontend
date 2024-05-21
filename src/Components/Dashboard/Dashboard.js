import React from 'react'
import Todo from './Todo/Todo'
import LongPlans from './LongPlans'
import Bills from './Bills'
import Reminders from './Reminders'
import '../../Styles/Dashboard.css'

export default function Dashboard() {
  return (
    <div className="dashboard">
    <section id='userTasks'>
       <Todo/>
       <LongPlans/>
    </section>

    <section id="userRemBills">
        <Bills/>
        <Reminders/>
    </section>
    </div>
  )
}
