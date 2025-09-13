const express = require('express')
const router = express.Router()


const Student = require('../models/student')

const passport = require('../auth')


router.use(passport.initialize())
const localAuth = passport.authenticate('local', { session: false })



// router.use(logRequest) // This will log for all the routes


// Add a new student. (logRequest is the middleware function which runs only for this route)
router.post('/addStd', async (req, res) => {
    try {
        const stdData = await req.body
        const newStd = new Student(stdData)

        const response = await newStd.save()
        console.log('Data submitted succesfully');
        res.status(200).json(response)

    } catch (err) {
        console.log("Error")
        res.status(500).json({ err: "Internal server error" })
    }
})

router.get('/getStd', localAuth, async (req, res) => {
    try {
        const studentData = await Student.find()
        console.log('student data fetched');
        res.status(200).json(studentData)

    } catch (err) {
        console.log("Error")
        res.status(500).json({ err: "Internal server error" })
    }

})
router.get('/', async (req, res) => {
    res.send('Welcome to the Student Management System API')

})
router.put('/updateStd/:id', async (req, res) => {

    try {

        const stdId = req.params.id
        const updatedStd = req.body


        const updatedStudentData = await Student.findByIdAndUpdate(stdId, updatedStd, {
            new: true,
            runValidators: true

        })

        if (!updatedStudentData) {
            return res.status(500).json({ error: "User doesn't exist" })
        }

        console.log('student data fetched');
        res.status(200).json(updatedStudentData)

    } catch (err) {
        console.log("Error")
        res.status(500).json({ err: "Internal server error" })
    }

})
router.delete('/deleteStd/:id', async (req, res) => {

    try {
        const id = req.params.id
        const deleteStd = await Student.findByIdAndDelete(id)
        console.log('student data deleted');
        res.status(200).json(deleteStd)


    } catch (err) {
        console.log("Error")
        res.status(500).json({ err: "Internal server error" })
    }
})

module.exports = router
