import * as productService from "../services/productService.js";

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
    const { shopId } = req.params;
    const product = await productService.createProduct(shopId, req.body);
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Error creating product" });
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
    const updated = await productService.updateProduct(
      req.params.productId,
      req.body
    );
    res.json(updated);
  } catch {
    res.status(500).json({ message: "Error updating" });
  }
};

export const removeProduct = async (req, res) => {
  try {
    await productService.deleteProduct(req.params.productId);
    res.json({ message: "Deleted" });
  } catch {
    res.status(500).json({ message: "Error deleting" });
  }
};