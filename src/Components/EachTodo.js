import React from 'react'
import getAccessToken from '../Store/auth';

export default function EachTodo({todo,handleTodoDelete}) {
 const handleDelete=async ()=>{
  try {
    // Assuming your server API endpoint for deleting a todo is '/api/todos/:id'
    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/todos/${todo._id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
         'Authorization':`Bearer ${getAccessToken()}`
      },
    });
     console.log('Delete is successfull!!')
    if (!response.ok) {
      throw new Error(`Error deleting todo: ${response.statusText}`);
    }
    handleTodoDelete(todo._id);
  
  } catch (error) {
    console.error(error.message);
  }
};
  return (
       <li style={{display:'flex',justifyContent:'space-between',border:'2px solid blue', margin:'20px',listStyle:'none'}}>
        
        <h5>{todo.title}</h5>
         <button onClick={handleDelete}>delete</button>
        </li>
  )
}
