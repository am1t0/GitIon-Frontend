import React, { useEffect } from 'react'
import '../Styles/FileFolderContent.css'
import { useDispatch, useSelector } from 'react-redux'
import { setCurr, toggleContent } from '../Data_Store/Features/moreInfoSlice';
import { fetchFileContent, fetchFolderContent } from '../Data_Store/Features/currFileFolderSlice';

export default function FileFolderContent() {
  const {file,folder,isLoading} = useSelector((store)=>store.currFileFolder);
  const selectedBranch = localStorage.getItem('selectedBranch');
  const owner = localStorage.getItem('owner');
  const repoName = localStorage.getItem('repoName');
  const {fromRepo} = useSelector((store)=> store.moreInfo);
  const dispatch = useDispatch();


  const handleItemClick=(item)=>{
    dispatch(setCurr(item));

    if(item.type==='file') dispatch(fetchFileContent(item));

    else{
     dispatch(toggleContent(item.name));
      dispatch(fetchFolderContent({owner,repoName,path: item.path,selectedBranch}))
    }
     
  }
  
  return (
    !isLoading ?
    <div id='fileFolderContent'>
      {file && <pre>{file}</pre>}

      {folder && folder.length > 0 && (
    <table className='foldersTable'>
        <thead className='foldersHeading'>
            <tr id='headRow' className='rowClass'>
                <th>Name</th>
                <th>Last commit</th>
                <th className='last-col'>Last comit date</th>
            </tr>
        </thead>
        <tbody>
            {folder.map((item) => (
                <tr key={item.name} onClick={() => handleItemClick(item)} className='rowClass'>
                    <td><p>{item.name}</p></td>
                    <td>{item.name}</td>
                    <td className='last-col'>{item.name}</td>
                </tr>
            ))}
        </tbody>
    </table>
)}

    </div> : (fromRepo)? <h1 style={{width:'70%'}}>loading...</h1> : <h3>Select a file/folder to display</h3>
  )
}
