import express from "express"
import {
  getAllProducts,
  getOneProduct
} from "../controllers/productController.js"
import { authMiddleware } from "../middlewares/authMiddleware.js"

const router = express.Router()

router.get("/", authMiddleware, getAllProducts)
router.get("/:productId", authMiddleware, getOneProduct)

export default router