import React, { useState } from 'react'
import EachReminder from './EachReminder';
import '../../../Styles/RemindersList.css'

export default function RemindersList() {
    const reminders = [
        {
          id: 1,
          title: "Doctor's Appointment",
          description: "Visit Dr. Smith for the annual check-up.",
          dueDate: "2024-05-30",
          time: "09:00:00",
          location: "123 Health St, Medical City",
          tag: "Health"
        },
        {
          id: 2,
          title: "Team Meeting",
          description: "Monthly team meeting to discuss project progress.",
          dueDate: "2024-06-01",
          time: "14:00:00",
          location: "Conference Room B, Office Building",
          tag: "Work"
        },
        {
          id: 3,
          title: "Grocery Shopping",
          description: "Buy groceries for the week: milk, eggs, bread, fruits, and vegetables.",
          dueDate: "2024-05-29",
          time: "17:00:00",
          location: "SuperMart, Downtown",
          tag: "Personal"
        },
        {
          id: 4,
          title: "Anniversary Dinner",
          description: "Dinner reservation at Le Gourmet to celebrate the anniversary.",
          dueDate: "2024-06-05",
          time: "19:00:00",
          location: "Le Gourmet, Sunset Blvd",
          tag: "Personal"
        },
        {
          id: 5,
          title: "Workout Session",
          description: "Attend the fitness class at the gym.",
          dueDate: "2024-05-28",
          time: "07:00:00",
          location: "Fitness Center, Maple St",
          tag: "Fitness"
        }
      ];
      
      
    // state for showing options of reminder modifications
    const [mnOp,setMnOp] = useState(null);

    // setting the state to clicked reminder
    const handleReminderClick=(id)=>{
        if(mnOp===id){
            setMnOp(null);
        }
        else setMnOp(id);
    }
      
  return (
    <section className='RemindersList'>
 
    {/* { planSelected &&  <SelectedPlan plan={planSelected} setPlan={setPlanSelected}/>} */}
       
      {/* for showing list of all reminders  */}
      <div className="reminderlistContainer">
     {reminders?.map((reminder)=>{
       return  <EachReminder reminder={reminder} mnOp={mnOp} handleReminderClick={handleReminderClick}/>
     })}
      </div>
   </section>
  )
}
