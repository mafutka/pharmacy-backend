import express from "express";
import { login, register } from "../controllers/authControllers.js";

const router = express.Router();

router.post("/user/register", register);
router.post("/user/login", login);

export default router;