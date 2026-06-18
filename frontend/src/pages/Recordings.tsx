import React, { useEffect, useState } from "react";
import api from "../services/api";

interface Recording {
  id: string;
  camera: string;
  file: string;
  duration: string;
  size: string;
  url: string;
  createdAt?: string;
}

export default function Recordings() {
  const [recordings, setRecordings] = useState<Recording[]>([]);
  const [selectedVideo, setSelectedVideo] =
    useState<Recording | null>(null);

  useEffect(() => {
    loadRecordings();
  }, []);

  const loadRecordings = async () => {
    try {
      const res = await api.get("/recordings");
      setRecordings(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-3xl font-bold">
          Recordings
        </h1>

        <span className="text-zinc-400">
          Total Recordings: {recordings.length}
        </span>

      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">

        <table className="w-full">

          <thead className="bg-zinc-800">

            <tr>

              <th className="p-4 text-left">
                Camera
              </th>

              <th className="p-4 text-left">
                File
              </th>

              <th className="p-4 text-left">
                Duration
              </th>

              <th className="p-4 text-left">
                Size
              </th>

              <th className="p-4 text-left">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {recordings.map((item) => (

              <tr
                key={item.id}
                className="border-t border-zinc-800 hover:bg-zinc-800/40"
              >

                <td className="p-4">
                  {item.camera}
                </td>

                <td className="p-4">
                  {item.file}
                </td>

                <td className="p-4">
                  {item.duration}
                </td>

                <td className="p-4">
                  {item.size}
                </td>

                <td className="p-4 flex gap-2">

                  <button
                    onClick={() =>
                      setSelectedVideo(item)
                    }
                    className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded"
                  >
                    Play
                  </button>

                  <a
                    href={item.url}
                    download
                    target="_blank"
                    rel="noreferrer"
                    className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded"
                  >
                    Download
                  </a>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

     {selectedVideo && (
  <div className="mt-8">

    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 max-w-3xl">

      <div className="flex justify-between items-center mb-4">

        <h2 className="text-lg font-semibold">
          Video Playback
        </h2>

        <button
          onClick={() => setSelectedVideo(null)}
          className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
        >
          Close
        </button>

      </div>

      <video
        controls
        className="w-full rounded-lg"
        style={{
          maxHeight: "400px",
          objectFit: "contain",
        }}
      >
        <source
          src={selectedVideo.url}
          type="video/mp4"
        />
      </video>

    </div>

  </div>
)}

    </div>
  );
}