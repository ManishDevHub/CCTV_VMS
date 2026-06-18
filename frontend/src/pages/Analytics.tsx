import { useEffect, useState } from "react";
import api from "../services/api";

import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface ChartData {
  name: string;
  value: number;
}

export default function Analytics() {
  const [data, setData] = useState<ChartData[]>([]);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      const res = await api.get("/detections");

      const counts: Record<string, number> = {};

      res.data.forEach((item: any) => {
        counts[item.object] =
          (counts[item.object] || 0) + 1;
      });

      const chartData = Object.entries(counts).map(
        ([name, value]) => ({
          name,
          value,
        })
      );

      setData(chartData);
    } catch (error) {
      console.error(error);
    }
  };

  const colors = [
    "#f59e0b",
    "#3b82f6",
    "#ef4444",
    "#10b981",
    "#8b5cf6",
    "#ec4899",
  ];

  return (
    <div>

      <h1 className="text-3xl font-bold mb-8">
        Analytics
      </h1>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 h-[550px]">

        <h2 className="text-xl mb-5">
          Object Detection Distribution
        </h2>

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <PieChart>

            <Pie
              data={data}
              dataKey="value"
              outerRadius={180}
              label
            >

              {data.map((_, index) => (
                <Cell
                  key={index}
                  fill={
                    colors[
                      index % colors.length
                    ]
                  }
                />
              ))}

            </Pie>

            <Tooltip />
            <Legend />

          </PieChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}