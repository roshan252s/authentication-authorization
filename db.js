const mongoose = require('mongoose')

const MONGO_URL_LOCAL = process.env.MONGO_URL_LOCAL
mongoose.connect(MONGO_URL_LOCAL)

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