import React, { useState ,useEffect} from 'react'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import FileShow from '../../../frontend2/src/Components/FileShow';
import FolderShow from './FolderShow';
import { getMouseEventOptions } from '@testing-library/user-event/dist/utils';
import CommitHistory from '../../../frontend2/src/Components/CommitHistory';
import InitialPushinComands from '../../../frontend2/src/Components/InitialPushinComands';
import Branches from '../../../frontend2/src/Components/Branch/Branches';
import PullRequestForm from './PullRequestForm';
import {useSelector} from 'react-redux';
import getAccessToken from '../Utils/auth.js';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import '../Styles/RepoFileFolder.css';


export default function FilesAndFolders() {

  const [openFile,setOpenFile] = useState(null);
  const [openFolder,setFolder] = useState(null);
  const [commits,setCommits] = useState(false);
  const [branches,setBranches] = useState([]);
  const [link,setLink] = useState(false);

  const repo = useSelector((store)=>store.repo)
  // const [contents, setContents] = useState([]);

  const {repo: {owner,repoName},name}= useSelector((store)=>store.currProject);
  const trimmedName = name.trim();

  // LINK OF REPO
  const repoLink = `https://github.com/${owner}/${repoName}.git`;
  const [copyStatus,setCopyStatus] = useState(false);

  const [selectedBranch, setSelectedBranch] = useState('main');
 

   // COPY TEXT FUNCTION 
   const onCopyText = () =>{
      setCopyStatus(true);
      setTimeout(() => setCopyStatus(false), 2000); // Reset status after 2 seconds
    }
  // fetching reposatories data 
  // useEffect(() => {
   
  //   const fetchRepoContents = async () => {
  //     try {
  //     let url = `https://api.github.com/repos/${owner}/${repoName}/contents`;
      
  //     //console.log('Length of Repo is',repo)
    
  //     // https://api.github.com/repos/am1t0/Advance-backend/contents
      

  //      url += `?ref=${selectedBranch}`;

  //       const response = await fetch(url, {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem('leaderToken')}`,
  //         },
  //       });

  //       if (!response.ok) {
  //         throw new Error('Failed to fetch repository contents');
  //       }

  //       const data = await response.json();
  
  //       setContents(data);
  //       console.log(data);
  //     } catch (error) {
  //       console.error('Error fetching repository contents:', error.message);
  //     }
  //   };

  //   fetchRepoContents();
  // }, [owner, repoName,selectedBranch]);

  // // fetching branches data 
  // useEffect(() => {
  //   const fetchRepoBranches = async () => {

  //     try {
  //       const url = `https://api.github.com/repos/${owner}/${repoName}/branches`;
  
  //       const response = await fetch(url, {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem('leaderToken')}`,
  //         },
  //       });

  //       if (!response.ok) {
  //         throw new Error('Failed to fetch repository branches');
  //       }

  //       const data = await response.json();
  //       setBranches(data);
  //       //console.log(data,data.object.sha);
  //     } catch (error) {
  //       console.error('Error fetching repository branches:', error.message);
  //     }
  //   };

  //   fetchRepoBranches();
  // }, [owner, repoName]);


  const handleCommitShow=()=>{
    if(commits) 
       setCommits(false);
     
    else
    setCommits(true);
  }

  const handleBranchChange = (event) => {
    setSelectedBranch(event.target.value);
  };
  return (
    <div> 
        <div className="bar"></div>
      <div id='top'>
       { selectedBranch!=='main' && <PullRequestForm/>}
        
       {/*-------BRANCH RELATED CONTENT HERE */}
       <Branches contents={repo.data} branches={branches} handleBranchChange={handleBranchChange} selectedBranch={selectedBranch} owner={owner} repo={repoName}/>
      
        {/* ------COMMITS INFO HERE  */}
        <div id='commitInfo' onClick={handleCommitShow}>
        <i class="fa-solid fa-timeline"></i>
        <h6>commits</h6>
       {
        // WE HAVE TO SHOW THIS COMMITHISTORY IN A NEW PAGE ONCE REDUX IS IMPLEMENTED 
       commits && <CommitHistory repo={repoName} owner={owner}  branch={selectedBranch}/>
       }
       </div>

        {/* REPO LINK BUTTON  */}
       <div className="codeBtn">
        <div className="code">
        <i class="fa-solid fa-code"></i>
        <button onClick={()=>{setLink(!link)}}>code</button>
      
        </div>
        { link &&
           <>
          <div id="codeLink">  
            <h6>{repoLink}</h6>
          {/* COPY  TO CLIPBOARD:  */}
          <div id="copy">
            <CopyToClipboard text={repoLink}  onCopy={onCopyText}>
             <i className="fa-solid fa-copy"></i>
            </CopyToClipboard>
          </div>
          </div>
          { copyStatus && 
          <div className="status">
           <p>Copied !</p>
          </div>
          }
          </>
        }
       </div>
      </div>
      
        {/* FILES AND FOLDERS STRUCURE  */}
      <ul id='file-n-folders'>
         <h6 className='first-row'>owner : {owner}</h6>
         <div className="line"></div>
        { repo.data.length!==0?
            repo.data.map((item) => (
              
          <li key={item.name}>
    
            {/* FOR FILES  */}
            {item.type === 'file' ? (

            <div className='file-fol'>

             <i class="fa-regular fa-file"></i>

              <p onClick={()=> {
              if(openFile===item.name)
              setOpenFile(null)
              else
              setOpenFile(item.name)
              }}>
                {item.name}
               </p>

              {openFile===item.name && <FileShow isOpen={item.name === openFile} content = {item}/>}
              </div>
            ) : (
              <>
               {/* FOR FOLDERS  */}

               {/* <div className="file-fol" onClick={()=> setFolder(item.name)}>
               <i class="fa-solid fa-folder"></i>
                <p>{item.name}</p>
                {
                (openFolder===item.name) && <FolderShow owner={owner} repoName={repoName} path={item?.path} branch={selectedBranch}/>
                }
               </div> */}
               <Link to={`/project/${trimmedName}/repo`}>{item.name}</Link>
               </>
            )}
          </li>
        ))
      : <InitialPushinComands owner={owner} repoName={repoName}/>      // if the repo content is empty it has no files and folders
      }
      </ul>
      <div id="readMe">
      <h1>README DALNA HAI ?</h1>
    </div>
    </div>
  );
};