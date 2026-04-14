import express from "express";
import { createShop } from "../controllers/shop.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

router.post("/create", upload.single("logo"), createShop);

export default router;