require('dotenv').config()
const express = require ('express')
const app = express()
const port = process.env.PORT || 3000
const db = require('./db')

const bodyParser = require ('body-parser')
app.use(bodyParser.json())

const studentRoutes = require('./routes/studentRoutes')

app.use('/',studentRoutes)

app.listen(port,()=>{
    console.log(`Database connected to port ${port}`);
})