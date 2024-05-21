import React from 'react'

export default function CreateTasks({taskRef,dateRef}) {
  return (
    <section className='creation'>
         {/* creation component bar  */}

        {/* for inputing the todo/taks from user  */}
         <input 
         type="text" 
         placeholder='Enter your task...' 
         id='td'
         ref={taskRef}
         />

         {/* for inputing time  */}
         <input
          type="time" 
          name="due" 
          id='du'
          ref={dateRef}
          />

          {/* button for creation of todo  */}
         <button type="button" id='crt'>create</button>
       </section>
   
  )
}
