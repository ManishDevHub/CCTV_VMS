import { Router } from "express";
import axios from "axios";

const router = Router();

router.get("/", async (_, res) => {

  const services = [];

  try {
    await axios.get("http://localhost:5000/api/version");

    services.push({
      name: "Frigate",
      status: "Connected",
    });
  } catch {
    services.push({
      name: "Frigate",
      status: "Disconnected",
    });
  }

  services.push({
    name: "PostgreSQL",
    status: "Connected",
  });

  services.push({
    name: "MinIO",
    status: "Connected",
  });

  services.push({
    name: "Backend API",
    status: "Connected",
  });

  res.json(services);

});

export default router;