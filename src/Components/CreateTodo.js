import React, { useRef } from 'react'
import getAccessToken from '../Store/auth';
import "../Styles/CreateTodo.css"

export default function CreateTodo({handleTodoCreated}) {

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

          // setCreate(false);
    
          // Clear form fields
          titleRef.current.value = '';
          descriptionRef.current.value = '';
        } catch (error) {
          console.error('Error creating todo:', error.message);
          // Handle error
        }
      };
  return (
    <div className='todoCreate'>
       <div className="todoImg">
        <img src="https://static.wixstatic.com/media/4bd742_76770b3167eb5e76ad1027505afce56b.png/v1/fill/w_560,h_252,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/4bd742_76770b3167eb5e76ad1027505afce56b.png" alt="" />
       </div>
      <div className='todoForm'>
    <form onSubmit={handleSubmit}>
      <div className='inputs'>
        <input type="text" id="title" ref={titleRef} required  placeholder='title'/>
      </div>
      <div className='inputs'>
        <textarea id="description" ref={descriptionRef} required placeholder='description'></textarea>
      </div>
      <div>
        <button className='btn btn-warning' type="submit">Create</button>
      </div>
    </form>
      </div>
  </div>

  )
}
