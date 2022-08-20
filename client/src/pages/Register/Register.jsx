import React, { useState } from 'react'
import Button from '../../components/Button'
import background from '../../Assets/loginBackground.png'
import classes from './Register.module.css'
import { useNavigate } from 'react-router-dom'

export default function Login() {
    const [skills, setSkills] = useState([])
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const skillOptions = ["react", "c++", "python"]
    const navigate = useNavigate()

    const addSkill = (index) => {
        let newSkills = [...skills, skillOptions[index]]
        setSkills([...new Set(newSkills)])
    }

    const RegisterUser = async () => {
        console.log('req sent')
        const response = await fetch('http://localhost:4000/mentor/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                email,
                password,
                skills
            }),
        })

        const data = await response.json()
        if (data.status === 'ok') {
            navigate('/home')
        }
    }
    return (
        <div className={classes.loginMainDiv} style={{
            backgroundImage: `url(${background})`, height: "100vh", backgroundRepeat: 'no-repeat', width: "100wh", backgroundSize: 'cover',
        }}  >
            <h1>DevelUp</h1>
            <div className={classes.loginBox}>
                <h1>Register to DevelUp</h1>
                <form action="">
                    <input className="inputBox" type="text" id="name" name="name" placeholder='Name' onChange={(e) => setName(e.target.value)} value={name} />
                    <input className="inputBox" type="email" id="email" name="email" placeholder='Email Id' onChange={(e) => setEmail(e.target.value)} value={email} />
                    <input className="inputBox" type="password" id="password" name="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} value={password} />
                    <div className={classes.skills}>
                        {skillOptions.map((skill, index) => {
                            return <h1 key={index} onClick={() => addSkill(index)} >{skill}</h1>
                        })}
                    </div>
                    {/* <div className={classes.skills}>
            {skills.map((skill, index) => {
              return <h1 key={index} onClick={() => addSkill(index)} >{skill}</h1>
            })}
          </div> */}
                </form>
                <div onClick={RegisterUser}><Button name="Register" ></Button></div>
            </div>

        </div >
    )
}

// ()=>set(val)