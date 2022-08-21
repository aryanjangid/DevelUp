import React, { useState } from 'react'
import Button from '../../components/Button'
import background from '../../Assets/loginBackground.png'
import classes from './form.module.css'
import { useNavigate } from 'react-router-dom'
export default function Form() {
  const [meetingName, setMeetingName] = useState("");
  const [meetingTime, setMeetingTime] = useState("");
  const [meetingLink, setMeetingLink] = useState("");

  const navigate = useNavigate();

  const fillForm =() => {

  }

  return (
    <div className={classes.loginMainDiv} style={{
      backgroundImage: `url(${background})`, height: "fitContent", minHeight: "100vh", backgroundRepeat: 'no-repeat', width: "100wh", backgroundSize: 'cover',
    }}  >
      {/* <h1 style={{ marginBottom: "2rem" }}>DevelUp</h1> */}
      <div className={classes.loginBox}>
        <h1 style={{ marginBottom: "2rem" }}>Fill the form to schedule a meet</h1>
        
          <from action="" >
            <input className="inputBox" type="text" id="name" name="text" placeholder='Meet Name' onChange={(e) => setMeetingName(e.target.value)} value={meetingName} />
            <input className="inputBox" type="text" id="time" name="text" placeholder='Time' onChange={(e) => setMeetingTime(e.target.value)} value={meetingTime} />
            <input className="inputBox" type="text" id="link" name="text" placeholder='Meeting Link' onChange={(e) => setMeetingLink(e.target.value)} value={meetingLink} />
            <div onClick={fillForm} style={{display:'flex', justifyContent: 'center', marginTop:'2rem'}}><Button name="Submit" to="/" ></Button></div>
          </from>
        </div>

    </div>
  )
}