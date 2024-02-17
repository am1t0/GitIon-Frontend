import React, { useRef } from 'react'
import getAccessToken from '../Store/auth';

export default function CreateTodo({setCreate,handleTodoCreated}) {

    const titleRef = useRef();
    const descriptionRef = useRef();

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
          const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/todos/create-todo`, {
             method:'POST',
             headers: {
                'Content-Type': 'application/json',
                 'Authorization':`Bearer ${getAccessToken()}`
              },
              body: JSON.stringify({
                title: titleRef.current.value,
                description: descriptionRef.current.value,
              }),
          });
         
    
          const newTodo = await response.json();
        
          handleTodoCreated(newTodo.data);

          setCreate(false);
    
          // Clear form fields
          titleRef.current.value = '';
          descriptionRef.current.value = '';
        } catch (error) {
          console.error('Error creating todo:', error.message);
          // Handle error
        }
      };
  return (
    <div>
    <h2>Create New Todo</h2>
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" ref={titleRef} required />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea id="description" ref={descriptionRef} required></textarea>
      </div>
      <div>
        <button type="submit">Create Todo</button>
      </div>
    </form>
  </div>

  )
}
