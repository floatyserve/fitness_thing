const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
require('./mqttSubscriber');

const trainingRoutes = require('./routes/trainingRoutes');

const app = express();
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '0.0.0.0'; // Allow listening on all interfaces

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/trainings', trainingRoutes);

// Start the server
app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});
