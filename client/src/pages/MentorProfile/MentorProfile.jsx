import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import classes from './mentorProfile.module.css'

export default function MentorProfile() {

    const [facebook, setFacebook] = useState("");
    const [instagram, setInstagram] = useState("");
    const [twitter, setTwitter] = useState("");
    const [github, setGithub] = useState("");
    const [linkedin, setLinkedin] = useState("");

    const [editInfo, setEditInfo] = useState(0);
    const [editBio, setEditBio] = useState(0);

    return (
        <div className={classes.MainDiv}>
            <div className={classes.profileMaindiv}>
                <div className={classes.profileLeftdiv}>
                    <h1>MY Profile</h1>
                </div>
                <div className={classes.profileRightdiv}>
                    <div className={classes.basicDetails}>
                        <h1 style={{ color: '#6225E6', fontSize: '1.4rem', marginBottom: '1rem' }}>Hey!</h1>
                        <h1>Aryan Jangid</h1>
                        <h3><span>Email: </span>aryanjangid@gmail.com</h3>
                        <div>
                            <div style={{ marginTop: "2rem", marginBottom: "2rem" }} className={classes.wrapper}>
                                <div className={classes.button}>
                                    <a href={facebook} target="_blank">
                                        <div className={classes.icon}>
                                            <i className="fab fa-facebook-f" />
                                        </div>
                                        <span>Facebook</span>
                                    </a>
                                </div>
                                <a href={facebook} target="_blank">
                                    <div className={classes.button}>
                                        <div className={classes.icon}>
                                            <i className="fab fa-twitter" />
                                        </div>
                                        <span>Twitter</span>
                                    </div></a>
                                <a href={facebook} target="_blank">
                                    <div className={classes.button}>
                                        <div className={classes.icon}>
                                            <i className="fab fa-instagram" />
                                        </div>
                                        <span>Instagram</span>
                                    </div></a>
                                <a href={facebook} target="_blank">
                                    <div className={classes.button}>
                                        <div className={classes.icon}>
                                            <i className="fab fa-github" />
                                        </div>
                                        <span>Github</span>
                                    </div></a>
                                <a href={facebook} target="_blank">
                                    <div className={classes.button}>
                                        <div className={classes.icon}>
                                            <i className="fab fa-linkedin" />
                                        </div>
                                        <span>Linkedin</span>
                                    </div></a>
                            </div>
                            <div onClick={() => setEditInfo(1 - editInfo)} className={classes.editButton}><h1>Edit Links</h1></div>
                        </div>
                        {editInfo == 1 ?
                            <div className={classes.editContainer}>
                                <input style={{ width: '80%', marginLeft: '0' }} className="inputBox" placeholder='Facebook'></input>
                                <input style={{ width: '80%', marginLeft: '0' }} className="inputBox" placeholder='Twitter'></input>
                                <input style={{ width: '80%', marginLeft: '0' }} className="inputBox" placeholder='Instagram'></input>
                                <input style={{ width: '80%', marginLeft: '0' }} className="inputBox" placeholder='GitHub'></input>
                                <input style={{ width: '80%', marginLeft: '0' }} className="inputBox" placeholder='Linkedin'></input>
                                <div style={{ backgroundColor: 'green' }} className={classes.editButton}><h1>Save</h1></div>
                            </div>
                            :
                            <></>
                        }

                    </div>
                    <div className={classes.basicDetails}>
                        <h1>Bio</h1>
                        <h3 style={{margin:'2rem', marginLeft: '0'}}>Currently I am a sophomore pursuing Artificial Intelligence and Data Science Engineering. Building a competitive programming community. Skilled in C++, Java, Designing, Website Building, Engineering, and Front-end Development. Love to solve hard problems and building fast and scalable applications. I am also interested in Virtual Reality (VR) technologies and building that as a side project.</h3>
                        <div onClick={() => setEditBio(1 - editBio)} className={classes.editButton}><h1>Edit Bio</h1></div>
                        {editBio==1?
                        <div>
                            <textarea className={classes.textArea}></textarea>
                            <div style={{ backgroundColor: 'green' , marginTop:"2rem"}} className={classes.editButton}><h1>Save</h1></div>
                        </div>
                        :
                        <></>
                    }
                    </div>
                    <div className={classes.basicDetails}>
                        <h1>Rooms</h1>
                        <div className={classes.roomDiv} style={{ marginLeft: "0" }}><h3>Room 1</h3>  <div className={classes.viewRoomButton}>View</div></div>
                    </div>

                </div>

            </div>

        </div>
    )
}
