import * as shopService from "../services/shopService.js";
import Shop from "../models/shop.js";
import { shopSchema } from "../validation/shopValidation.js";

export const createShop = async (req, res) => {
  try {
    const { error } = shopSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const shop = await shopService.createShopService(
      req.body,
      req.file,
      req.user.id
    );

    res.json(shop);
  } catch (err) {
  if (err.code === 11000) {
    return res.status(400).json({ message: "Email already exists" });
  }

  console.error(err);
  res.status(500).json({ message: err.message });
}
};

export const getShop = async (req, res) => {
  try {
    const shop = await shopService.getShopById(req.params.shopId);
    res.json(shop);
  } catch {
    res.status(500).json({ message: "Error" });
  }
};

export const getMyShop = async (req, res) => {
  try {
    const shop = await Shop.findOne({ user: req.user.id });

    if (!shop) {
      return res.status(404).json({ message: "No shop" });
    }

    res.json(shop);
  } catch {
    res.status(500).json({ message: "Error" });
  }
};

export const updateShop = async (req, res) => {
  try {
    const { error } = shopSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const updated = await shopService.updateShop(
      req.params.shopId,
      req.body,
      req.file
    );

    res.json(updated);
  } catch {
    res.status(500).json({ message: "Error updating" });
  }
};

