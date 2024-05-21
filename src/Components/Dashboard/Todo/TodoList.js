import React from 'react'
import EachTodo from './EachTodo'

export default function TodoList({todos}) {

  const tempTodo = [
    {
      title: 'Meeting with client',
      date: '15 Mar'
    },
    {
      title: 'Grocery shopping',
      date: '20 Apr'
    },
    {
      title: 'Call mom',
      date: '01 May'
    },
    {
      title: 'Dentist appointment',
      date: '10 Jun'
    },
    {
      title: 'Submit report',
      date: '25 Jul'
    },
    {
      title: 'Pick up dry cleaning',
      date: '08 Aug'
    },
    {
      title: 'Pay electricity bill',
      date: '17 Sep'
    },
    {
      title: 'Finish book',
      date: '23 Oct'
    },
    {
      title: 'Plan vacation',
      date: '05 Nov'
    },
    {
      title: 'Renew passport',
      date: '12 Dec'
    }
  ];
  
  return (
       <section className="todoList">
          {/* below them the corresponding content will be shown   */}
          <div className="labels">
            <h6 id='tk'>TASK</h6>
            <h6 id='d'>DUE</h6>
            <h6 id='ed'>EDIT</h6>
          </div>

          {/* contaning the list of todos  */}
          <div className="todos">
            {
              tempTodo?.map((todo)=>{
                return  <EachTodo todo={todo}/>
              })
            }
          </div>
       </section>
  )
}
