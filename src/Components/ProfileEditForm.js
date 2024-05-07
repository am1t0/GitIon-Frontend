import React, { useRef } from 'react'
import '../Styles/ProfileEditForm.css';

export default function ProfileEditF({setEditForm}) {
    const name = useRef();
    const phone = useRef();
    const address = useRef();
    const collgN = useRef();
    const collgA = useRef();
    const skills = useRef();
    const github = useRef();
    const linkedin = useRef();

    const handleSubmit=()=>{

    }
    
  return (
    <div className="prf">
    <form onSubmit={handleSubmit} className='prf-frm'>
        <div className="edi-c">
          <h3>Edit Profile</h3>
          <div><i class="fa-solid fa-xmark" onClick={()=>{setEditForm(false)}}></i></div>
        </div>
    <label htmlFor="name">Name</label><br />
    <input type="text" id="name" name="name" ref={name} /><br /><br />

    <label htmlFor="phone">Phone No</label><br />
    <input type="tel" id="phone" ref={phone}/><br /><br />

    <label htmlFor="address">Address</label><br />
    <textarea id="address"  ref={address}/><br /><br />

    <h6>College Information</h6>
    <label htmlFor="college_name">College Name</label><br />
    <input type="text" id="college_name" name="collegeName" ref={collgN} /><br /><br />

    <label htmlFor="college_address">College Address</label><br />
    <textarea id="college_address" name="collegeAddress" ref={collgA}/><br /><br />

    {/* <h2>Skills & Profiles</h2>
    <label htmlFor="skills">Skills:</label><br />
    <textarea id="skills" name="skills" value={formData.skills} onChange={handleChange} required /><br /><br /> */}

    <label htmlFor="github">GitHub Profile</label><br />
    <input type="url" id="github" name="github" ref={github}/><br /><br />

    <label htmlFor="linkedin">LinkedIn Profile</label><br />
    <input type="url" id="linkedin" name="linkedin" ref={linkedin} /><br /><br />

     <div className="btn-op">
        <button id="cancel">cancel</button>
        <button id="save"><i class="fa-solid fa-check"></i> save</button>
     </div>
</form>
</div>
  )
}
