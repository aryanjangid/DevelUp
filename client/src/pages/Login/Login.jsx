import React, { useState } from 'react'
import Button from '../../components/Button'
import background from '../../Assets/loginBackground.png'
import classes from './login.module.css'
export default function Login() {
  const [selectedOption, setSelectedOption] = useState("mentor");
  const [mentorEmail, setMentorEmail] = useState("");
  const [mentorPassword, setMentorPassword] = useState("");
  const [menteeEmail, setMenteeEmail] = useState("");
  const [menteePassword, setMenteePassword] = useState("");

  return (
    <div className={classes.loginMainDiv} style={{
      backgroundImage: `url(${background})`, height: "100vh", backgroundRepeat: 'no-repeat', width: "100wh", backgroundSize: 'cover',
    }}  >
      <h1 style={{ marginBottom: "2rem" }}>DevelUp</h1>
      <div className={classes.loginBox}>
        <h1 style={{ marginBottom: "2rem" }}>Login to DevelUp</h1>
        <h3>Choose an options</h3>
        <div style={{ marginBottom: "2rem" }} className={classes.selectoption}>
          <div style={{ backgroundColor: `${selectedOption == "mentor" ? "#FFC23C" : "#A5C9CA"}` }} onClick={() => setSelectedOption("mentor")}><h1>Mentor</h1></div>
          <div style={{ backgroundColor: `${selectedOption == "mentee" ? "#FFC23C" : "#A5C9CA"}` }} onClick={() => setSelectedOption("mentee")}><h1>Mentee</h1></div>
        </div>
        {selectedOption === "mentor" ?
          <from action="">
            <input className="inputBox" type="email" id="email" name="email" placeholder='Email Id' onChange={(e) => setMentorEmail(e.target.value)} value={mentorEmail} />
            <input style={{ marginBottom: "3rem" }} className="inputBox" type="password" id="password" name="password" placeholder='Password' onChange={(e) => setMentorPassword(e.target.value)} value={mentorPassword} />
            <Button name="Register as Mentor" to="/"></Button>
          </from>
          :
          <from action="">
            <input className="inputBox" type="email" id="email" name="email" placeholder='Email Id' onChange={(e) => setMenteeEmail(e.target.value)} value={menteeEmail} />
            <input style={{ marginBottom: "3rem" }} className="inputBox" type="password" id="password" name="password" placeholder='Password' onChange={(e) => setMenteePassword(e.target.value)} value={menteePassword} />
            <Button name="Register as Mentee" to="/"></Button>
          </from>
        }

      </div>

    </div>
  )
}