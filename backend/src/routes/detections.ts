import { Router } from "express";
import frigate from "../services/frigate";

const router = Router();

router.get("/", async (_, res) => {

  try {

    const events =
      await frigate.get("/api/events");

    const result =
      events.data.map((event: any) => ({
        object: event.label,
        camera: event.camera,
        confidence:
          event.score
            ? `${Math.round(
                event.score * 100
              )}%`
            : "0%",
        time: new Date(
          event.start_time * 1000
        ).toLocaleString(),
      }));

    res.json(result);

  } catch (error) {

    res.status(500).json({
      error:
        "Failed to fetch detections",
    });

  }

});

export default router;