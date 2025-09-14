const express = require('express')
const router = express.Router()


const Student = require('../models/student')


const { jwtAuthMiddleware, generateToken } = require('../jwt')



router.post('/signup', async (req, res) => {
    try {
        const stdData = await req.body
        const newStd = new Student(stdData)

        const response = await newStd.save()
        const payload = {
            id: response._id,
            username: response.username,
        }
        const token = generateToken(payload)
        console.log('Data submitted succesfully');
        res.status(200).json({ response, token })

    } catch (err) {
        console.log("Error")
        res.status(500).json({ err: "Internal server error" })
    }
})



router.post('/login', async (req, res) => {
    const { username, password } = req.body

    try {
        const user = await Student.findOne({ username })        
        if(!user || !(await user.comparePassword(password))){
            return res.status(401).json({ Error: "Incorrect username or password" })
        }
        const payload = {
            username:user.username,
            id:user._id
        }
        const token = generateToken(payload)
        res.status(200).json(token)
    } catch (error) {
        res.status(500).json({ message: "Server Error found" })
    }
})

router.get('/getStd',jwtAuthMiddleware, async (req, res) => {
    try {
        const studentData = await Student.find()
        console.log('student data fetched');
        res.status(200).json(studentData)

    } catch (err) {
        console.log("Error")
        res.status(500).json({ err: "Internal server error" })
    }

})
router.get('/profile',jwtAuthMiddleware, async (req, res) => {
    try {
        const userData = req.user

        const id = userData.id
        const student = await Student.findById(id)
        res.status(200).json(student)

    } catch (err) {
        console.log("Error")
        res.status(500).json({ err: "Internal server error" })
    }

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
