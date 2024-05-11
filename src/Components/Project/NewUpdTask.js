import React, { useRef } from 'react'
import { useSelector } from 'react-redux';
import getAccessToken from '../../Utils/auth';

export default function NewUpdTask({setTasks,tasks,target,taskToUpdate,setEditedTaskData}) {
    const { data } = useSelector((store) => store.currProject);
    const project = data;

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
  
      setTasks([...tasks, taskData]);
  
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
  
          return Promise.reject(response);
        }
  
        nameRef.current.value = null;
        statusRef.current.value = null;
        assigneeRef.current.value = null;
        dueRef.current.value = null;
        priorityRef.current.value = null;
        descriptionRef.current.value = null;
  
      } catch (error) {
        setTasks(tasks.filter((task) => task !== taskData));
  
        console.error('Error creating task:', error);
      }
    };

    const handleUpdateTask = async () => {
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
    
         // Update existing task if it exists in the tasks array
     const updatedTasks = tasks.map(task => {
    if (task._id === taskToUpdate._id) {
      return taskData; // Update the task with new data
    }
    return task; // Keep other tasks unchanged
  });

  setTasks(updatedTasks);
    
  // now saving those changes to database
        try {
          const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/tasks/update-task/${project?.owner}/${taskToUpdate?._id}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${getAccessToken()}`
            },
            body: JSON.stringify(taskData)
          });
    
          if (!response.ok) {
            return Promise.reject(response);
          }
    
      
    
        } catch (error) {
          console.error('Error creating task:', error);
        }
    }
  return (
    <tr id='nwTask'>
    {/* {target==='update' && <button onClick={()=>{setEditedTaskData(null)}}>cancel</button>} */}
    <td id='crtBtn'><button onClick={target==='create'?handleTaskCreate : handleUpdateTask }>{target}</button></td>
    <td className='name'><input type="text" placeholder='Task name' defaultValue={taskToUpdate?.name} ref={nameRef} /></td>
    <td className='state'>
      <select ref={statusRef}>
        <option value="Not started">Not started</option>
        <option value="Pending">Pending</option>
        <option value="In progress">In progress</option>
      </select>
    </td>
    <td className='assignee'><input type="text" placeholder='Assignee' defaultValue={taskToUpdate?.assignee} ref={assigneeRef} /></td>
    <td className='due'><input type="date" placeholder='task name' defaultValue={taskToUpdate?.due} ref={dueRef} /></td>
    <td className='priority'>
      <select ref={priorityRef}>
        <option value="Low">Low</option>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
      </select>
    </td>
    <td className='descrip'><input type="text" defaultValue={taskToUpdate?.description} placeholder='Description' ref={descriptionRef} /></td>
  </tr>
  )
}
