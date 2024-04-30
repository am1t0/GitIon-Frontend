import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux';
import FolderShow from './FolderShow';
import { useNavigate } from 'react-router-dom';
import FileShow from './FileShow';
import '../Styles/repoStructure.css';
import { fetchFileContent, fetchFolderContent } from '../Data_Store/Features/currFileFolderSlice';
import { setCurr, toggleContent } from '../Data_Store/Features/moreInfoSlice';

export default function RepoStructure() {
    const dispatch = useDispatch();
    const {data: {repoContent}} =  useSelector((store)=>store.repo)
    const {repo: {owner,repoName}}= useSelector((store)=>store.currProject);
    const {selectedBranch,content} = useSelector((store)=>store.moreInfo)
    const {currContent} = useSelector((store)=>store.moreInfo);

    const handleOnClick=(item)=>{
       
      dispatch(setCurr(item));
      if(content.includes(item.name)){
        dispatch(toggleContent(item.name));
      return;
      }
    
      if(item.type==='file'){
         dispatch(fetchFileContent(item));
        }
      
      else {
      dispatch(toggleContent(item.name));
      dispatch(fetchFolderContent({owner,repoName,path:item.path,selectedBranch}));
      }
    }
    
  console.log('this is currFileFolder is:')  
  console.log(currContent)

  return (
    <div id='structure'>
      {
         repoContent?.map((item)=>(

          <div className='repoItem' key={item.name}>
            <li id='listItem'  onClick={()=>{handleOnClick(item)}} style={{background:(item.type==='file' ? currContent===item:currContent===item.name) && 'brown'}} >
            {item?.type==='file'?  <i className="fa-regular fa-file"></i> :<i className="fa-solid fa-folder"></i>}
            {item.name}
            </li>
            {(item.type!=='file' && content.includes(item.name)) && <FolderShow path={item?.path} />}
          </div>
         ))
      }
    </div>
  )
}
