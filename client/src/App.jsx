import "./App.css";
import { useEffect, useState } from "react";
import { Users, Activity, MapPin, Clock } from "lucide-react";
import RealTimeChart from "./components/RealTimeChart.jsx";
import { getAnalytics } from "./services/analyticsService.js";
import { getDevices } from "./services/deviceService.js";
import TodaysSummary from "./components/TodaysSummary.jsx";
import DeviceStatus from "./components/DeviceStatus.jsx";

function App() {
  const [totalPeople, setTotalPeople] = useState(0);
  const [activeSensors, setActiveSensors] = useState({ active: 0, total: 0 });
  const [locations, setLocations] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const analytics = await getAnalytics();
        const devices = await getDevices();
        // console.log('analytics',analytics);
        // console.log('devices',devices);

        const total = analytics.reduce((sum, item) => sum + item.total, 0);
        setTotalPeople(total);

        const active = devices.filter((d) => d.status === "Active").length;
        const totalSensors = devices.length;
        setActiveSensors({ active, total: totalSensors });

        setLocations(devices.length);
      } catch (err) {
        console.error("Error loading stats:", err);
      }
    };

    fetchStats();
  }, []);

  const stats = [
    {
      title: "Total People Today",
      value: totalPeople,
      change: "",
      icon: Users,
      trend: "up",
    },
    {
      title: "Active Sensors",
      value: `${activeSensors.active}/${activeSensors.total}`,
      change: "",
      icon: Activity,
      trend: "stable",
    },
    {
      title: "Locations Monitored",
      value: locations,
      change: "All online",
      icon: MapPin,
      trend: "stable",
    },
    {
      title: "Avg. Response Time",
      value: "1.2s",
      change: "-0.3s",
      icon: Clock,
      trend: "up",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0F172A] p-4 lg:p-6 text-white">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
              Footfall Monitoring System
            </h1>
            <p className="text-muted-foreground mt-1">
              Real-time analytics and sensor monitoring dashboard
            </p>
          </div>
          <div className="flex items-center gap-2 bg-secondary/50 rounded-lg px-3 py-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-foreground">Live</span>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-6 shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground font-medium">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-foreground mt-1">
                    {stat.value}
                  </p>
                  {stat.change && (
                    <p
                      className={`text-xs mt-1 flex items-center gap-1 ${
                        stat.trend === "up"
                          ? "text-green-500"
                          : "text-muted-foreground"
                      }`}
                    >
                      {stat.change}
                    </p>
                  )}
                </div>
                <div className="bg-primary/20 rounded-lg p-3">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-6 shadow-lg">
        <RealTimeChart />
      </div>

      <div className="mt-10">
        <TodaysSummary />
      </div>

      <div className="mt-10">
        <DeviceStatus />
      </div>
    </div>
  );
}

export default App;
