import React, { useEffect, useRef, useState } from 'react';
import "../../Styles/ProjectTasks.css";
import { useSelector } from 'react-redux';
import getAccessToken from '../../Utils/auth';
import { json } from 'react-router-dom';

export default function ProjectTasks() {
   const [tasks,setTasks] = useState();
   const {data} = useSelector((store)=> store.currProject);
   const project = data;

   const [showOptions, setShowOptions] = useState(false);
const [selectedTask, setSelectedTask] = useState(null);


   // data of new task creation collectin usng refs
   const nameRef = useRef();
   const statusRef = useRef();
   const assigneeRef = useRef();
   const dueRef = useRef();
   const priorityRef = useRef();
   const descriptionRef = useRef();

   const handleTaskCreate = async () => {
    const name = nameRef.current.value;
    const status = statusRef.current.value;
    const assignee = assigneeRef.current.value;
    const due = dueRef.current.value;
    const priority = priorityRef.current.value;
    const description = descriptionRef.current.value;

    // making the task object 
    const taskData = {
      name,
      status,
      assignee,
      due,
      priority,
      description
    };

    setTasks([...tasks,taskData]);
  
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/tasks/create-task/${project?._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getAccessToken()}`
        },
        body: JSON.stringify(taskData)
      });
  
      if (!response.ok) {
           
           return  Promise.reject(response);     
      } 

      nameRef.current.value= null;
      statusRef.current.value = null;
      assigneeRef.current.value = null;
      dueRef.current.value = null;
      priorityRef.current.value = null;
      descriptionRef.current.value = null;
  
    } catch (error) {
       setTasks(tasks.filter((task)=> task!==taskData));

      console.error('Error creating task:', error);
    }
  };
  
  useEffect(()=>{
    
        const fetchTasks =  async ()=>{
          try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/tasks/getTasks/${project?._id}`, {
              method: 'GET',  
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getAccessToken()}`
              },
            });
    
            if (!response.ok) {
              return  Promise.reject(response);
            }
           const res = await response.json();
           
           // populating the tasks state
           setTasks(res.data);
            
          } catch (error) {
            return  error.message || "An error occurred while loading";
          }
        }
        fetchTasks();
  },[])
  return (
    <div id='tasks'>
      {/* <section className='var'></section> */}
      <section className='tasktable'>
        <tab>
          <thead>
            <tr>
              <th>Task ID</th>
              <th>Task Name</th>
              <th><i class="fa-solid fa-signal"></i>Status</th>
              <th><i class="fa-solid fa-user"></i>Assignee</th>
              <th><i class="fa-solid fa-calendar-days"></i>Due Date</th>
              <th><i class="fa-brands fa-product-hunt"></i>Priority</th>
              <th><i class="fa-solid fa-circle"></i>Description</th>
            </tr>
          </thead>
          <tbody>
            { tasks && tasks.map((task)=>(
            <tr>
              <td id="taskM"> 
                <div id='hoverOp'>
                <i class="fa-solid fa-plus"></i>
                <i class="fa-solid fa-list-ul"onClick={(e) => {
        e.stopPropagation(); // Prevent the parent tr's onMouseLeave event from firing
        setShowOptions(!showOptions);
        setSelectedTask(task._id);
      }}></i>
        {showOptions && selectedTask === task._id&& (
        <ul className="options-list">
          <li>Edit</li>
          <li>Delete</li>
        </ul>
      )}
                </div>
                 <p>
                   {task.name[0]}
                 </p>
              </td>
              <td>
               <span>
              <i class="fa-regular fa-file"></i>
                {task.name}
              </span>
              <span id='open'>
                 open
              </span>
              </td>

              <td id='status'><p>{task.status}</p></td>
              <td>{task.assignee}</td>
              <td>{task.due}</td>
              <td id='priority'><p>{task.priority} Le ke AA</p></td>
              <td>{task.description}</td>
            </tr>
            ))
            }
            <tr id='nwTask'>
              <td id='crtBtn'><button  onClick={handleTaskCreate}>create</button></td>
              <td><input type="text" placeholder='Task name' ref={nameRef}/></td>
               <td>
                <select ref={statusRef}>
                   <option value="Not started">Not started</option>
                   <option value="Pending">Pending</option>
                   <option value="In progress">In progress</option>
                 </select>
                </td>
                <td><input type="text" placeholder='Assignee' ref={assigneeRef}/></td>
                <td><input type="date"  placeholder='task name' ref={dueRef}/></td>
                <td>
                <select ref={priorityRef}>
                   <option value="Low">Low</option>
                   <option value="High">High</option>
                   <option value="Medium">Medium</option>
                 </select>
                </td>
                <td><input type="text" placeholder='Description' ref={descriptionRef}/></td>
            </tr>
          </tbody>
        </tab>
      </section>
    </div>
  );
}
