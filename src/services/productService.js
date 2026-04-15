import Product from "../models/product.js";

export const getProductsByShop = async (shopId) => {
  return await Product.find({ shopId });
};

export const createProduct = async (shopId, data) => {
  return await Product.create({
    ...data,
    shopId,
  });
};

export const getProductById = async (productId) => {
  return await Product.findById(productId);
};

export const updateProduct = async (productId, data) => {
  return await Product.findByIdAndUpdate(productId, data, { new: true });
};

export const deleteProduct = async (productId) => {
  return await Product.findByIdAndDelete(productId);
};