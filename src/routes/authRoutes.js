import express from "express";
import { login, register, logout, getUserInfo } from "../controllers/authControllers.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", authMiddleware, logout);
router.get("/user-info", authMiddleware, getUserInfo);

export default router;