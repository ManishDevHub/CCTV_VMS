import { useEffect, useState } from "react";
import api from "../services/api";

interface StorageData {
  totalStorage: string;
  usedStorage: string;
  recordings: number;
  snapshots: number;
  files: {
    id: string;
    camera: string;
    file: string;
  }[];
}

export default function Storage() {
  const [data, setData] =
    useState<StorageData | null>(null);

  useEffect(() => {
    api.get("/storage")
      .then((res) => setData(res.data))
      .catch(console.error);
  }, []);

  if (!data) {
    return (
      <div className="text-white">
        Loading Storage...
      </div>
    );
  }

  return (
    <div>

      <h1 className="text-3xl font-bold mb-8">
        Storage
      </h1>

      <div className="grid grid-cols-4 gap-5">

        <div className="bg-zinc-900 p-5 rounded-xl">
          <h3>Total Storage</h3>
          <p className="text-3xl font-bold mt-3">
            {data.totalStorage}
          </p>
        </div>

        <div className="bg-zinc-900 p-5 rounded-xl">
          <h3>Used</h3>
          <p className="text-3xl font-bold mt-3">
            {data.usedStorage}
          </p>
        </div>

        <div className="bg-zinc-900 p-5 rounded-xl">
          <h3>Recordings</h3>
          <p className="text-3xl font-bold mt-3">
            {data.recordings}
          </p>
        </div>

        <div className="bg-zinc-900 p-5 rounded-xl">
          <h3>Snapshots</h3>
          <p className="text-3xl font-bold mt-3">
            {data.snapshots}
          </p>
        </div>

      </div>

      <div className="mt-8 bg-zinc-900 rounded-xl p-5">

        <h2 className="text-xl font-semibold mb-4">
          Files
        </h2>

        <div className="space-y-2">

          {data.files.map((file) => (
            <div
              key={file.id}
              className="border-b border-zinc-800 pb-2"
            >
              {file.file}
            </div>
          ))}

        </div>

      </div>

    </div>
  );
}