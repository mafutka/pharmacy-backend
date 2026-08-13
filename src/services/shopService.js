import Shop from "../models/shop.js";

export const createShopService = async (data, file, userId) => {
 
  const existing = await Shop.findOne({ user: userId })

  if (existing) {
    throw new Error("User already has a shop")
  }

  const logoUrl = file ? `/uploads/${file.filename}` : null

  const shop = await Shop.create({
    ...data,
    logo: logoUrl,
    user: userId,
  })

  return shop
}

export const getShopById = async (shopId, userId) => {
  return await Shop.findOne({
    _id: shopId,
    user: userId,
  });
};

export const updateShop = async (shopId, data, file, userId) => {
  const updateData = { ...data }

  if (file) {
    updateData.logo = `/uploads/${file.filename}`
  }

  const updated = await Shop.findOneAndUpdate(
    { _id: shopId, user: userId },
    updateData,
    { new: true }
  )

  if (!updated) {
    throw new Error("Shop not found or forbidden")
  }

  return updated
}