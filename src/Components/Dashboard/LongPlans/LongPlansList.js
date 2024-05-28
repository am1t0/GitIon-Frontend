import React, { useState } from 'react'
import EachPlan from './EachPlan'
import '../../../Styles/LongPlansList.css'
import DescCreatePlan from '../Description';
import SelectedPlan from './SelectedPlan';

export default function LongPlansList({Lplan}) {

  const plans = [
    {
      id: 1,
      tag: "1-Year Plan",
      duration: "2024",
      image: "path_to_image1.jpg",
      progress: 50,
      title: "1-Year Expansion Plan",
      description: "Increase market penetration by 15%.",
      milestones: [
        "Q1: Complete market analysis.",
        "Q2: Launch product line.",
        "Q3: Open first regional office.",
        "Q4: Open second regional office."
      ]
    },
    {
      id: 2,
      tag: "3-Year Plan",
      duration: "2024-2026",
      image: "path_to_image2.jpg",
      progress: 30,
      title: "3-Year Growth Plan",
      description: "Achieve 30% revenue growth.",
      milestones: [
        "Year 1: Expand into two new countries.",
        "Year 2: Develop three new products.",
        "Year 3: Increase brand awareness by 25%."
      ]
    },
    {
      id: 3,
      tag: "5-Year Plan",
      duration: "2024-2029",
      image: "path_to_image3.jpg",
      progress: 20,
      title: "5-Year Sustainability Plan",
      description: "Integrate sustainable practices across all operations.",
      milestones: [
        "Year 1: Conduct sustainability assessment.",
        "Year 2: Reduce carbon footprint by 10%.",
        "Year 3: Implement waste reduction programs.",
        "Year 4: Achieve 50% renewable energy use.",
        "Year 5: Reach zero waste production."
      ]
    },
    {
      id: 4,
      tag: "1-Year Plan",
      duration: "2024",
      image: "path_to_image4.jpg",
      progress: 40,
      title: "1-Year Innovation Plan",
      description: "Launch a new innovative product line.",
      milestones: [
        "Q1: Complete product R&D.",
        "Q2: Begin production.",
        "Q3: Launch marketing campaign.",
        "Q4: Launch product to market."
      ]
    },
    {
      id: 5,
      tag: "3-Year Plan",
      duration: "2024-2026",
      image: "path_to_image5.jpg",
      progress: 25,
      title: "3-Year Digital Transformation Plan",
      description: "Transform all operations to digital platforms.",
      milestones: [
        "Year 1: Digitize customer service.",
        "Year 2: Implement digital marketing strategies.",
        "Year 3: Move to cloud-based infrastructure."
      ]
    },
    {
      id: 6,
      tag: "5-Year Plan",
      duration: "2024-2029",
      image: "path_to_image6.jpg",
      progress: 10,
      title: "5-Year Global Expansion Plan",
      description: "Expand business operations globally.",
      milestones: [
        "Year 1: Enter three new international markets.",
        "Year 2: Establish global partnerships.",
        "Year 3: Increase international sales by 20%.",
        "Year 4: Open international offices.",
        "Year 5: Achieve global brand recognition."
      ]
    },
    {
      id: 7,
      tag: "1-Year Plan",
      duration: "2024",
      image: "path_to_image7.jpg",
      progress: 60,
      title: "1-Year Customer Engagement Plan",
      description: "Improve customer engagement by 20%.",
      milestones: [
        "Q1: Launch new customer loyalty program.",
        "Q2: Enhance social media presence.",
        "Q3: Improve customer support.",
        "Q4: Conduct customer satisfaction surveys."
      ]
    },
    {
      id: 8,
      tag: "3-Year Plan",
      duration: "2024-2026",
      image: "path_to_image8.jpg",
      progress: 35,
      title: "3-Year Product Development Plan",
      description: "Develop five new innovative products.",
      milestones: [
        "Year 1: Complete initial R&D.",
        "Year 2: Begin product testing.",
        "Year 3: Launch products to market."
      ]
    },
    {
      id: 9,
      tag: "5-Year Plan",
      duration: "2024-2029",
      image: "path_to_image9.jpg",
      progress: 15,
      title: "5-Year Financial Growth Plan",
      description: "Double the company's revenue.",
      milestones: [
        "Year 1: Increase sales by 10%.",
        "Year 2: Expand into new markets.",
        "Year 3: Launch new revenue streams.",
        "Year 4: Optimize operations for cost savings.",
        "Year 5: Achieve revenue targets."
      ]
    },
    {
      id: 10,
      tag: "1-Year Plan",
      duration: "2024",
      image: "path_to_image10.jpg",
      progress: 70,
      title: "1-Year Talent Development Plan",
      description: "Enhance employee skills and satisfaction.",
      milestones: [
        "Q1: Launch new training programs.",
        "Q2: Improve employee benefits.",
        "Q3: Conduct performance reviews.",
        "Q4: Increase employee retention by 10%."
      ]
    }
  ];
  
         
    const [planSelected,setPlanSelected] = useState(null);  

  return (
     <section className='longPlansList'>
 
      { planSelected &&  <SelectedPlan plan={planSelected} setPlan={setPlanSelected}/>}
         
        {/* for showing list of all long plans  */}
        <div className="planlist">
       {plans.map((plan)=>{
         return  <EachPlan plan={plan} setPlan={setPlanSelected}/>
       })}
        </div>
     </section>
  )
}
