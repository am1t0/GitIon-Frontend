import React, { useEffect, useRef, useState } from 'react'
import getAccessToken from '../../../Utils/auth';
import '../../../Styles/Todo.css'
import CreateTasks from './CreateTasks';
import TodoList from './TodoList';

export default function Todo() {
  const taskRef = useRef();
  const timeRef = useRef();
  const [action,setAction] = useState();

    const [todos, setTodos] = useState([]);
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
  
        } catch (error) {
          console.error('Error fetching user data:', error.message);
        }
      };
      fetchTodos();
    }, []);

    // fn for creating the todo in db
    const handleTodoCreate = async () => {
      let newTodo = {
        title: taskRef.current.value,
        time:timeRef.current.value
      }
      try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/todos/create-todo`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${getAccessToken()}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newTodo)
        });
    
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
    
        const result = await response.json();
        const todoCreated = result.data;
        handleTodoCreated(todoCreated);

        taskRef.current.value = null;
        timeRef.current.value = null;


        setAction('Created!');

      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };
    
    // for adding the new todo to the state
    const handleTodoCreated = (newTodo) => {
      setTodos((prevTodos) => [...prevTodos, newTodo]);
    }
    // for deleting the todo in db
    const handleTodoDelete = async (todoId) => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/todos/${todoId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${getAccessToken()}`,
          },
        });
    
        if (!response.ok) {
          console.log(response);
          throw new Error('Network response was not ok');
        }
    
        // Check if the response body exists and has content
        const result = response.status !== 204 ? await response.json() : null;
    
        handleTodoDeleted(todoId);
      } catch (error) {
        console.log('error', error);
      }
    };
    

    // for filtering out the todo from state
    const handleTodoDeleted = (todoId) => {
      setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== todoId))
    }
  return (
    <aside>

    <h1 className='Topic'>Today</h1>

     <section id='todoContainer'>

      <CreateTasks taskRef={taskRef} timeRef={timeRef} handleCreate={handleTodoCreate}/>
      
      {/* message of creations/updating/deleting  */}
       <h6 style={{}}>{action}</h6>

      <TodoList todos ={todos} handleDelete={handleTodoDelete}/>
      
      </section>
    </aside>
  )
}
