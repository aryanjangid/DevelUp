import React from 'react'
import Button from '../../components/Button'
import background from '../../Assets/loginBackground.png'
import classes from './login.module.css'
export default function Login() {

  return (
    <div className={classes.loginMainDiv} style={{
      backgroundImage: `url(${background})`, height: "100vh", backgroundRepeat: 'no-repeat', width: "100wh", backgroundSize: 'cover',
    }}  >
      <h1>DevelUp</h1>
      <div className={classes.loginBox}>
        <h1>Login to DevelUp</h1>
        <from action="">
          <input className="inputBox" type="email" id="email" name="email" placeholder='Email Id'/>
          <input className="inputBox" type="password" id="password" name="password" placeholder='Password'/>
        </from>
        <Button name="Home" to="/"></Button>
      </div>

    </div>
  )
}
