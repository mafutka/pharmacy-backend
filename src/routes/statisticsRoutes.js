import express from "express";
import {
  getStatistics,
  getCustomerGoods,
} from "../controllers/statisticsController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getStatistics);

router.get("/:clientId/goods", authMiddleware, getCustomerGoods);

export default router;