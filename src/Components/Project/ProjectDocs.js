import React, { useEffect,useState } from 'react'
import getAccessToken from '../../Utils/auth';
import { useSelector } from 'react-redux';
import InitialPushinComands from '../InitialPushinComands';
import PullRequestForm from '../PullRequestForm';
import RepoFileFolder from '../RepoFileFolder';
import '../../Styles/ProjectDocs.css'

export default function ProjectDocs() {

  const currProject = useSelector((store)=>store.currProject);

  return (
    <div id='projectDocs'> 
     <div className="projectHead">
      <h1>{currProject?.name}</h1>
      <h5>{currProject?.repo?.repoName}</h5>
     </div>
      { currProject && <RepoFileFolder/>}
    </div>
  );
}