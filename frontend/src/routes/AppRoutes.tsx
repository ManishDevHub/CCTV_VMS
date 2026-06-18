import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Dashboard from "../pages/Dashboard";
import Cameras from "../pages/Cameras";
import Detections from "../pages/Detections";
import Recordings from "../pages/Recordings";
import Storage from "../pages/Storage";
import Analytics from "../pages/Analytics";
import Settings from "../pages/Settings";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/cameras" element={<Cameras />} />
          <Route path="/detections" element={<Detections />} />
          <Route path="/recordings" element={<Recordings />} />
          <Route path="/storage" element={<Storage />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}