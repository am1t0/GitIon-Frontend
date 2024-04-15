import React, { useEffect, useState } from 'react'
import {useSelector} from 'react-redux';

export default function RepoStructure({path}) {
    const repoContent =  useSelector((store)=>store.repo)

    const [open,setOpen] = useState(false);

    useEffect(()=>{

    },[])

  return (
    <div>
      {
         repoContent.data?.map((content)=>(
          <div>
          <li onClick={ ()=> setOpen(true)}>
            {content.name}
          </li>

           {/* when clicked on a folder or file */}
           {open && <RepoStructure/>}
          </div>
         ))
      }
    </div>
  )
}
