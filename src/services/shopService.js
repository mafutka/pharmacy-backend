import Shop from "../models/shop.js";

export const createShopService = async (data, file, userId) => {
  const logoUrl = file ? `/uploads/${file.filename}` : null;

  const shop = await Shop.create({
    ...data,
    logo: logoUrl,
    user: userId,
  });

  return shop;
};

export const getShopById = async (shopId) => {
  return await Shop.findById(shopId);
};

export const updateShop = async (shopId, data, file, userId) => {
  const shop = await Shop.findOne({ _id: shopId, user: userId })

  if (!shop) {
    throw new Error("Shop not found or forbidden")
  }

  const updateData = { ...data }

  if (file) {
    updateData.logo = `/uploads/${file.filename}`
  }

  return await Shop.findByIdAndUpdate(shopId, updateData, {
    new: true,
  })
}