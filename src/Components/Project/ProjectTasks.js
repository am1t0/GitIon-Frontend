import React, { useEffect, useRef, useState } from 'react';
import "../../Styles/ProjectTasks.css";
import { useDispatch, useSelector } from 'react-redux';
import getAccessToken from '../../Utils/auth';
import { json, useParams } from 'react-router-dom';
import NewUpdTask from './NewUpdTask';
import { fetchMemberDetails } from '../../Data_Store/Features/memberSlice';
import { fetchCurrProject } from '../../Data_Store/Features/currProjectSlice';

export default function ProjectTasks() {
  const [tasks, setTasks] = useState([]);
  const { data } = useSelector((store) => store.currProject);
  const project = data;

  const {projectId} = useParams();
  

  const dispatch = useDispatch();
  const [selectedTask, setSelectedTask] = useState(null);
  const [editedTaskData, setEditedTaskData] = useState(null);

  const formateDate=(date)=>{

// Create a new date object from the given date string
const dateObj = new Date(date);

// Array of month names
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// Get the month, day, and year components from the date object
const month = monthNames[dateObj.getMonth()];
const day = dateObj.getDate();
const year = dateObj.getFullYear();

// Format the date as "month name dd, yyyy"
const formattedDate = `${month} ${day}, ${year}`;

  return formattedDate; // Output: "May 8, 2024"

  }
  const nameLogo =(name)=>{
    return  name[0].toUpperCase()+name.split(' ')[1][0].toUpperCase();
}
  const statusClass = (status) => {
  
    switch (status) {
      case 'Not started':
        return 'not-State';

      case 'Pending':
        return 'p-State';

      default:
        return 'prog-State';
    }
  }
  function getUserColor(user) {
    // Convert user's unique identifier (e.g., ID, username, or email) to a numeric hash
    let hash = 0;
    for (let i = 0; i < user.length; i++) {
      hash = user.charCodeAt(i) + ((hash << 5) - hash);
    }

    // Convert hash to a hexadecimal color code
    let color = "#";
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xFF;
      color += ("00" + value.toString(16)).substr(-2);
    }

    return color;
  }

  const handleEditTask = (task) => {
    setEditedTaskData(task);
  };
  const handleDeleteTask = async (taskId) => {

    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/tasks/task-delete/${project.owner}/${taskId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getAccessToken()}`
        },
      });

      console.log('respnse', response);
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error('Error creating task:', error);
    }
  }
  const TaskId = (project, num) => {
    const id = (project.name[0] + project.name[1]).toUpperCase() + '-' + (num + 1);
    return id;
  }
  useEffect(() => {

    dispatch(fetchCurrProject(projectId))

    // dispatch(fetchMemberDetails(project?.team));

    const fetchTasks = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/tasks/getTasks/${projectId}`, {
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
        console.log(res);
        setTasks(res.data);

      } catch (error) {
        return error.message || "An error occurred while loading";
      }
    }
    fetchTasks();

  }, [])
  return (
    data && 
    <div id='tasks'>
      <section className='tasktable'>
        <table>
          <thead>
            <tr>
              <th ><div id='hd'>Task ID</div></th>
              <th ><div id='hd'>Task Name</div></th>
              <th ><div id='hd'><i class="fa-solid fa-signal"></i>Status</div></th>
              <th ><div id='hd'><i class="fa-solid fa-user"></i>Assignee</div></th>
              <th><div id='hd'><i class="fa-solid fa-calendar-days"></i>Due Date</div></th>
              <th><div id='hd'><i class="fa-brands fa-product-hunt"></i>Priority</div></th>
              <th><div id='hd'><i class="fa-solid fa-circle"></i>Description</div></th>
            </tr>
          </thead>
          <tbody>
            {tasks && tasks.map((task, index) => (
              editedTaskData !== task ? (
                <tr>
                  {/* PUTTING <DIV> IN EACH <TD> AS STYLING IT IS TRICKY*/}
                  <td>
                    <div id='taskM'>
                      <p>
                        {TaskId(project, index)}
                      </p>
                      {/* OPTIONS SHOULD APPEAR TO ADMIN AND ON HOVER ONLY  */}
                      <div id='hovOp'>
                        <i class="fa-solid fa-list-ul" onClick={(e) => {
                          e.preventDefault();
                          setSelectedTask(selectedTask !== task._id ? task._id : null);
                        }}>
                        </i>
                        {/* MANIPULATING TASK OPTIONS  */}
                        {selectedTask === task._id && (
                          <ul className="options-list">
                            <li onClick={() => handleEditTask(task)}><i class="fa-solid fa-pen" ></i><p>Edit</p></li>
                            <li onClick={() => handleDeleteTask(task._id)}><i class="fa-solid fa-trash"></i><p>Delete</p></li>
                          </ul>
                        )}
                      </div>
                    </div>
                  </td>
                  <td>
                    <div id="taskName">
                      <p>
                        <i class="fa-regular fa-file"></i>
                        {task.name}
                      </p>
                      <button id='open'>
                        OPEN
                      </button>
                    </div>
                  </td>

                  <td>
                    <div id="status">
                      <p className={statusClass(task.status)}> <div className="dot"></div>{task.status}</p>
                    </div>
                  </td>
                  <td>
                    <div id='assignee'>
                  <div className="circle" style={{background:getUserColor(task.assignee.username)}}>
                         {nameLogo(task.assignee.fullname)}
                   </div>
                    <p>{task.assignee?.fullname}</p>
                    </div>
                  </td>
                  <td>
                    <p id='due'>{formateDate(task.due)}</p>
                  </td>
                  <td>
                    <div id='priority'>
                    <p className={task.priority}>{task.priority}</p>
                    </div>
                  </td>
                  <td>
                    <p id='descp'>{task.description}</p>
                  </td>
                </tr>)
                //  COMPONENT FOR UPDATING TASK
                : <NewUpdTask setTasks={setTasks} target={"update"} tasks={tasks} taskToUpdate={editedTaskData} setEditedTaskData={setEditedTaskData} getUserColor={getUserColor} />
            ))
            }
            <NewUpdTask setTasks={setTasks} tasks={tasks} target={"create"} getUserColor={getUserColor} />
            {/*  COMPONENT FOR CREATING TASK*/}
          </tbody>
        </table>
      </section>
    </div>
  );
}
