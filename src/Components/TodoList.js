import React from 'react'
import EachTodo from './EachTodo'

export default function TodoList({todoList,handleTodoDelete}) {
  return (
    <div className='container'>
       {
        todoList.map((todo)=>{
            return <EachTodo todo={todo} handleTodoDelete={handleTodoDelete}/>
        })
       }
    </div>
  )
}
