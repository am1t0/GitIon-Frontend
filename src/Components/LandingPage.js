import React, { useEffect } from 'react'
import '../Styles/LandingPage.css'

 
 const LandingPage = () => {
       
  return (
    <div className='landingPage'>
       <div className="content-1">
         <div className="image-1">
            <img src="https://img.freepik.com/free-vector/business-team-planning-working-process-flat-vector-illustration-cartoon-colleagues-talking-sharing-thoughts-smiling-company-office-teamwork-workflow-concept_74855-9813.jpg?size=626&ext=jpg&ga=GA1.1.1395880969.1709942400&semt=ais" alt="" />
         </div>
         <div className="detail-1">
          <h4>Collaborate</h4>
           <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Enim, quam sed? Quibusdam, eius. Voluptatibus, esse, facilis libero qui perferendis expedita dolore accusantium excepturi placeat aliquid earum. Fugiat quo inventore placeat, ad quisquam maiores amet? Doloremque enim laboriosam ratione dolore nostrum asperiores alias. Quaerat, ad facere.</p>
         </div>
       </div>
       <div className="content-1">
          <div className="detail-1">
          <h4>Manage Self</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos mollitia explicabo maxime tempore sequi ab rerum. Fuga earum voluptatibus est nemo maiores incidunt ea, alias tempore eius, error consequuntur facere sequi. Deserunt dignissimos quod soluta sed magni vel dolore nisi.
            </p>
          </div>
          <div className="image-1">
            <img src="https://img.freepik.com/premium-vector/young-business-woman-cartoon-character-with-pen-writing-notes-todo-list-notebook-making-schedule_341509-5691.jpg" alt="" />
          </div>
       </div>
    </div>
  );
};


export default LandingPage;
