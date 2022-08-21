import React, { useState } from 'react'
import classes from './search.module.css'
import background from '../../Assets/searchBackground.png'
import Button from '../../components/Button'
import profile1 from '../../Assets/profile1.png'
import profile2 from '../../Assets/profile2.png'
import profile3 from '../../Assets/profile3.png'
import profile4 from '../../Assets/profile4.png'
import profile5 from '../../Assets/profile5.png'
import profile6 from '../../Assets/profile6.png'
import profile7 from '../../Assets/profile7.png'
import profile8 from '../../Assets/profile8.png'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { motion } from "framer-motion"
import { useNavigate } from 'react-router-dom'

export default function Search() {
    const [query, setQuery] = useState('')
    const [mentorResponse, setMentorResponse] = useState([])
    const [menteeResponse, setMenteeResponse] = useState([])

    const navigate = useNavigate()

    const profilePhotos = [profile1, profile2, profile3, profile4, profile5, profile6, profile7, profile8];

    const giveRandom = () => {
        return Math.floor(Math.random() * 7);
    }

    useEffect(() => {
        fetch(`http://localhost:4000/mentors`, {
            headers: { 'Content-Type': 'application/json' }
        }).then(data => data.json()).then((data) => setMentorResponse([...data['mentors']]))
        fetch(`http://localhost:4000/mentees`, {
            headers: { 'Content-Type': 'application/json' }
        }).then(data => data.json()).then((data) => setMenteeResponse([...data['mentees']]))
    }, [])

    const Card = ({ user }) => {
        return (
            <div className={classes.card}>
                <div style={{
                    backgroundImage: `url(${profilePhotos[giveRandom()]})`, height: "15vh", width: "100wh", borderRadius: "10px 10px 0 0"
                }}></div>
                <div className={classes.cardImageDiv}><img className={classes.cardImage} src={profile1} alt="Profile" /></div>
                <div className={classes.cardName}><h1>{user.name}</h1></div>
                <h3 style={{ margin: "2rem", marginBottom: '0rem', color: '#277BC0' }}>Skills</h3>
                <div className={classes.skillsDiv}>
                    {user.skills.map(skill => {
                        return <h3 className={classes.skill}>{skill}</h3>
                    })}
                </div>
                <div>
                    <div onClick={() => navigate(`/profile/${user.email}`)}>View Profile</div>
                </div>
            </div>
        )
    }

    const search = async () => {
        if (query === "") {
            return;
        }
        setMentorResponse(mentorResponse.filter(resp => {
            let Include = false;
            resp.skills.map(skill => {
                if (skill === query) Include = true;
                return true;
            })
            return Include;
        }))
        setMenteeResponse(menteeResponse.filter(resp => {
            let Include = false;
            resp.skills.map(skill => {
                if (skill === query) Include = true;
                return true;
            })
            return Include;
        }))
    }

    return (
        <div className={classes.outerDiv}>
            <div className={classes.backgroundDiv} style={{
                backgroundImage: `url(${background})`, height: "30vh", width: "100wh",
            }}  >
            </div>
            <motion.div 
            initial={{x:-570,y:-100,opacity:0,scale:0.5}}
            animate={{x:-570,y:-180,opacity:1,scale:1}}
            className={classes.searchOuterDiv}>
                <h1 style={{ color: '#A2B5BB', marginTop: '2rem' }}>Search what skill you want</h1>
                <div className={classes.searchDiv}>
                    {/* <input placeholder='react, cpp ......' onChange={(e) => setQuery(e.target.value)} value={query}></input>
                    <div style={{ positions: 'relative' }} onClick={search}>
                        <Button name="Find People"></Button>
                    </div> */}
                    <input style={{ width: '60%' }} className='inputBox' placeholder='react, cpp ......' onChange={(e) => setQuery(e.target.value)} value={query}></input>
                    <div style={{ width: "20%", positions: 'relative' }} onClick={search}><Button name="Find People"></Button></div>
                </div>
            </motion.div>
            <div >
                <div className={classes.cardsDiv}>
                    <h1 style={{ display: 'block', fontSize: '3rem', textAlign: 'center', padding: "2rem", paddingTop: "5.2rem", color: '#277BC0' }}>Mentor</h1>
                    {mentorResponse && mentorResponse.map(resp => {
                        return <Card user={resp} />
                    })}
                </div>
                <div className={classes.cardsDiv}>
                    <h1 style={{ display: 'block', fontSize: '3rem', textAlign: 'center', padding: "2rem", paddingTop: "5.2rem", color: '#277BC0' }}>Mentees</h1>
                    {menteeResponse && menteeResponse.map(resp => {
                        return <Card user={resp} />
                    })}
                </div>
            </div>
        </div>
    )
}
