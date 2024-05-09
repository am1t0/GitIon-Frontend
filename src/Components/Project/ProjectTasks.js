import React from 'react';
import "../../Styles/ProjectTasks.css";

export default function ProjectTasks() {
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
            <tr>
              <td>1</td>
              <td>
               <span>
              <i class="fa-regular fa-file"></i>
               Task 1
              </span>
              <span id='open'>
                 open
              </span>
              </td>

              <td id='status'><p>Pending</p></td>
              <td>John</td>
              <td>2024-05-15</td>
              <td id='priority'><p>High</p></td>
              <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore enim iusto molestias ab unde placeat mollitia, veritatis, incidunt voluptas libero officiis magni consectetur numquam a sed ex error? In, sed?.</td>
            </tr>
            <tr>
              <td>2</td>
              <td><i class="fa-regular fa-file"></i>Task 2</td>
              <td id='status'><p>In Progress</p></td>
              <td>Jane</td>
              <td>2024-05-20</td>
              <td>Medium</td>
              <td>Nullam nec ligula vel orci interdum tristique.</td>
            </tr>
            <tr>
              <td>3</td>
              <td><i class="fa-regular fa-file"></i>Task 3</td>
              <td>Completed</td>
              <td>Peter</td>
              <td>2024-05-10</td>
              <td>Low</td>
              <td>Fusce tincidunt lacus vitae lorem10velit posuere, at interdum leo efficitur.</td>
            </tr>
           
            <tr id='nwTask'>
              <td id='crtBtn'><button>create</button></td>
              <td><input type="text" placeholder='Task name'/></td>
               <td>
                <select>
                   <option value="not">Not started</option>
                   <option value="not">Pending</option>
                   <option value="apple">In progress</option>
                 </select>
                </td>
                <td><input type="text" placeholder='Assignee'/></td>
                <td><input type="date"  placeholder='task name'/></td>
                <td>
                <select>
                   <option value="not">Low</option>
                   <option value="not">High</option>
                   <option value="apple">Medium</option>
                 </select>
                </td>
                <td><input type="text" placeholder='Description'/></td>
            </tr>
          </tbody>
        </tab>
      </section>
    </div>
  );
}
