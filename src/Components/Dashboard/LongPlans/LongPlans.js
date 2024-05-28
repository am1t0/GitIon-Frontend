import React, { useState } from 'react'
import '../../../Styles/LongPlans.css'
import LongPlansList from './LongPlansList'
import Description from '../Description.js'

export default function LongPlans() {
  const [planForm,setPlanForm] = useState(false);

  return (
    <section>
      <div className="Topic">
           <h2>Yearly Plans</h2>
        </div>

         {/* opening the form for new plan */}
        <div className="addnew" onClick={()=>{setPlanForm(true)}}>
        <i class="fa-solid fa-plus"></i>
        <p>Add</p>
      </div>
      {/* intro and options to create a new plan  */}
     
        {/* containing list of all long plans  */}
        <LongPlansList/>

    </section>
  )
}
