import React from 'react'
import {useSelector} from 'react-redux';

export default function RepoStructure() {
    const repoContent =  useSelector((store)=>store.repo)
  return (
    <div>
      {
         repoContent.data.map((content)=>{
           return <li>{content.name}</li>
         })
      }
    </div>
  )
}
