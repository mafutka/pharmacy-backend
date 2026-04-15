import Shop from "../models/shop.js";

export const createShopService = async (data, file) => {
  const logoUrl = file ? `/uploads/${file.filename}` : null;

  const shop = await Shop.create({
    ...data,
    image: logoUrl,
  });

  return shop;
};

export const getShopById = async (shopId) => {
  return await Shop.findById(shopId);
};

export const updateShop = async (shopId, data, file) => {
  const updateData = { ...data };

  if (file) {
    updateData.image = `/uploads/${file.filename}`;
  }

  return await Shop.findByIdAndUpdate(shopId, updateData, {
    new: true,
  });
};