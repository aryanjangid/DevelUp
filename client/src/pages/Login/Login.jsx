import React, { useState } from 'react'
import Button from '../../components/Button'
import background from '../../Assets/loginBackground.png'
import classes from './login.module.css'
import { useNavigate } from 'react-router-dom'
export default function Login() {
  const [selectedOption, setSelectedOption] = useState("mentor");
  const [mentorEmail, setMentorEmail] = useState("");
  const [mentorPassword, setMentorPassword] = useState("");
  const [menteeEmail, setMenteeEmail] = useState("");
  const [menteePassword, setMenteePassword] = useState("");

  const navigate = useNavigate()

  const loginUser = async () => {
    let email;
    let password;
    let user;
    if (selectedOption === "mentor") {
      email = mentorEmail
      password = mentorPassword
      user = "mentor"
    }
    else {
      email = menteeEmail
      password = menteePassword
      user = "mentee"
    }
    const response = await fetch(`http://localhost:4000/auth/${user}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })

    const data = await response.json()

    if (data) {
      localStorage.setItem('email', email)
      localStorage.setItem('name', data.name)
      localStorage.setItem('user', `${user}`)
      alert('Login successful')
      window.location.href = '/'
    } else {
      alert('Please check your username and password')
    }
  }

  return (
    <div className={classes.loginMainDiv} style={{
      backgroundImage: `url(${background})`, height: "fitContent", minHeight: "100vh", backgroundRepeat: 'no-repeat', width: "100wh", backgroundSize: 'cover',
    }}  >
      {/* <h1 style={{ marginBottom: "2rem" }}>DevelUp</h1> */}
      <div className={classes.loginBox}>
        <h1 style={{ marginBottom: "2rem",color:'#A2B5BB' }}>Login to DevelUp</h1>
        <h3 style={{ marginBottom: "2rem" ,color:'#277BC0'}}>Choose an options</h3>
        <div style={{ marginBottom: "2rem" }} className={classes.selectoption}>
          <div style={{ backgroundColor: `${selectedOption === "mentor" ? "#FFC23C" : "#A5C9CA"}` }} onClick={() => setSelectedOption("mentor")}><h1>Mentor</h1></div>
          <div style={{ backgroundColor: `${selectedOption === "mentee" ? "#FFC23C" : "#A5C9CA"}` }} onClick={() => setSelectedOption("mentee")}><h1>Mentee</h1></div>
        </div>
        {selectedOption === "mentor" ?
          <from action="" >
            <input className="inputBox" type="email" id="email" name="email" placeholder='Email Id' onChange={(e) => setMentorEmail(e.target.value)} value={mentorEmail} />
            <input style={{ marginBottom: "3rem" }} className="inputBox" type="password" id="password" name="password" placeholder='Password' onChange={(e) => setMentorPassword(e.target.value)} value={mentorPassword} />
            <div onClick={loginUser} style={{ display: 'flex', justifyContent: 'center' }}><Button name="Login as Mentor" to="/" ></Button></div>
          </from>
          :
          <from action="">
            <input className="inputBox" type="email" id="email" name="email" placeholder='Email Id' onChange={(e) => setMenteeEmail(e.target.value)} value={menteeEmail} />
            <input style={{ marginBottom: "3rem" }} className="inputBox" type="password" id="password" name="password" placeholder='Password' onChange={(e) => setMenteePassword(e.target.value)} value={menteePassword} />
            <div onClick={loginUser} style={{ display: 'flex', justifyContent: 'center' }}><Button name="Login as Mentee" to="/"></Button></div>
          </from>
        }
        <h3 style={{ marginTop: "3rem" }}>New here? <span onClick={() => navigate('/register')} style={{ color: "#FFC23C", cursor: "pointer" }}>Register</span></h3>
      </div>

    </div>
  )
}