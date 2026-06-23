import { Router } from "express";
import {
  ListObjectsV2Command,
} from "@aws-sdk/client-s3";

import { s3 } from "../services/s3";

const router = Router();

router.get("/", async (_, res) => {
  try {
    const result = await s3.send(
      new ListObjectsV2Command({
        Bucket: process.env.AWS_BUCKET_NAME!,
      })
    );

    const files =
      result.Contents?.map((file) => ({
        id: file.Key,
        camera: "AWS S3",
        file: file.Key,
        size: file.Size || 0,
      })) || [];

    const totalBytes = files.reduce(
      (sum, file) => sum + file.size,
      0
    );

    const usedStorage =
      (
        totalBytes /
        1024 /
        1024
      ).toFixed(2) + " MB";

    res.json({
      totalStorage: "Unlimited (AWS S3)",
      usedStorage,
      recordings: files.length,
      snapshots: 0,
      files,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to load storage data",
    });
  }
});

export default router;