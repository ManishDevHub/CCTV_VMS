
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import morgan from "morgan";

import dashboardRoutes from "./routes/dashboard";
import cameraRoutes from "./routes/cameras";
import detectionRoutes from "./routes/detections";
import recordingRoutes from "./routes/recordings";
import healthRoutes from "./routes/health";
import settingsRoutes from "./routes/settings";
import storageRoutes from "./routes/storage";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use("/health", healthRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/cameras", cameraRoutes);
app.use("/detections", detectionRoutes);
app.use("/recordings", recordingRoutes);
app.use("/settings", settingsRoutes);
app.use("/storage", storageRoutes);

// Global error handler with proper typing
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).json({ error: err.message || "Internal Server Error" });
});

export default app;