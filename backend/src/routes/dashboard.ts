import { Router } from "express";
import frigate from "../services/frigate";
import { s3 } from "../services/s3";
import {
  ListObjectsV2Command,
} from "@aws-sdk/client-s3";

const router = Router();

router.get("/stats", async (_, res) => {
  try {

    const config =
      await frigate.get("/api/config");

    const events =
      await frigate.get("/api/events");

    const cameras =
      Object.keys(
        config.data.cameras
      ).length;

    const detections =
      events.data.length;

    const bucketData =
      await s3.send(
        new ListObjectsV2Command({
          Bucket:
            process.env.AWS_BUCKET_NAME!,
        })
      );

    const totalBytes =
      bucketData.Contents?.reduce(
        (sum, file) =>
          sum + (file.Size || 0),
        0
      ) || 0;

    const storage =
      (
        totalBytes /
        1024 /
        1024
      ).toFixed(2) + " MB";

    const recordings =
      bucketData.KeyCount || 0;

    res.json({
      cameras,
      recordings,
      detections,
      storage,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Dashboard Error",
    });

  }
});

export default router;