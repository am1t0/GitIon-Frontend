import React, { useEffect, useState } from 'react'
import RepoStructure from '../RepoStructure';
import FileFolderContent from '../FileFolderContent';
import { useLocation, useParams } from 'react-router-dom';

export default function Repo() {
  return (
    <div>
        <div style={{display:'flex'}}>
        <RepoStructure/>
        <FileFolderContent/>
        </div>
    </div>
  )
}
