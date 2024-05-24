import React from 'react'
import Todo from './Todo/Todo'
import LongPlans from './LongPlans/LongPlans'
import Bills from './Bills'
import Reminders from './Reminders'
import '../../Styles/Dashboard.css'

export default function Dashboard() {
  return (
    <div className="dashboard">
    <section id='userTasksBills'>
       <Todo/>
       <Bills/>
    </section>
       <LongPlans/>
        <Reminders/>
    </div>
  )
}
