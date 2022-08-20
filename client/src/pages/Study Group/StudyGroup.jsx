import React from 'react'
import classes from './studyGroup.module.css'
import background from '../../Assets/studyBackground.png'

export default function StudyGroup() {
  return (
    <div style={{
      backgroundImage: `url(${background})`, height: 'fitContent',padding:'2rem'
    }}>
      <h1 style={{ textAlign: 'center', padding: "2rem" }}>Study Groups</h1>
      <div className={classes.studyGroupDiv}>
          <h1> Search Your favorite group here</h1>
            <div className={classes.searchDiv}>
              <input style={{width:'70%'}} className='inputBox' placeholder='Codery...'></input>
              <div></div>
            </div>
      </div>
    </div>
  )
}
