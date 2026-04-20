import express from "express";
import { getStatistics } from "../controllers/statisticsController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getStatistics);

export default router;