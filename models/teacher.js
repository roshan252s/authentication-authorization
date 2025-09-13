const mongoose = require('mongoose')

const teacherSchema = new mongoose.Schema({
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
    subject: {
        type: String,
        enum: ['Maths', 'Account', 'Economics', 'Computer'],
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})



const Teacher = mongoose.model('Teacher', teacherSchema)
module.exports = Teacher