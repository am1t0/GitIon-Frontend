import React, { useEffect, useState } from 'react'
import getAccessToken from '../../../Utils/auth';
import '../../../Styles/Todo.css'
import CreateTasks from './CreateTasks';
import TodoList from './TodoList';

export default function Todo() {
    const [create, setCreate] = useState(false);
    const handleCreate = () => {
      console.log('create clicked')
      setCreate(!create);
    }
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
          console.log(todos);
  
        } catch (error) {
          console.error('Error fetching user data:', error.message);
        }
      };
      fetchTodos();
    }, []);
  
    const handleTodoCreated = (newTodo) => {
      setTodos((prevTodos) => [...prevTodos, newTodo]);
    }
    const handleTodoDelete = (todoId) => [
      setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== todoId))
    ]
  return (
    <aside>

    <h1 className='Topic'>Today</h1>

     <section id='todoContainer'>

     <CreateTasks/>
      <TodoList/>
      
      </section>
    </aside>
  )
}
