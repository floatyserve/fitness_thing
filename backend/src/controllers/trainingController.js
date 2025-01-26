const TrainingModel = require('../models/trainingModel');

const TrainingController = {
  // Create a new training session
  async createTraining(req, res) {
    try {
      const training = req.body;
      const savedTraining = await TrainingModel.saveTraining(training);
      res.status(201).json(savedTraining);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to save training session' });
    }
  },

  // Fetch all training sessions
  async getTrainings(req, res) {
    try {
      const trainings = await TrainingModel.getAllTrainings();
      res.status(200).json(trainings);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch training sessions' });
    }
  },

  // Fetch a training session by ID
  async getTrainingById(req, res) {
    try {
      const { id } = req.params;
      const training = await TrainingModel.getTrainingById(id);
      if (!training) {
        return res.status(404).json({ error: 'Training session not found' });
      }
      res.status(200).json(training);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch training session' });
    }
  },
};

module.exports = TrainingController;
