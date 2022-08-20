const express = require('express')
const http = require('http')
const cors = require('cors')
const app = express();
const mongoose = require('mongoose')
const Mentor = require('./models/mentor.model')
const Mentee = require('./models/mentee.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const dotenv = require('dotenv')
dotenv.config()
app.use(cors())
app.use(express.json())
console.log(process.env.URL);
mongoose.connect(process.env.URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(console.log('connected to mongo')).catch(error => console.error(error))

app.post('/mentor/register', async (req, res) => {
    console.log(req.body)
    try {
        const newPassword = await bcrypt.hash(req.body.password, 10)
        await Mentor.create({
            name: req.body.name,
            email: req.body.email,
            password: newPassword,
            skills: req.body.skills
        })
        res.json({ status: 'ok' })
    } catch (err) {
        res.json({ status: 'error', error: 'Duplicate email' })
    }
})

app.post('/mentee/register', async (req, res) => {
    console.log(req.body)
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

app.post('/mentor/login', async (req, res) => {
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
                name: Mentor.name,
                email: Mentor.email,
            },
            'secret123'
        )

        return res.json({ status: 'ok', user: token })
    } else {
        return res.json({ status: 'error', user: false })
    }
})

app.post('/mentee/login', async (req, res) => {
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
                name: Mentee.name,
                email: Mentee.email,
            },
            'secret123'
        )

        return res.json({ status: 'ok', user: token })
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
        console.log(error)
        res.json({ status: 'error', error: 'invalid token' })
    }
})

app.get('/mentor/skills', async (req, res) => {
    const token = req.headers['x-access-token']

    try {
        const email = req.body.email
        const mentor = await Mentor.findOne({ email: email })
        console.log(email);
        return res.json({ status: 'ok', mentor: mentor.skills })
    } catch (error) {
        console.log(error)
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
        console.log(error)
        res.json({ status: 'error', error: 'invalid token' })
    }
})

app.get('/mentee/skills', async (req, res) => {
    const token = req.headers['x-access-token']
    try {
        const email = req.body.email
        const mentee = await Mentee.findOne({ email: email })
        console.log(email);
        return res.json({ status: 'ok', mentee: mentee.skills })
    } catch (error) {
        console.log(error)
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
        console.log(email);
        return res.json({ status: 'ok', uniqueRooms: uniqueRooms })
    } catch (error) {
        console.log(error)
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
        console.log(error)
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
        console.log(error)
        res.json({ status: 'error', error: 'invalid token' })
    }
})



app.listen(4000, () => {
    console.log('Server started on 4000')
})