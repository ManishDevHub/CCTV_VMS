import { Router } from "express";
import frigate from "../services/frigate";

const router = Router();

router.get("/", async (_, res) => {
  try {

    const response =
      await frigate.get("/api/events");

    const recordings =
      response.data
        .filter((event: any) => event.has_clip)
        .map((event: any) => ({
          id: event.id,

          camera: event.camera,

          file: `${event.id}.mp4`,

          duration: "Available",

          size: "Unknown",

          url:
            `http://localhost:5000/api/events/${event.id}/clip.mp4`,

          snapshot:
            `http://localhost:5000/api/events/${event.id}/snapshot.jpg`,

          createdAt: new Date(
            event.start_time * 1000
          ).toLocaleString(),
        }));

    res.json(recordings);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Failed to load recordings",
    });

  }
});

export default router;