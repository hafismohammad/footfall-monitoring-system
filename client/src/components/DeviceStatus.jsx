import { useEffect, useState } from "react";
import { getDevices } from "../services/deviceService";
import { Battery, Wifi } from "lucide-react";
import moment from "moment";

const sensorLocations = {
  "sensor-001": "Main Entrance",
  "sensor-002": "Side Exit",
};

const DeviceStatus = () => {
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const data = await getDevices();
        setDevices(data);
      } catch (err) {
        console.error("Failed to fetch device status", err);
      }
    };

    fetchDevices();
  }, []);

  const activeCount = devices.filter((d) => d.status === "Active").length;

  return (
    <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-6 shadow-card text-white">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Device Status</h2>
        <p className="text-sm text-muted-foreground">
          {activeCount}/{devices.length} Online
        </p>
      </div>

      <div className="space-y-4">
        {devices.map((device) => {
          const statusColor =
            device.status === "Active"
              ? "text-green-400"
              : device.status === "Warning"
              ? "text-yellow-400"
              : "text-red-400";

          return (
            <div
              key={device.sensor_id}
              className="p-4 border border-white/10 rounded-lg bg-white/5"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-semibold text-lg text-foreground">
                    {device.sensor_id}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {sensorLocations[device.sensor_id] || "Unknown Location"}
                  </p>
                </div>
                <p className={`font-medium ${statusColor}`}>{device.status}</p>
              </div>

              <p className="text-sm text-muted-foreground">
                Last seen: {moment(device.lastSeen).fromNow()}
              </p>

              <div className="flex items-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <Battery className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{device.battery || "--"}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <Wifi className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{device.signal || "--"}%</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DeviceStatus;
