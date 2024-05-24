import React from 'react'
import '../../../Styles/LongPlans.css'
import LongPlansList from './LongPlansList'

export default function LongPlans() {
  return (
    <aside>
      <h1 className='Topic'>Yearly plans</h1>
      <section className="longPlansContainer">
        <LongPlansList/>
      </section>

    </aside>
  )
}
