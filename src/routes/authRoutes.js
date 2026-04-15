import express from "express";
import { login, register, logout, getUserInfo } from "../controllers/authControllers.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/api/user/register", register);
router.post("/api/user/login", login);
router.post("/api/user/logout", authMiddleware, logout);
router.get("/api/user/user-info", authMiddleware, getUserInfo);

export default router;