import React, { useEffect, useState } from 'react'
import classes from './studyGroup.module.css'
import background from '../../Assets/studyBackground.png'
import profile1 from '../../Assets/profile1.png'
import profile2 from '../../Assets/profile2.png'
import profile3 from '../../Assets/profile3.png'
import profile4 from '../../Assets/profile4.png'
import profile5 from '../../Assets/profile5.png'
import profile6 from '../../Assets/profile6.png'
import profile7 from '../../Assets/profile7.png'
import profile8 from '../../Assets/profile8.png'
import Button from '../../components/Button'

export default function StudyGroup() {

  const profilePhotos = [profile1, profile2, profile3, profile4, profile5, profile6, profile7, profile8];
  const giveRandom = () => {
    return Math.floor(Math.random() * 1);
  }

  const [rooms, setRooms] = useState([])

  useEffect(() => {
    fetch(`http://localhost:4000/rooms`).then(data => data.json()).then(data => { setRooms(data.rooms) })
  })

  const Studygrp = ({ room }) => {
    return (
      <div className={classes.studyGroup}>
        <div className={classes.groupDiv}>
          <div className={classes.studyGroupDetails}>
            <img className={classes.studyGroupImg} src={profilePhotos[giveRandom()]} alt="profile"></img>
            <h3 style={{ marginLeft: '1rem', fontSize: '1.4rem' }}>{room.name}</h3>
          </div>
          <div className={classes.viewButton}>
            View Group
          </div>
        </div>
        <h3 style={{ paddingTop: '2rem', textAlign: 'left' }}>Learning and refining competitive programming to crack interviews better and improve critical thinking.</h3>
      </div>
    )
  }

  return (
    <div style={{
      backgroundImage: `url(${background})`, height: 'fitContent', padding: '2rem'
    }}>
      <h1 style={{ fontSize: '3rem', textAlign: 'center', padding: "2rem", paddingTop: "5.2rem", color: '#277BC0' }}>Study Groups</h1>
      <div className={classes.studyGroupDiv}>
        <h1 style={{ color: '#A2B5BB', marginTop: '2rem' }}> Search Your favorite group here</h1>
        <div className={classes.searchDiv}>
          <input style={{ width: '60%' }} className='inputBox' placeholder='Codery...'></input>
          <div style={{ width: "20%" }}><Button name="Search"></Button></div>
        </div>
        <div className={classes.allGroups}>
          {rooms && rooms.map(room => {
            return <Studygrp room={room} />
          })}
        </div>
      </div>
    </div>
  )
}
