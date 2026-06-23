import { Router } from "express";
import multer from "multer";

import {
  PutObjectCommand,
} from "@aws-sdk/client-s3";

import { s3 } from "../services/s3";

const router = Router();

const upload = multer({
  storage: multer.memoryStorage(),
});

router.post(
  "/",
  upload.single("video"),
  async (req, res) => {

    if (!req.file)
      return res.status(400).json({
        error: "No file",
      });

    const key =
      Date.now() +
      "-" +
      req.file.originalname;

    await s3.send(
      new PutObjectCommand({
        Bucket:
          process.env.AWS_BUCKET_NAME,

        Key: key,

        Body: req.file.buffer,

        ContentType:
          req.file.mimetype,
      })
    );

    const url =
      `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;

    res.json({
      success: true,
      url,
    });
  }
);

export default router;