import React, { useEffect, useState } from 'react'
import RepoStructure from '../RepoStructure';
import FileFolderContent from '../FileFolderContent';
import { useParams } from 'react-router-dom';

export default function Repo() {

  const {path} = useParams();

  return (
    <div>
       <h1>RepoContent here !</h1>
        <div style={{display:'flex'}}>
        <RepoStructure path={path}/>
        <FileFolderContent/>
        </div>
    </div>
  )
}
