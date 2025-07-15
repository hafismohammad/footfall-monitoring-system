import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { getAnalytics } from "../services/analyticsService";

const RealTimeChart = () => {
  const [data, setData] = useState([]);
  const [sensors, setSensors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAnalytics();

        const grouped = {};
        const sensorSet = new Set();

        response.forEach((item) => {
          const { time, sensor } = item._id;
          sensorSet.add(sensor);

          if (!grouped[time]) {
            grouped[time] = { time };
          }

          grouped[time][sensor] = item.total;
        });

        const chartData = Object.values(grouped);
        setData(chartData);
        setSensors(Array.from(sensorSet));

        console.log("Transformed chart data:", chartData);
      } catch (error) {
        console.error("Failed to fetch analytics data:", error);
      }
    };

    fetchData();
  }, []);

  if (data.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-10">
        Waiting for footfall data...
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis
          label={{ value: "Footfall", angle: -90, position: "insideLeft" }}
        />
        <Tooltip />
        <Legend />

        {sensors.map((sensorId, index) => (
          <Line
            key={sensorId}
            type="monotone"
            dataKey={sensorId}
            stroke={getSensorColor(index)}
            strokeWidth={2}
            dot={{ r: 3 }}
            name={`Sensor ${sensorId}`}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

// Helper: cycle through colors for multiple sensors
const getSensorColor = (index) => {
  const colors = ["#8884d8", "#82ca9d", "#ff7300", "#ff4f81", "#00bcd4"];
  return colors[index % colors.length];
};

export default RealTimeChart;
