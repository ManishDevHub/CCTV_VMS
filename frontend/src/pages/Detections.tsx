import React, { useEffect, useState } from "react";
import api from "../services/api";

interface Detection {
  id?: string;
  object: string;
  confidence: string;
  camera: string;
  time: string;
}

export default function Detections() {
  const [detections, setDetections] = useState<Detection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDetections();
  }, []);

  const loadDetections = async () => {
    try {
      const res = await api.get("/detections");
      setDetections(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getBadgeColor = (object: string) => {
    switch (object.toLowerCase()) {
      case "person":
        return "bg-blue-500";
      case "car":
        return "bg-orange-500";
      case "dog":
        return "bg-green-500";
      case "cat":
        return "bg-purple-500";
      default:
        return "bg-zinc-600";
    }
  };

  return (
    <div>

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-3xl font-bold">
          Detections
        </h1>

        <div className="text-zinc-400">
          Total: {detections.length}
        </div>

      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">

        {loading ? (

          <div className="p-8 text-center">
            Loading detections...
          </div>

        ) : detections.length === 0 ? (

          <div className="p-8 text-center text-zinc-500">
            No detections found
          </div>

        ) : (

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-zinc-800">

                <tr>

                  <th className="p-4 text-left">
                    Object
                  </th>

                  <th className="p-4 text-left">
                    Confidence
                  </th>

                  <th className="p-4 text-left">
                    Camera
                  </th>

                  <th className="p-4 text-left">
                    Time
                  </th>

                </tr>

              </thead>

              <tbody>

                {detections.map((item, index) => (

                  <tr
                    key={item.id || index}
                    className="border-t border-zinc-800 hover:bg-zinc-800/50"
                  >

                    <td className="p-4">

                      <span
                        className={`${getBadgeColor(
                          item.object
                        )} px-3 py-1 rounded-full text-sm`}
                      >
                        {item.object}
                      </span>

                    </td>

                    <td className="p-4 text-green-400">
                      {item.confidence}
                    </td>

                    <td className="p-4">
                      {item.camera}
                    </td>

                    <td className="p-4 text-zinc-400">
                      {item.time}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>
  );
}