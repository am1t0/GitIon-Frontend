import React, { useEffect, useState } from 'react'
import { Outlet,useLocation } from 'react-router-dom'
import {useSelector} from 'react-redux';
import ProjectSidebar from './ProjectSidebar'
import ProjectIntro from './ProjectIntro';
import ProjectTasks from './ProjectTasks';
import ProjectDocs from './ProjectDocs';

export default function Project() {
    
    const [content,setContent] = useState('Documents')
  

    return (
    <div style={{display:'flex'}}>
      <ProjectSidebar setContent={setContent}/>
      {(() => {
      switch (content) {
        case 'Details':
          return <ProjectIntro/>;

        case 'Task Sheet':
          return <ProjectTasks/>;

        case 'Documents':
          return <ProjectDocs/>

        default:
          return null;
      }
    })()}
    </div>
  )
}