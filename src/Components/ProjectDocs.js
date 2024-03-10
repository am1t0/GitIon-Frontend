import React, { useEffect,useState } from 'react'
import getAccessToken from '../Store/auth';
import { useSelector } from 'react-redux';
import InitialPushinComands from './InitialPushinComands';
import PullRequestForm from './PullRequestForm';
import RepoFileFolder from './RepoFileFolder';

export default function ProjectDocs({ project, team }) {
  const [updProject, setUpdProject] = useState(null);
  const [repo,setRepo] = useState('');

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/projects/${project._id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getAccessToken()}`
          }
        });

        if (!response.ok) {
          throw new Error(`Error fetching project: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Data of project ',data);
        setUpdProject(data.project);

      } catch (error) {
        console.error(error);
      }
    };

    fetchProject();
  }, [project._id]);


  return (
    <div> 
      <h1>{updProject?.name}</h1>
      <h5>{updProject?.repo?.repoName}</h5>
      { updProject && <RepoFileFolder repoName={updProject?.repo?.repoName} owner={updProject?.repo?.owner} path={''}  repo={updProject?.repo}  branch={'main'}/>}
    </div>
  );
}
