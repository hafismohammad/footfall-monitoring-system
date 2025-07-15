// sensor-simulator/simulate.js
const axios = require('axios');

const sensors = [
  { id: 'sensor-001' },
  { id: 'sensor-002' },
];

// Function to generate a random count (footfall)
const getRandomFootfall = () => Math.floor(Math.random() * 100); // 0 - 99

// Send data for each sensor every 10 seconds (for demo)
setInterval(() => {
  sensors.forEach(async (sensor) => {
    const payload = {
      sensor_id: sensor.id,
      timestamp: new Date().toISOString(),
      count: getRandomFootfall(),
    };

    try {
      await axios.post('http://localhost:8000/api/sensor-data', payload);
      console.log(`Sent from ${sensor.id}:`, payload);
    } catch (err) {
      console.error(`Error sending from ${sensor.id}:`, err.message);
    }
  });
}, 100000);