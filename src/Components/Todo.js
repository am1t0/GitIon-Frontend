import React, { useEffect, useState } from 'react'
import getAccessToken from '../Store/auth';
import TodoList from './TodoList';
import CreateTodo from './CreateTodo';

export default function Todo() {
    const [create,setCreate] = useState(false);
    const handleCreate=()=>{
         setCreate(!create);
    }
    const [todos,setTodos] = useState([]);
    useEffect(() => {
        const fetchTodos = async () => {
         try {
              const accessToken = getAccessToken();
            if (!accessToken) {
              console.error('Access token not found');
              return;
            } 
            
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/todos/get-todos`, {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
              },
            });
             
           
            if (!response.ok) {
              console.error('Error:', response.statusText);
              return;
            }
           
            const data = await response.json();

            setTodos(data.data);
            console.log(todos);
            
          } catch (error) {
            console.error('Error fetching user data:', error.message);
          }
        };
       fetchTodos();
      }, []);

    const handleTodoCreated=(newTodo)=>{
        setTodos((prevTodos)=>[...prevTodos,newTodo]);
    }
    const handleTodoDelete=(todoId)=>[
        setTodos((prevTodos)=>prevTodos.filter((todo)=> todo._id!==todoId))
    ]
  return (
   
     <div>
     <div className="container">
         <button className="btn btn-primary" onClick={handleCreate}>Create</button>
         {
            create && <CreateTodo setCreate={setCreate} handleTodoCreated={handleTodoCreated}/>
         }
     </div>
     { 
     (todos.length>0 )

     ? <TodoList todoList={todos} handleTodoDelete={handleTodoDelete} />
     
     :<h2>You don't have any Todo</h2>
     }
     </div>
  )
}
