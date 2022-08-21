const express = require('express')
const http = require('http')
const cors = require('cors')
const app = express();
const mongoose = require('mongoose')
const Mentor = require('./models/mentor.model')
const Mentee = require('./models/mentee.model')
const ChatRoom = require('./models/Chatrooms.model')
const Message = require('./models/message.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const dotenv = require('dotenv')
dotenv.config()
app.use(cors())
app.use(express.json())
mongoose.connect(process.env.URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(console.log('connected to mongo')).catch(error => console.error(error))

app.get('/mentors', async (req, res) => {
    try {
        const mentors = await Mentor.find()
        res.json({ status: 'ok', mentors })
    } catch (error) {
        res.json({ status: 'error', error })
    }
})

app.get('/mentees', async (req, res) => {
    try {
        const mentees = await Mentee.find()
        res.json({ status: 'ok', mentees })
    } catch (error) {
        res.json({ status: 'error', error })
    }
})

app.get('/mentor/:mail', async (req, res) => {
    const mail = req.params.mail
    try {
        const mentor = await Mentor.find({ email: mail })
        res.json({ status: 'ok', mentor })
    } catch (error) {
        res.json({ status: 'error', error })
    }
})

app.get('/mentee/:mail', async (req, res) => {
    const mail = req.params.mail
    try {
        const mentee = await Mentee.find({ email: mail })
        res.json({ status: 'ok', mentee })
    } catch (error) {
        res.json({ status: 'error', error })
    }
})

app.post('/mentor/:mail', async (req, res) => {
    const mail = req.params.mail
    const bio = req.body.bio
    const facebook = req.body.facebook
    const twitter = req.body.twitter
    const linkedin = req.body.linkedin
    const instagram = req.body.instagram
    const github = req.body.github
    const rooms = req.body.rooms
    try {
        let mentor;
        if (bio) {
            mentor = await Mentor.findOneAndUpdate({ email: mail }, { bio: bio }, { new: true })
        }
        if (facebook) {
            mentor = await Mentor.findOneAndUpdate({ email: mail }, { facebook: facebook }, { new: true })
        }
        if (twitter) {
            mentor = await Mentor.findOneAndUpdate({ email: mail }, { twitter }, { new: true })
        }
        if (linkedin) {
            mentor = await Mentor.findOneAndUpdate({ email: mail }, { linkedin }, { new: true })
        }
        if (instagram) {
            mentor = await Mentor.findOneAndUpdate({ email: mail }, { instagram }, { new: true })
        }
        if (github) {
            mentor = await Mentor.findOneAndUpdate({ email: mail }, { github }, { new: true })
        }
        if (rooms) {
            mentor = await Mentor.findOneAndUpdate({ email: mail }, { rooms }, { new: true })
        }
        res.json({ status: 'ok' })
    } catch (error) {
        res.json({ status: 'error', error })
    }
})

app.post('/auth/mentor/register', async (req, res) => {
    console.log('nice');
    try {
        const newPassword = await bcrypt.hash(req.body.password, 10)
        await Mentor.create({
            name: req.body.name,
            email: req.body.email,
            password: newPassword,
            skills: req.body.skills
        })

        res.json({ status: 'ok', msg: "done" })
    } catch (err) {
        res.json({ status: 'error', error: 'Duplicate email' })
    }
})

app.post('/auth/mentee/register', async (req, res) => {
    console.log('nice');
    try {
        const newPassword = await bcrypt.hash(req.body.password, 10)
        await Mentee.create({
            name: req.body.name,
            email: req.body.email,
            password: newPassword,
        })
        res.json({ status: 'ok' })
    } catch (err) {
        res.json({ status: 'error', error: 'Duplicate email' })
    }
})

app.post('/auth/mentor/login', async (req, res) => {
    const mentor = await Mentor.findOne({
        email: req.body.email,
    })

    if (!mentor) {
        return { status: 'error', error: 'Invalid login' }
    }
    const isPasswordValid = await bcrypt.compare(
        req.body.password,
        mentor.password
    )

    if (isPasswordValid) {
        const token = jwt.sign(
            {
                name: mentor.name,
                email: mentor.email,
            },
            'secret123'
        )

        return res.json({ status: 'ok', name: mentor.name })
    } else {
        return res.json({ status: 'error', user: false })
    }
})

app.post('/auth/mentee/login', async (req, res) => {
    const mentee = await Mentee.findOne({
        email: req.body.email,
    })

    if (!mentee) {
        return { status: 'error', error: 'Invalid login' }
    }

    const isPasswordValid = await bcrypt.compare(
        req.body.password,
        mentee.password
    )

    if (isPasswordValid) {
        const token = jwt.sign(
            {
                name: mentee.name,
                email: mentee.email,
            },
            'secret123'
        )

        return res.json({ status: 'ok', name: mentee.name })
    } else {
        return res.json({ status: 'error', user: false })
    }
})

app.post('/mentor/skills', async (req, res) => {
    const token = req.headers['x-access-token']

    try {
        const email = req.body.email
        const mentor = await Mentor.find({ email: email })
        let skills = mentor[0].skills
        const uniqueSkills = [...new Set([...skills, ...req.body.skills])]
        await Mentor.updateOne(
            { email: email },
            { $set: { skills: uniqueSkills } },
        )

        return res.json({ status: 'ok' })
    } catch (error) {
        res.json({ status: 'error', error: 'invalid token' })
    }
})

app.get('/mentor/skills', async (req, res) => {
    const token = req.headers['x-access-token']

    try {
        const email = req.body.email
        const mentor = await Mentor.findOne({ email: email })
        return res.json({ status: 'ok', mentor: mentor.skills })
    } catch (error) {
        res.json({ status: 'error', error: 'invalid token' })
    }
})


app.post('/mentee/skills', async (req, res) => {
    const token = req.headers['x-access-token']

    try {
        const email = req.body.email
        const mentee = await Mentee.find({ email: email })
        let skills = mentee[0].skills
        const uniqueSkills = [...new Set([...skills, ...req.body.skills])]
        await Mentee.updateOne(
            { email: email },
            { $set: { skills: uniqueSkills } },
        )

        return res.json({ status: 'ok' })
    } catch (error) {
        res.json({ status: 'error', error: 'invalid token' })
    }
})

app.get('/mentee/skills', async (req, res) => {
    const token = req.headers['x-access-token']
    try {
        const email = req.body.email
        const mentee = await Mentee.findOne({ email: email })
        return res.json({ status: 'ok', mentee: mentee.skills })
    } catch (error) {
        res.json({ status: 'error', error: 'invalid token' })
    }
})

app.post('/rooms', async (req, res) => {
    const token = req.headers['x-access-token']
    try {
        const email = req.body.email
        const name = req.body.name
        const roomId = req.body.roomId
        const mentor = await Mentor.find({ email: email })
        let rooms = mentor[0].rooms
        const newRoom = {
            name,
            roomId
        }
        const uniqueRooms = [...new Set([...rooms, newRoom])]
        await Mentor.updateOne(
            { email: email },
            { $set: { rooms: uniqueRooms } },
        )
        return res.json({ status: 'ok', uniqueRooms: uniqueRooms })
    } catch (error) {
        res.json({ status: 'error', error: 'invalid token' })
    }
})

app.get('/mentor/rooms', async (req, res) => {
    const token = req.headers['x-access-token']
    try {
        const email = req.body.email
        const mentor = await Mentor.find({ email: email })
        return res.json({ status: 'ok', rooms: [...mentor[0].rooms] })
    } catch (error) {
        res.json({ status: 'error', error: 'invalid token' })
    }
})

app.get('/mentee/rooms', async (req, res) => {
    const token = req.headers['x-access-token']
    try {
        const email = req.body.email
        const mentee = await Mentee.find({ email: email })
        return res.json({ status: 'ok', rooms: [...mentee[0].rooms] })
    } catch (error) {
        res.json({ status: 'error', error: 'invalid token' })
    }
})

app.get('/room/:roomId', async (req, res) => {
    const roomId = req.params.roomId
    try {
        const chatRoom = await ChatRoom.find({ roomId: roomId })
        return res.json({ status: 'ok', chatRoom })
    } catch (error) {
        res.json({ status: 'error', error })
    }
})

app.post('/room', async (req, res) => {
    const email = req.body.email
    try {
        const chat = await ChatRoom.create({
            email: email,
            name: req.body.name,
            roomId: req.body.roomId,
        })
        return res.json({ status: 'ok', chat })
    } catch (error) {
        res.json({ status: 'error', error })
    }
})

app.post('/room/:roomId', async (req, res) => {
    const roomId = req.params.roomId
    try {
        const message = {
            name: req.body.name,
            email: req.body.email,
            content: req.body.content,
        }
        const chatRoom = await ChatRoom.find({ roomId: roomId })
        const lol = await ChatRoom.updateOne(
            { roomId: roomId },
            { $set: { messages: [...chatRoom[0].messages, message] } }
        )
        return res.json({ status: 'ok', lol })
    } catch (error) {
        res.json({ status: 'error', error })
    }
})

app.get('/rooms', async (req, res) => {
    try {
        const mentors = await Mentor.find()
        console.log(mentors);
        let rooms = [];
        mentors.map(mentor => {
            // console.log(mentor.rooms);
            rooms.push(...mentor.rooms)
        })
        return res.json({ status: 'ok', rooms: rooms })
    } catch (error) {
        res.json({ status: 'error', error })
    }
})

app.listen(4000, () => {
    console.log('Server started on 4000')
})