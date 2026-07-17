import Product from "../models/product.js";

export const getProductsByShop = async (shopId, page = 1, limit = 10) => {
  const products = await Product.find({ shopId })
    .skip((page - 1) * limit)
    .limit(limit);

  const total = await Product.countDocuments({ shopId });

  return {
    products,
    totalPages: Math.ceil(total / limit),
  };
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