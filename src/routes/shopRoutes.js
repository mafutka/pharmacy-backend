import express from "express"
import { upload } from "../middlewares/upload.js"
import { authMiddleware } from "../middlewares/authMiddleware.js"
import {
  createShop,
  getShop,
  updateShop,
  getMyShop,
} from "../controllers/shopController.js"
import {
  getProducts,
  addProduct,
  editProduct,
  removeProduct,
  addProductToShop,
} from "../controllers/productController.js"

const router = express.Router()

router.post("/create", authMiddleware, upload.single("logo"), createShop)
router.get("/my", authMiddleware, getMyShop)
router.get("/:shopId", authMiddleware, getShop)
router.put("/:shopId/update", authMiddleware, upload.single("logo"), updateShop)

router.get("/:shopId/products", authMiddleware, getProducts)
router.post(
  "/:shopId/products",
  authMiddleware,
  upload.single("image"),
  addProduct,
)
router.put(
  "/:shopId/products/:productId/edit",
  authMiddleware,
  upload.single("image"),
  editProduct,
)
router.delete(
  "/:shopId/products/:productId/delete",
  authMiddleware,
  removeProduct,
)

router.post(
  "/:shopId/products/:productId/add",
  authMiddleware,
  addProductToShop
)

export default router
