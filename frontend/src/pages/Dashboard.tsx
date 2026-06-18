import { useEffect, useState } from "react";
import api from "../services/api";

import {
  Camera,
  Film,
  ScanSearch,
  HardDrive,
} from "lucide-react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

interface DashboardStats {
  cameras: number;
  recordings: number;
  detections: number;
  storage: string;
}

interface Detection {
  object: string;
  camera: string;
  confidence: string;
  time: string;
}

export default function Dashboard() {

  const [stats, setStats] =
    useState<DashboardStats>({
      cameras: 0,
      recordings: 0,
      detections: 0,
      storage: "0 MB",
    });

  const [detections, setDetections] =
    useState<Detection[]>([]);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {

      const statsRes =
        await api.get("/dashboard/stats");

      setStats(statsRes.data);

      const detectionRes =
        await api.get("/detections");

      setDetections(
        detectionRes.data.slice(0, 5)
      );

    } catch (error) {
      console.error(error);
    }
  };

  const lineData = [
    { day: "Mon", detections: 12 },
    { day: "Tue", detections: 22 },
    { day: "Wed", detections: 18 },
    { day: "Thu", detections: 35 },
    { day: "Fri", detections: 28 },
  ];

  const cameraData = [
    {
      name: "Online",
      value: stats.cameras,
    },
    {
      name: "Offline",
      value: 0,
    },
  ];

  const cards = [
    {
      title: "Total Cameras",
      value: stats.cameras,
      icon: <Camera size={22} />,
      color: "bg-blue-500",
    },
    {
      title: "Recordings",
      value: stats.recordings,
      icon: <Film size={22} />,
      color: "bg-orange-500",
    },
    {
      title: "Detections",
      value: stats.detections,
      icon: <ScanSearch size={22} />,
      color: "bg-red-500",
    },
    {
      title: "Storage Used",
      value: stats.storage,
      icon: <HardDrive size={22} />,
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="space-y-6">

      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">
          Dashboard
        </h1>

        <div className="text-sm text-zinc-400">
          Video Management System
        </div>
      </div>

      <div className="grid grid-cols-4 gap-5">

        {cards.map((item) => (
          <div
            key={item.title}
            className="bg-zinc-900 border border-zinc-800 rounded-xl p-5"
          >

            <div className="flex justify-between items-center">

              <div>

                <p className="text-zinc-400 text-sm">
                  {item.title}
                </p>

                <h2 className="text-3xl font-bold text-white mt-2">
                  {item.value}
                </h2>

              </div>

              <div
                className={`${item.color} p-3 rounded-lg`}
              >
                {item.icon}
              </div>

            </div>

          </div>
        ))}

      </div>

      <div className="grid grid-cols-2 gap-5">

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">

          <h2 className="text-lg font-semibold mb-4 text-white">
            Detection Trend
          </h2>

          <div className="h-80">

            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData}>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="detections"
                  stroke="#f59e0b"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>

          </div>

        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">

          <h2 className="text-lg font-semibold mb-4 text-white">
            Camera Status
          </h2>

          <div className="h-80">

            <ResponsiveContainer width="100%" height="100%">
              <PieChart>

                <Pie
                  data={cameraData}
                  dataKey="value"
                  innerRadius={70}
                  outerRadius={110}
                >
                  <Cell fill="#f59e0b" />
                  <Cell fill="#3f3f46" />
                </Pie>

                <Tooltip />

              </PieChart>
            </ResponsiveContainer>

          </div>

        </div>

      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">

        <h2 className="text-lg font-semibold mb-4 text-white">
          Recent Detections
        </h2>

        <table className="w-full">

          <thead>

            <tr className="text-zinc-400 border-b border-zinc-800">

              <th className="text-left p-3">
                Object
              </th>

              <th className="text-left p-3">
                Camera
              </th>

              <th className="text-left p-3">
                Confidence
              </th>

              <th className="text-left p-3">
                Time
              </th>

            </tr>

          </thead>

          <tbody>

            {detections.map((item, index) => (

              <tr
                key={index}
                className="border-b border-zinc-800"
              >

                <td className="p-3 text-white">
                  {item.object}
                </td>

                <td className="p-3 text-white">
                  {item.camera}
                </td>

                <td className="p-3 text-green-400">
                  {item.confidence}
                </td>

                <td className="p-3 text-zinc-400">
                  {item.time}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}