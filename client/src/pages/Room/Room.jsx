import React, { useEffect, useRef, useState } from 'react'
import classes from './room.module.css'
import profile1 from '../../Assets/profile1.png'
import profile2 from '../../Assets/profile2.png'
import profile3 from '../../Assets/profile3.png'
import profile4 from '../../Assets/profile4.png'
import profile5 from '../../Assets/profile5.png'
import profile6 from '../../Assets/profile6.png'
import profile7 from '../../Assets/profile7.png'
import profile8 from '../../Assets/profile8.png'
import chatBackground from '../../Assets/chatsbackground.png'
import { useParams } from 'react-router-dom'
import { format } from 'timeago.js'
import io from "socket.io-client";

const socket = io.connect("http://localhost:5001");


export default function Room() {

    const profilePhotos = [profile1, profile2, profile3, profile4, profile5, profile6, profile7, profile8];

    const [meetOption, setMeetOption] = useState("create")
    const [rooms, setRooms] = useState([])
    const [chatRoom, setChatRoom] = useState({ name: 'Select a room' })
    const [user, setUser] = useState({})
    const scrollRef = useRef()

    const [newMessage, setNewMessage] = useState('')

    const giveRandom = () => {
        return Math.floor(Math.random() * 7);
    }

    let { mail } = useParams()

    const Room = ({ room }) => {
        return (
            <div className={classes.team} onClick={() => updateChat(room)} style={{ cursor: 'pointer' }}>
                <img className={classes.teamImage} src={profile1} alt="team"></img>
                <div className={classes.teamName}><h3>{room.name}</h3></div>
            </div>
        )
    }

    useEffect(() => {
        fetch(`http://localhost:4000/mentor/${mail}`).then(data => data.json()).then(data => { setRooms(data['mentor'][0]['rooms']); setUser(data['mentor'][0]) })
        chatRoom.roomId && socket.emit("join_room", chatRoom.roomId);
    }, [])

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [chatRoom])

    socket.on("receive_message", (data) => {
        setChatRoom([...chatRoom.messages, data.message]);
        updateChat(data.data)
    });

    const updateChat = (room) => {
        setChatRoom(room)
        fetch(`http://localhost:4000/room/${room.roomId}`).then(data => data.json()).then(data => setChatRoom(data['chatRoom'][0]))
    }

    const sendMessage = (e) => {
        e.preventDefault()

        const message = {
            name: user.name,
            email: user.email,
            content: newMessage
        }
        fetch(`http://localhost:4000/room/${chatRoom.roomId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(message),
        }).then(() => setChatRoom({ ...chatRoom, messages: [...chatRoom.messages, message] }))
        socket.emit("send_message", { message, data: chatRoom.roomId });
    }

    return (
        <div className={classes.outerDiv} style={{
            backgroundImage: `url(${chatBackground})`, height: 'fitContent', minHeight: '100vh'
        }}>
            {/* <div className={classes.searchDiv}>
                <input className={classes.searchTeamInput} placeholder="Search...."></input>
                <div className={classes.searchButton}>Search</div>
            </div> */}
            <div className={classes.roomDashboard}>
                <div className={classes.allTeams}>
                    {rooms && rooms.map((room, index) => {
                        return <Room key={index} room={room} />
                    })}
                </div>
                <div className={classes.roomChats} style={{
                    backgroundImage: `url(${chatBackground})`, height: 'fitContent'
                }}>
                    <div className={classes.teamDetailDiv}>
                        <div className={classes.teamDetails}>
                            <img className={classes.teamImage} src={profile1} alt="team"></img>
                            <div className={classes.teamName}><h3 style={{ color: 'white' }}>{rooms && chatRoom.name}</h3></div>
                            <div className="requests" style={{marginLeft:'1rem'}}> <i style={{fontSize:'2rem', color:'#ffc23c'}} class="fa-solid fa-envelope"></i></div>
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
                        {chatRoom.messages && chatRoom.messages.map((message, index) => {
                            return (
                                <div key={index}>
                                    <span > {message.name}</span>
                                    <h1>{message.content}</h1>
                                    {/* <span > {format(message.createdAt)}</span> */}
                                </div>
                            )
                        })}
                        <div ref={scrollRef} />
                    </div>
                    <div className={classes.sendMessageDiv}>
                        <input className={classes.inputMessageBox} placeholder='Type a message' onChange={(e) => setNewMessage(e.target.value)} value={newMessage}></input>
                        <div className={classes.sendButtton} onClick={sendMessage}>Send</div>
                    </div>
                </div>
            </div >
            <div className={classes.requestsDashboard}>
                <div className={classes.requestsDiv}>
                    <img className={classes.teamImage} src={profile3} alt="pro"></img>
                    <h3 style={{marginLeft:'2rem'}}>Aryan</h3>
                </div>
                <div className={classes.requestsDiv}>
                    <img className={classes.teamImage} src={profile3} alt="pro"></img>
                    <h3 style={{marginLeft:'2rem'}}>Aryan</h3>
                </div>
                <div className={classes.requestsDiv}>
                    <img className={classes.teamImage} src={profile3} alt="pro"></img>
                    <h3 style={{marginLeft:'2rem'}}>Aryan</h3>
                </div>
                <div className={classes.requestsDiv}>
                    <img className={classes.teamImage} src={profile3} alt="pro"></img>
                    <h3 style={{marginLeft:'2rem'}}>Aryan</h3>
                </div>
            </div>
        </div >
    )
}
