import React, { useState ,useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
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
import { useDispatch } from 'react-redux';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import '../Styles/RepoFileFolder.css';
import {changeBranch, setCurr } from '../Data_Store/Features/moreInfoSlice.js';
import { fetchData } from '../Data_Store/Features/repoContentSlice.js';
import  {fetchFileContent, fetchFolderContent} from '../Data_Store/Features/currFileFolderSlice.js'
import { toggleContent } from '../Data_Store/Features/moreInfoSlice.js';


export default function FilesAndFolders() {
  
  const [commits,setCommits] = useState(false);
  const [link,setLink] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  // ALL CONTENTS OF REPO ASSOCIATED WITH PROJECT
  const {data: {repoContent}} = useSelector((store)=>store.repo);

  const {selectedBranch} = useSelector((store)=> store.moreInfo);

  // const selectedBranch = 'main';

  const {repo: {owner,repoName},name}= useSelector((store)=>store.currProject);
  const project = useSelector((store)=>store.currProject);
  const trimmedName = name.trim();

  // LINK OF REPO
  const repoLink = `https://github.com/${owner}/${repoName}.git`;
  const [copyStatus,setCopyStatus] = useState(false);

   // COPY TEXT FUNCTION 
   const onCopyText = () =>{
      setCopyStatus(true);
      setTimeout(() => setCopyStatus(false), 2000); // Reset status after 2 seconds
    }

  const handleItemClick=(item)=>{
     
       dispatch(setCurr(item));
       if(item.type==='file') dispatch(fetchFileContent(item))

       else{
        dispatch(toggleContent(item.name));
         dispatch(fetchFolderContent({owner,repoName,path: item.path,selectedBranch}));
       }
        
       
       // ISKO AB TU ASA LINK DAAL SKTA HAI NAME KE SATH  //
       navigate(`/project/${trimmedName}/content/${item?.path}`);
  }
  const handleCommitShow=()=>{
    if(commits) 
       setCommits(false);
     
    else
    setCommits(true);
  }

  const handleBranchChange = (event) => {
    dispatch(changeBranch(event.target.value));
    dispatch(fetchData({project,selectedBranch: event.target.value}));
  };
  return ( repoContent &&
    <div> 
        <div className="bar"></div>
      <div id='top'>
       { selectedBranch!=='main' && <PullRequestForm/>}
        
       {/*-------BRANCH RELATED CONTENT HERE */}
       <Branches handleBranchChange={handleBranchChange} selectedBranch={selectedBranch}/>
      
        {/* ------COMMITS INFO HERE  SUDHARNA HAI PROPS KO----- */}
        <div id='commitInfo' onClick={handleCommitShow}>
        <i className="fa-solid fa-timeline"></i>
        <h6>commits</h6>
       {
        // WE HAVE TO SHOW THIS COMMITHISTORY IN A NEW PAGE ONCE REDUX IS IMPLEMENTED 
       commits && <CommitHistory repo={repoName} owner={owner}  branch={selectedBranch}/>
       }
       </div>

        {/* REPO LINK BUTTON  */}
       <div className="codeBtn">
        <div className="code">
        <i className="fa-solid fa-code"></i>
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
        { repoContent?.length!==0?
            repoContent?.map((item) => (
              
          <li key={item.name}>
    
            {/* FOR FILES  */}
            {item.type === 'file' ? (

            <div className='file-fol'>

             <i className="fa-regular fa-file"></i>

              <p onClick={()=> {handleItemClick(item)}}>
                {item.name}
               </p>
              </div>
            ) : (
              <div className='file-fol'> 
                 <i className="fa-solid fa-folder"></i>
                <p onClick={()=> handleItemClick(item)}>{item.name}</p>
              </div>
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