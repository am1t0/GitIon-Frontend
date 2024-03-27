import React from 'react'
import { useLocation } from 'react-router-dom'

export default function ProjectIntro({project}) {
 
  return (
    <div className='contiainer'>
     <h1>{project?.name}</h1>
     <p>start date:  {project.details.startDate}</p>
     <p>end date:  {project.details.endDate}</p>
     <p>{project?.details.description}</p>
    </div>
  )
}
