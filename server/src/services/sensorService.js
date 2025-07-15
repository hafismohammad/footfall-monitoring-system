import SensorData from "../models/SensorDataModel.js";

class SensorService {
  async createSensorData({ sensor_id, timestamp, count }) {
    const data = new SensorData({ sensor_id, timestamp, count });
    console.log("data", data);

    return await data.save();
  }

  async getAnalytics() {
    return await SensorData.aggregate([
      {
        $group: {
          _id: {
            sensor: "$sensor_id",
            time: {
              $dateToString: {
                format: "%H:%M", 
                date: "$timestamp",
                timezone: "Asia/Kolkata", 
              },
            },
          },
          total: { $sum: "$count" },
        },
      },
      {
        $sort: { "_id.time": 1 },
      },
    ]);
  }

  async getDeviceStatus() {
    const oneHourAgo = Date.now() - 1000 * 60 * 60; // 1 hour ago in ms

    const devices = await SensorData.aggregate([
      { $sort: { timestamp: -1 } },
      {
        $group: {
          _id: "$sensor_id",
          lastSeen: { $first: "$timestamp" },
        },
      },
    ]);

    return devices.map((d) => {
      const lastSeenTimestamp = new Date(d.lastSeen).getTime();
      return {
        sensor_id: d._id,
        lastSeen: d.lastSeen,
        status: lastSeenTimestamp > oneHourAgo ? "Active" : "Inactive",
      };
    });
  }
}

export default new SensorService();
