import express from "express";
import Product from "../models/product.js"

const router = express.Router();

router.get("/", async (req, res) => {
  const products = await Product.find().populate("shopId");
  res.json(products);
});

export default router;