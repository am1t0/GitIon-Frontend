import React, { useEffect } from 'react'
import '../Styles/FileFolderContent.css'
import { useSelector } from 'react-redux'
import FileShow from './FileShow';
import FolderShow from './FolderShow';
import FolderCopy from './FolderCopy';

export default function FileFolderContent() {
  const {file,folder,isLoading} = useSelector((store)=>store.currFileFolder);
  
  return (
    !isLoading ?
    <div id='fileFolderContent'>
      {file && <pre>{file}</pre>}

      {folder && folder?.map((files)=>{
          return <p key={files.name}>{files.name}</p>
      })}
    </div> : <h1>loading...</h1>
  )
}
