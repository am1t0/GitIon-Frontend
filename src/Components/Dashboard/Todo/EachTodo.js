import React from 'react';
import '../../../Styles/EachTodo.css';

export default function EachTodo({ todo }) {
  return (
    <div id='eachTodo' className='todo-container'>
       <input type="checkbox" name="dnud" id="dnud" />
       <p className='todo-title'>{todo.title}</p> 
       <p className='todo-date'>{todo.date}</p>
       <i className="fa-solid fa-ellipsis"></i>
    </div>
  );
}
