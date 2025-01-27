const mqtt = require('mqtt');
const { saveTraining } = require('./models/trainingModel');
require('dotenv').config();

// Connect to MQTT broker
const client = mqtt.connect(process.env.MQTT_BROKER_URL, {
    username: process.env.MQTT_USERNAME,
    password: process.env.MQTT_PASSWORD,
});

// Topic to subscribe to
const topic = process.env.MQTT_TOPIC || 'fitness/training';

client.on('connect', () => {
    console.log('Connected to MQTT broker');
    client.subscribe(topic, (err) => {
        if (err) {
            console.error('Failed to subscribe to topic:', topic, err);
        } else {
            console.log(`Subscribed to topic: ${topic}`);
        }
    });
});

// Handle incoming messages
client.on('message', async (topic, message) => {
    try {
        console.log(`Message received on topic ${topic}:`, message.toString());

        const training = JSON.parse(message.toString());

        console.log('Raw message:', message.toString());
        console.log('Parsed training object:', training);
        // Validate message fields
        if (
            typeof training.maxpulse !== 'number' ||
            typeof training.minpulse !== 'number' ||
            typeof training.avgpulse !== 'number' ||
            typeof training.steps !== 'number' ||
            !training.timestamp
        ) {
            console.error('Invalid message format:', training);
            return;
        }

        // Save to the database
        const savedTraining = await saveTraining(training);
        console.log('Training saved to database:', savedTraining);
    } catch (error) {
        console.error('Failed to process message:', error);
    }
});

// Handle errors
client.on('error', (err) => {
    console.error('MQTT client error:', err);
});

client.on('close', () => {
    console.log('MQTT connection closed');
});
