const mongoose = require('mongoose')

const stdSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true,
    },
    grade: {
        type: Number,
        required: true
    },
    section: {
        type: String,
    },
    roll: {
        type: Number,
        required: true,
        unique: true
    },
    subject: {
        type: String,
        enum: ['Maths', 'Account', 'Economics', 'Computer'],
        required: true
    }
})



const Student = mongoose.model('Student', stdSchema)
module.exports = Student