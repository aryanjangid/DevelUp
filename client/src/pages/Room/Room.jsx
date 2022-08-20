import React, { useState } from 'react'
import classes from './room.module.css'
import profile1 from '../../Assets/profile1.png'
import profile2 from '../../Assets/profile2.png'
import profile3 from '../../Assets/profile3.png'
import profile4 from '../../Assets/profile4.png'
import profile5 from '../../Assets/profile5.png'
import profile6 from '../../Assets/profile6.png'
import profile7 from '../../Assets/profile7.png'
import profile8 from '../../Assets/profile8.png'

export default function Room() {

    const profilePhotos = [profile1, profile2, profile3, profile4, profile5, profile6, profile7, profile8];

    const [meetOption, setMeetOption] = useState("create")

    const giveRandom = () => {
        return Math.floor(Math.random() * 7);
    }

    return (
        <div className={classes.outerDiv}>
            <div className={classes.searchDiv}>
                <input className={classes.searchTeamInput} placeholder="Search...."></input>
                <div className={classes.searchButton}>Search</div>
            </div>
            <div className={classes.roomDashboard}>
                <div className={classes.allTeams}>
                    <div className={classes.team}>
                        <img className={classes.teamImage} src={profilePhotos[giveRandom()]} alt="team"></img>
                        <div className={classes.teamName}><h3>Aryan</h3></div>
                    </div>
                    <div className={classes.team}>
                        <img className={classes.teamImage} src={profilePhotos[giveRandom()]} alt="team"></img>
                        <div className={classes.teamName}><h3>Aryan</h3></div>
                    </div>
                    <div className={classes.team}>
                        <img className={classes.teamImage} src={profilePhotos[giveRandom()]} alt="team"></img>
                        <div className={classes.teamName}><h3>Aryan</h3></div>
                    </div>
                    <div className={classes.team}>
                        <img className={classes.teamImage} src={profilePhotos[giveRandom()]} alt="team"></img>
                        <div className={classes.teamName}><h3>Aryan</h3></div>
                    </div>
                    <div className={classes.team}>
                        <img className={classes.teamImage} src={profilePhotos[giveRandom()]} alt="team"></img>
                        <div className={classes.teamName}><h3>Aryan</h3></div>
                    </div>
                    <div className={classes.team}>
                        <img className={classes.teamImage} src={profilePhotos[giveRandom()]} alt="team"></img>
                        <div className={classes.teamName}><h3>Aryan</h3></div>
                    </div>
                    <div className={classes.team}>
                        <img className={classes.teamImage} src={profilePhotos[giveRandom()]} alt="team"></img>
                        <div className={classes.teamName}><h3>Aryan</h3></div>
                    </div>

                </div>
                <div className={classes.roomChats}>
                    <div className={classes.teamDetailDiv}>
                        <div className={classes.teamDetails}>
                            <img className={classes.teamImage} src={profilePhotos[giveRandom()]} alt="team"></img>
                            <div className={classes.teamName}><h3>Aryan</h3></div>
                        </div>
                        {meetOption === "create" ?
                            <div className={classes.meetOptions}>
                                <h3>Schedule a Meet</h3>
                                <div><h1>Create</h1></div>
                            </div>
                            :
                            <div className={classes.meetOptions}>
                                <h3>Join meet at 8:00am</h3>
                                <div><h1>Join</h1></div>
                            </div>
                        }
                    </div>
                    <div className={classes.chatsDiv}>
                        dasfas
                    </div>
                    <div className={classes.sendMessageDiv}>
                        <input className={classes.inputMessageBox} placeholder='Type a message'></input>
                        <div className={classes.sendButtton}>Send</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
