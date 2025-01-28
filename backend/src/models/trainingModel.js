const pool = require('../config/db');

const TrainingModel = {
  // Save a new training session
  async saveTraining(training) {
    const query = `
      INSERT INTO training (maxpulse, minpulse, avgpulse, steps, timestamp)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
    const values = [
      training.maxpulse,
      training.minpulse,
      training.avgpulse,
      training.steps,
      new Date()
    ];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  // Fetch all training sessions
  async getAllTrainings() {
    const query = 'SELECT * FROM training ORDER BY timestamp DESC;';
    const result = await pool.query(query);
    return result.rows;
  },

  // Fetch a single training session by ID
  async getTrainingById(id) {
    const query = 'SELECT * FROM training WHERE id = $1;';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  },

  // Fetch all average pulse values
  async getAllAvgPulse() {
    const query = 'SELECT avgpulse, timestamp FROM training';
    const result = await pool.query(query);
    return result.rows;
  },

  // Fetch all steps values
  async getSteps() {
    const query = 'SELECT steps, timestamp FROM training';
    const result = await pool.query(query);
    return result.rows;
  }
};

module.exports = TrainingModel;
