import React from 'react'
import CreateTodo from './CreateTodo'

export default function TodoCreateBtn({create,setCreate,handleTodoCreated,handleCreate}) {
  return (
    <div className="createBtn">
       {  
         !create && <button className="btn btn-warning" onClick={handleCreate}>Create</button>
       }         
         {
            create && <CreateTodo handleTodoCreated={handleTodoCreated}/>
         }
     </div>
  )
}
