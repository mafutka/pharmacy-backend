import * as productService from "../services/productService.js";
import Product from "../models/product.js"
import { productSchema } from "../validation/productValidation.js";

export const getProducts = async (req, res) => {
  try {
    const { shopId } = req.params;
    const products = await productService.getProductsByShop(shopId);
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Error fetching products" });
  }
};

export const addProduct = async (req, res) => {
  try {
    const { error } = productSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const { name, price, category, brand, stock } = req.body;

    const imageUrl = req.file
      ? `/uploads/${req.file.filename}`
      : null;

    const product = await Product.create({
      name,
      brand,
      price,
      category,
      stock,
      image: imageUrl,
      shopId: req.params.shopId,
    });

    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

export const getOneProduct = async (req, res) => {
  try {
    const product = await productService.getProductById(req.params.productId);
    res.json(product);
  } catch {
    res.status(500).json({ message: "Error" });
  }
};

export const editProduct = async (req, res) => {
  try {
    const updateData = { ...req.body };

    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    const updated = await Product.findByIdAndUpdate(
      req.params.productId,
      updateData,
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

export const removeProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.productId);
    res.json({ message: "Deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};