import express from "express";
import { upload } from "../middlewares/upload.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
  createShop,
  getShop,
  updateShop,
} from "../controllers/shopController.js";
import {
  getProducts,
  addProduct,
  getOneProduct,
  editProduct,
  removeProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.post("/create", authMiddleware, upload.single("logo"), createShop);
router.get("/:shopId", authMiddleware, getShop);
router.put("/:shopId/update", authMiddleware, upload.single("logo"), updateShop);

router.get("/:shopId/product", authMiddleware, getProducts);
router.post("/:shopId/product/add", authMiddleware, addProduct);
router.get("/:shopId/product/:productId", authMiddleware, getOneProduct);
router.put("/:shopId/product/:productId/edit", authMiddleware, editProduct);
router.delete("/:shopId/product/:productId/delete", authMiddleware, removeProduct);

export default router;