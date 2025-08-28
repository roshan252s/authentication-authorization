const express = require('express')
const router = express.Router()


const Student = require('../models/student')




router.post('/add', async (req, res) => {

    try {
        const stdData = req.body
        const newStd = new Student(stdData)

        response = await newStd.save()


        console.log('Data submitted succesfully');
        res.status(200).json(response)
        // res.status(200).json(response)

    } catch (err) {
        console.log("Error")
        res.status(500).json({ err: "Internal server error" })
    }
})
router.get('/get', async (req, res) => {

    try {

        const studentData = await Student.find()
        console.log('student data fetched');
        res.status(200).json(studentData)


    } catch (err) {
        console.log("Error")
        res.status(500).json({ err: "Internal server error" })
    }

})
router.put('/update/:id', async (req, res) => {

    try {

        stdId = req.params.id
        updatedStd = req.body


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
router.delete('/delete/:id', async (req, res) => {

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
