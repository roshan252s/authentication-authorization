const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

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


stdSchema.pre('save', async function (next) {
    const student = this

    if (!student.isModified('password')) return next()
    try {

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(student.password, salt)
        student.password = hashedPassword
        next()

    } catch (error) {
        return next(error)
    }
})


stdSchema.methods.comparePassword = async function (candidatePassword) {

    try {
        const isMatch = await bcrypt.compare(candidatePassword, this.password)
        return isMatch
    } catch (error) {
        throw new Error('Password comparison failed')
    }
}


const Student = mongoose.model('Student', stdSchema)
module.exports = Student