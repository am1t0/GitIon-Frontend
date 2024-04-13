import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import '../../Styles/ProjectIntro.css'


export default function ProjectIntro() {

  return (
    <div id='projectDetails'>
      <div id="projectHead">
        <h3>Amit JI</h3>
      </div>
      <div className="over-obj">
        <div id="overview">
          {/* <p>{project?.projectOverview}</p> */}
           <h5>Project Overview</h5>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus aperiam eligendi, dolore quae vitae commodi quas vel voluptatem, iste officiis et eaque nemo hic aliquid neque, ipsum nam illo ipsa aspernatur minima. Quis natus ab architecto, assumenda error, iure cupiditate minima provident tempore beatae reiciendis eaque incidunt officiis at.</p>
        </div>
        <div id="objectives">
           <h5>Project Objectives</h5>
          {/* {
            project?.projectObjectives.map((obj) => (
              <li>{obj}</li>
            ))
          } */}
          <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto, magni.</li>
          <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto, magni.</li>
          <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto, magni.</li>
          <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto, magni.</li>
          <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto, magni.</li>
        </div>
      </div>
    </div>
  )
}
