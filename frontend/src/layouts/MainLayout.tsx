import { Outlet, Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Camera,
  Film,
  ScanSearch,
  HardDrive,
  BarChart3,
  Settings,
} from "lucide-react";

export default function MainLayout() {
  const location = useLocation();

  const menu = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard size={18} />,
      path: "/",
    },
    {
      title: "Live Cameras",
      icon: <Camera size={18} />,
      path: "/cameras",
    },
    {
      title: "Detections",
      icon: <ScanSearch size={18} />,
      path: "/detections",
    },
    {
      title: "Recordings",
      icon: <Film size={18} />,
      path: "/recordings",
    },
    {
      title: "Storage",
      icon: <HardDrive size={18} />,
      path: "/storage",
    },
    {
      title: "Analytics",
      icon: <BarChart3 size={18} />,
      path: "/analytics",
    },
    {
      title: "Settings",
      icon: <Settings size={18} />,
      path: "/settings",
    },
  ];

  return (
    <div className="flex h-screen bg-[#181A1F]">

      <aside className="w-[240px] bg-[#202329] border-r border-zinc-800 p-5">

        <h1 className="text-xl font-bold text-yellow-500 mb-8">
          CCTV VMS
        </h1>

        <div className="space-y-2">

          {menu.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                location.pathname === item.path
                  ? "bg-yellow-500 text-black"
                  : "text-zinc-300 hover:bg-zinc-800"
              }`}
            >
              {item.icon}
              {item.title}
            </Link>
          ))}

        </div>

      </aside>

      <main className="flex-1 p-6 overflow-auto">
        <Outlet />
      </main>

    </div>
  );
}