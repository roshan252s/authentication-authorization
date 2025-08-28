const mongoose = require('mongoose')

const MONGO_URL = process.env.MONGO_URL
mongoose.connect(MONGO_URL)

const db = mongoose.connection

db.on('connected', () => {
    console.log('Mongodb connected to server');
})

db.on('disconnected', () => {
    console.log('Mongodb disconnected');
})

db.on('error', () => {
    console.log('Connection error');
})