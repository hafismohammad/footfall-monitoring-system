import express from 'express';
import sensorController from '../controllers/sensorController.js';

const router = express.Router();

router.post('/sensor-data', sensorController.postSensorData.bind(sensorController));
router.get('/analytics', sensorController.getAnalytics.bind(sensorController));
router.get('/devices', sensorController.getDevices.bind(sensorController));

export default router;
