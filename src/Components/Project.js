import React, { useEffect, useState } from 'react'
import { Outlet,useLocation } from 'react-router-dom'
import ProjectSidebar from './ProjectSidebar'
import ProjectIntro from './ProjectIntro';
import ProjectTasks from './ProjectTasks';
import ProjectDocs from './ProjectDocs';

export default function Project() {
    const location = useLocation();
    const {project,team} = location.state;
    const [content,setContent] = useState('Details')

    useEffect(()=>{
      console.log(project);
      console.log(project?.repoInitialized);
    },[project])
    return (
    <div style={{display:'flex'}}>
      <ProjectSidebar project={project} setContent={setContent}/>
      {(() => {
      switch (content) {
        case 'Details':
          return <ProjectIntro project={project}/>;

        case 'Task Sheet':
          return <ProjectTasks/>;

        case 'Documents':
          return project._id && <ProjectDocs project={project} team={team}/>

        default:
          return null;
      }
    })()}
    </div>
  )
}