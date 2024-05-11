import React, { useEffect, useRef, useState } from 'react';
import "../../Styles/ProjectTasks.css";
import { useSelector } from 'react-redux';
import getAccessToken from '../../Utils/auth';
import { json } from 'react-router-dom';
import NewUpdTask from './NewUpdTask';

export default function ProjectTasks() {
  const [tasks, setTasks] = useState();
  const { data } = useSelector((store) => store.currProject);
  const project = data;
  const my = useRef();


  const [selectedTask, setSelectedTask] = useState(null);
  const [editedTaskData, setEditedTaskData] = useState(null);



  const handleEditTask = (task) => {
    setEditedTaskData(task);
  };
  const handleDeleteTask = async (taskId) => {
    setTasks(tasks.filter((task) => task._id !== taskId));
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/tasks/task-delete/${project.owner}/${taskId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getAccessToken()}`
        },
      });

      console.log('respnse', response);
    } catch (error) {
      console.error('Error creating task:', error);
    }
  }

  useEffect(() => {

    const fetchTasks = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/tasks/getTasks/${project?._id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getAccessToken()}`
          },
        });

        if (!response.ok) {
          return Promise.reject(response);
        }
        const res = await response.json();

        // populating the tasks state
        setTasks(res.data);

      } catch (error) {
        return error.message || "An error occurred while loading";
      }
    }
    fetchTasks();
  }, [])
  return (
    <div id='tasks'>
      <section className='tasktable'>
        <table>
          <thead>
            <tr>
              <th id='tid'>Task ID</th>
              <th className='name'>Task Name</th>
              <th className='state'><i class="fa-solid fa-signal"></i>Status</th>
              <th className='assignee'><i class="fa-solid fa-user"></i>Assignee</th>
              <th className='due'><i class="fa-solid fa-calendar-days"></i>Due Date</th>
              <th className='priority'><i class="fa-brands fa-product-hunt"></i>Priority</th>
              <th className='descrip'><i class="fa-solid fa-circle"></i>Description</th>
            </tr>
          </thead>
          <tbody>
            {tasks && tasks.map((task) => (
              editedTaskData!==task ?(
              <tr>
                <td id="taskM">
                  <div id='hoverOp'>
                    <i class="fa-solid fa-plus"></i>
                    <i class="fa-solid fa-list-ul" onClick={(e) => {
                      e.stopPropagation(); // Prevent the parent tr's onMouseLeave event from firing
                      setSelectedTask(selectedTask !== task._id ? task._id : null);
                    }}></i>
                    {selectedTask === task._id && (
                      <ul className="options-list">
                        <li onClick={() => handleEditTask(task)}><i class="fa-solid fa-pen" ></i>Edit</li>
                        <li onClick={() => handleDeleteTask(task._id)}><i class="fa-solid fa-trash"></i>Delete</li>
                      </ul>
                    )}
                  </div>
                  <p>
                    {task.name[0]}
                  </p>
                </td>
                <td className='name'>
                  <span>
                    <i class="fa-regular fa-file"></i>
                    {task.name}
                  </span>
                  <span id='open'>
                    open
                  </span>
                </td>

                <td className='state'><p>{task.status}</p></td>
                <td className='assignee'>{task.assignee}</td>
                <td className='due'>{task.due}</td>
                <td className='priority'><p>{task.priority} Le ke AA</p></td>
                <td className='descrip'>{task.description}</td>
              </tr>)
                 : <NewUpdTask setTasks={setTasks} target={"update"} tasks={tasks} taskToUpdate={editedTaskData} setEditedTaskData={setEditedTaskData}/>  
                //  component for updating task
            ))
            }
           <NewUpdTask setTasks={setTasks} tasks={tasks} target={"create"}/>  
           {/* component for creating task */}
          </tbody>
        </table>
      </section>
    </div>
  );
}
