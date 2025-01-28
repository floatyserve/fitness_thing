const express = require('express');
const TrainingController = require('../controllers/trainingController');

const router = express.Router();

// POST /api/trainings - create a new training session
router.post('/', TrainingController.createTraining);

// GET /api/trainings - fetch all training sessions
router.get('/', TrainingController.getTrainings);

// GET /api/trainings/avgpulse - fetch all average pulse values
router.get('/avgpulse', TrainingController.getAllAvgPulse);

// GET /api/trainings/steps - fetch all steps values
router.get('/steps', TrainingController.getSteps);

// GET /api/trainings/:id - fetch a training session by ID
router.get('/:id', TrainingController.getTrainingById);

module.exports = router;
