require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
require('./db')

const passport = require('./auth')



app.use(passport.initialize())
const localAuth = passport.authenticate('local', { session: false })

app.get('/', async (req, res) => {
    res.send('Welcome to the Student Management System API')

})

const bodyParser = require('body-parser')
app.use(bodyParser.json())

const studentRoutes = require('./routes/studentRoutes')
app.use('/student',studentRoutes)

const teacherRoutes = require('./routes/teacherRoutes')
app.use('/teacher', teacherRoutes)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})