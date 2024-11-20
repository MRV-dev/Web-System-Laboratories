const express = require('express')
const {
    createWorkout,
    getWorkouts,
    getWorkout
} = require('../controllers/workoutController')

const router = express.Router()

//get all
router.get('/', getWorkouts)

//get single
router.get('/:id', getWorkout)

//post new
router.post('/', createWorkout)

//delete
router.delete('/:id', (req, res) => {
    res.json({mssg: 'delete workout'})
})

//update
router.patch('/:id', (req, res) => {
    res.json({mssg: 'update a workout'})
})


module.exports = router