import  { useEffect, useState } from "react";
import { Maximize2 } from "lucide-react";
import api from "../services/api";

interface Camera {
  id: number;
  name: string;
  status: string;
}

export default function Cameras() {
  const [cameras, setCameras] = useState<Camera[]>([]);

  useEffect(() => {
    api
      .get("/cameras")
      .then((res) => setCameras(res.data))
      .catch(console.error);
  }, []);

  const openFullscreen = (cameraName: string) => {
    window.open(
      `http://localhost:5000/live/${cameraName}`,
      "_blank"
    );
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">
          Live Cameras
        </h1>

        <span className="text-zinc-400">
          {cameras.length} Cameras Connected
        </span>
      </div>

      <div className="grid grid-cols-2 gap-6">

        {cameras.map((camera) => (

          <div
            key={camera.id}
            className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden"
          >

            <div className="flex justify-between items-center p-4 border-b border-zinc-800">

              <div>
                <h3 className="font-semibold">
                  {camera.name}
                </h3>

                <span className="text-green-400 text-sm">
                  {camera.status}
                </span>
              </div>

              <button
                onClick={() =>
                  openFullscreen(camera.name)
                }
                className="p-2 rounded bg-zinc-800 hover:bg-zinc-700"
              >
                <Maximize2 size={18} />
              </button>

            </div>

            <div className="h-[300px] bg-black">

                <span
  className={`text-sm font-semibold ${
    camera.status === "Online"
      ? "text-green-400"
      : "text-red-400"
  }`}
>
  {camera.status}
</span>

<img
  src={`http://localhost:5000/api/${camera.name}/latest.jpg`}
  alt={camera.name}
  className="w-full h-[300px] object-cover"
/>

            </div>

          </div>

        ))}


      </div>
    </div>
  );
}