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
      res.status(500).json({ error: 'Failed to fetch training sessions getTrainings' });
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
      res.status(500).json({ error: 'Failed to fetch training session getTrainingById' });
    }
  },

  // Fetch all average pulse values
  async getAllAvgPulse(req, res) {
    try {
      const avgPulse = await TrainingModel.getAllAvgPulse();
      res.status(200).json(avgPulse);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch average pulse values' });
    }
  },

  // Fetch all steps values
  async getSteps(req, res) {
    try {
      const avgSteps = await TrainingModel.getSteps();
      res.status(200).json(avgSteps);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch average steps values' });
    }
  }
};

module.exports = TrainingController;
