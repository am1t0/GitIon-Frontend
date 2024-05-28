import React, { useRef } from 'react';
import '../../../Styles/CreateReminder.css'

export default function CreateReminder() {
  const formRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const data = {
      title: formData.get('title'),
      description: formData.get('description'),
      date: formData.get('date'),
      time: formData.get('time'),
      location: formData.get('location'),
      tag: formData.get('tag')
    };
    // Handle the form data, e.g., send it to an API or update state
    console.log('Form data:', data);
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className='remForm'>
        <h4 className='remFT'>Create Reminder</h4>
      <div className='remInp'>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" />
      </div>
      <div className='remInp'>
        <label htmlFor="description">Description</label>
        <textarea name="description"></textarea>
      </div>
     
      <div id='tmDt'>
      <div className='remInp'>
        <label htmlFor="date">Date</label>
        <input type="date" id="date" name="date" />
      </div>
      <div className='remInp'>
        <label htmlFor="time">Time</label>
        <input type="time" id="time" name="time" />
      </div>
      </div>
      <div className="remInp">
      <label htmlFor="location">Location</label>
        <input type="text" id="location" name="location" />
      </div>
      <div className='remInp'>
        <label htmlFor="tag">Tag</label>
        <input type="text" id="tag" name="tag" />
      </div>
      <button className='remBtn' type="submit">Create</button>
    </form>
  );
}

