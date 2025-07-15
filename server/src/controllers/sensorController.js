import HTTP_statusCode from "../constants/httpStatusCodes.js";
import sensorService from "../services/sensorService.js";

class SensorController {
  async postSensorData(req, res, next) {
    const { sensor_id, timestamp, count } = req.body;
    console.log("sensor_id, timestamp, count", sensor_id, timestamp, count);

    if (!sensor_id || !timestamp || !count) {
      throw new AppError(
        "Missing required fields",
        HTTP_statusCode.BAD_REQUEST
      );
    }

    try {
      const result = await sensorService.createSensorData({
        sensor_id,
        timestamp,
        count,
      });
      res
        .status(HTTP_statusCode.CREATED)
        .json({ message: "Sensor data saved", data: result });
    } catch (err) {
      next(err);
    }
  }

  async getAnalytics(req, res, next) {
    try {
      console.log("hitt contrller");

      const analytics = await sensorService.getAnalytics();
      console.log("analytics", analytics);

      res.json(analytics);
    } catch (err) {
      next(err);
    }
  }

  async getDevices(req, res, next) {
    try {
      const deviceStatus = await sensorService.getDeviceStatus();
      res.json(deviceStatus);
    } catch (err) {
      next(err);
    }
  }
}

export default new SensorController();
