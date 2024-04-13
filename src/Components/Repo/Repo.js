import React, { useEffect } from 'react'
import RepoStructure from '../RepoStructure';
import FileFolderContent from '../FileFolderContent';

export default function Repo() {

  return (
    <div>
       <h1>RepoContent here !</h1>
        <div style={{display:'flex'}}>
        <RepoStructure/>
        <FileFolderContent/>
        </div>
    </div>
  )
}
