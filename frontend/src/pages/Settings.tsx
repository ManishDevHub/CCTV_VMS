import { useEffect, useState } from "react";
import api from "../services/api";

interface Service {
  name: string;
  status: string;
}

export default function Settings() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      const res = await api.get("/settings");
      setServices(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-3xl font-bold">
          System Health
        </h1>

        <span className="text-zinc-400">
          Service Monitoring
        </span>

      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">

        {loading ? (

          <div className="p-8 text-center">
            Checking services...
          </div>

        ) : (

          <table className="w-full">

            <thead className="bg-zinc-800">

              <tr>

                <th className="p-4 text-left">
                  Service
                </th>

                <th className="p-4 text-left">
                  Status
                </th>

              </tr>

            </thead>

            <tbody>

              {services.map((service) => (

                <tr
                  key={service.name}
                  className="border-t border-zinc-800"
                >

                  <td className="p-4">
                    {service.name}
                  </td>

                  <td className="p-4">

                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        service.status === "Connected"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    >
                      {service.status}
                    </span>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        )}

      </div>

    </div>
  );
}