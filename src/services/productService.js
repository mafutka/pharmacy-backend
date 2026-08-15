import Product from "../models/product.js";

export const getAllProducts = async ({
  page = 1,
  limit = 10,
  category,
  search,
}) => {
  const query = {};

  if (category) query.category = category;
  if (search) query.name = { $regex: search, $options: "i" };

  const products = await Product.find(query)
    .skip((page - 1) * limit)
    .limit(limit);

  const total = await Product.countDocuments(query);

  return {
    products,
    totalPages: Math.ceil(total / limit),
  };
};
export const getProductsByShop = async (
  shopId,
  page = 1,
  limit = 10
) => {
  const skip = (page - 1) * limit

  const products = await Product.find({ shopId })
    .skip(skip)
    .limit(limit)

  const total = await Product.countDocuments({ shopId })

  return {
    products,
    totalPages: Math.ceil(total / limit),
  }
}
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
  return await Product.findByIdAndUpdate(productId, data, { new: true,  runValidators: true, });
};

export const deleteProduct = async (productId) => {
  return await Product.findByIdAndDelete(productId);
};

export const addProductToShop = async (
  shopId,
  productId
) => {
  const product = await Product.findById(productId)

  if (!product) {
    throw new Error("Product not found")
  }

  const alreadyExists = await Product.findOne({
    shopId,
    name: product.name,
    brand: product.brand,
  })

  if (alreadyExists) {
    throw new Error("Product already exists in this shop")
  }

  const newProduct = await Product.create({
    name: product.name,
    brand: product.brand,
    price: product.price,
    category: product.category,
    stock: product.stock,
    image: product.image,
    description: product.description,
    shopId,
  })

  return newProduct
}