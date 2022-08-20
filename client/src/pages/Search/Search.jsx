import React from 'react'
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

export default function Search() {

    const profilePhotos = [profile1, profile2, profile3, profile4, profile5, profile6, profile7, profile8];

    const giveRandom = () => {
        return Math.floor(Math.random() * 7);
    }


    return (
        <div className={classes.outerDiv}>
            <div className={classes.backgroundDiv} style={{
                backgroundImage: `url(${background})`, height: "30vh", width: "100wh"
            }}  >
            </div>
            <div className={classes.searchOuterDiv}>
                <h1>Search what skill you want</h1>
                <div className={classes.searchDiv}>
                    <input placeholder='react, cpp ......'></input>
                    <div style={{ positions: 'relative' }}>
                        <Button name="Search Person"></Button>
                    </div>
                </div>
            </div>

            <div className={classes.cardsDiv}>
                <div className={classes.card}>
                    <div style={{
                        backgroundImage: `url(${profilePhotos[giveRandom()]})`, height: "15vh", width: "100wh", borderRadius: "10px 10px 0 0"
                    }}></div>
                    <div className={classes.cardImageDiv}><img className={classes.cardImage} src={profile1} alt="Profile" /></div>
                    <div className={classes.cardName}><h1>Aryan Jangid</h1></div>
                    <h3 style={{ margin: "2rem", marginBottom: '0rem' }}>Skills</h3>
                    <div className={classes.skillsDiv}>
                        <h3 className={classes.skill}>React</h3>
                        <h3 className={classes.skill}>C++</h3>
                        <h3 className={classes.skill}>Java</h3>
                        <h3 className={classes.skill}>Python</h3>
                        <h3 className={classes.skill}>GitHub</h3>
                    </div>
                    <div>
                        <Link to="/">View Profile</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
