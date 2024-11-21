const express = require('express')
const {
    createWorkout,
    getWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout
} = require('../controllers/workoutController')

const router = express.Router()

//get all
router.get('/', getWorkouts)

//get single
router.get('/:id', getWorkout)

//post new
router.post('/', createWorkout)

//delete
router.delete('/:id', deleteWorkout)

//update
router.patch('/:id', updateWorkout)


module.exports = router