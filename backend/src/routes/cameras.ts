import { Router } from "express";
import frigate from "../services/frigate";

const router = Router();

router.get("/", async (_, res) => {
  try {
    const config = await frigate.get("/api/config");
    const stats = await frigate.get("/api/stats");

    const cameras = Object.keys(
      config.data.cameras
    ).map((name) => ({
      id: name,
      name,
      status:
        stats.data.cameras[name]?.camera_fps > 0
          ? "Online"
          : "Offline",
    }));
    

    res.json(cameras);
    
  } catch (err) {
    res.status(500).json({
      error: "Failed to load cameras",
    });
  }
});



export default router;