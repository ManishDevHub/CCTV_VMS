import { Router } from "express";
const router = Router();
router.get("/", async (_, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});
export default router;
