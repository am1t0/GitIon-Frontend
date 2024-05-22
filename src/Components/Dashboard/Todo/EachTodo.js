import React from 'react';
import '../../../Styles/EachTodo.css';

export default function EachTodo({ todo,handleDelete }) {
  return (
    <div id='eachTodo' className='todo-container'>
       <input type="checkbox" name="dnud" id="dnud" />
       <p className='todo-title'>{todo.title}</p> 
       <p className='todo-date'>{todo.time}</p>
       <div className="manpTd">
       <i id='upd' class="fa-solid fa-pen-to-square"></i>
       <i id='del' class="fa-solid fa-trash" onClick={()=>handleDelete(todo._id)}></i>
       </div>
    </div>
  );
}
