const express = require('express')
const router = express.Router()


const Teacher = require('../models/teacher')


router.post('/addTeacher', async (req, res) => {
    try {
        const teacherData = await req.body
        const newTeacher = new Teacher(teacherData)

        const response = await newTeacher.save()
        console.log('Data submitted succesfully');
        res.status(200).json(response)

    } catch (err) {
        console.log("Error")
        res.status(500).json({ err: "Internal server error" })
    }
})

router.get('/', async (req, res) => {
    res.send('Welcome to the Teacher Management System API')

})
router.get('/getTeacher', async (req, res) => {
    try {
        const teacherData = await Teacher.find()
        console.log('teacher data fetched');
        res.status(200).json(teacherData)

    } catch (err) {
        console.log("Error")
        res.status(500).json({ err: "Internal server error" })
    }

})
router.put('/updateTeacher/:id', async (req, res) => {

    try {

        const teacherId = req.params.id
        const updatedTeacher = req.body


        const updatedTeacherData = await Teacher.findByIdAndUpdate(teacherId, updatedTeacher, {
            new: true,
            runValidators: true

        })

        if (!updatedTeacherData) {
            return res.status(500).json({ error: "User doesn't exist" })
        }

        console.log('teacher data fetched');
        res.status(200).json(updatedTeacherData)

    } catch (err) {
        console.log("Error")
        res.status(500).json({ err: "Internal server error" })
    }

})
router.delete('/deleteTeacher/:id', async (req, res) => {

    try {
        const id = req.params.id
        const deleteTeacher = await Teacher.findByIdAndDelete(id)
        console.log('teacher data deleted');
        res.status(200).json(deleteTeacher)


    } catch (err) {
        console.log("Error")
        res.status(500).json({ err: "Internal server error" })
    }
})

module.exports = router
