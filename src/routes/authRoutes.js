import express from "express";
import { login, register, logout, getUserInfo } from "../controllers/authControllers.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/user/register", register);
router.post("/user/login", login);
router.post("/user/logout", authMiddleware, logout);
router.get("/user/user-info", authMiddleware, getUserInfo);

export default router;