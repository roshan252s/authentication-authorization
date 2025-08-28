const mongoose = require('mongoose')
// const mongooseURL = process.env.MONGO_URL_LOCAL
const mongooseURL = process.env.MONGO_URL_ONLINE


mongoose.connect(mongooseURL)
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