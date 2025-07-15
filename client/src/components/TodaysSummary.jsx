import { useEffect, useState } from "react";
import { getAnalytics } from "../services/analyticsService";

const sensorLocations = {
  "sensor-001": "Main Entrance",
  "sensor-002": "Side Exit",
  
};

const TodaysSummary = () => {
  const [footfallTotal, setFootfallTotal] = useState(0);
  const [sensorData, setSensorData] = useState([]);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const data = await getAnalytics();

        let total = 0;
        const perSensor = {};

        data.forEach((item) => {
          const sensor = item._id.sensor;
          const count = item.total;
          total += count;

          if (!perSensor[sensor]) {
            perSensor[sensor] = 0;
          }
          perSensor[sensor] += count;
        });

        setFootfallTotal(total);

        const formattedSensors = Object.entries(perSensor).map(
          ([sensor, count]) => ({
            sensor,
            count,
            location: sensorLocations[sensor] || "Unknown",
          })
        );

        setSensorData(formattedSensors);
      } catch (error) {
        console.error("Failed to load summary:", error);
      }
    };

    fetchSummary();
  }, []);

  return (
    <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-6 shadow-lg text-white">
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Today's Summary</h2>
          <span className="text-green-400 text-sm font-semibold">+12.5%</span>
        </div>
        <p className="text-muted-foreground text-sm">Total Footfall</p>
        <p className="text-4xl font-bold mt-1">{footfallTotal}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {sensorData.map((sensor, index) => (
          <div
            key={index}
            className="bg-white/5 border border-white/10 rounded-lg p-4"
          >
            <p className="text-sm text-muted-foreground font-medium">
              {sensor.sensor}
            </p>
            <p className="text-lg font-semibold">{sensor.location}</p>
            <p className="text-xl font-bold mt-1">{sensor.count} people</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodaysSummary;
