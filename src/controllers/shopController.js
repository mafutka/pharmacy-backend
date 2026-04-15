import * as shopService from "../services/shopService.js";
import { shopSchema } from "../validation/shopValidation.js";

export const createShop = async (req, res) => {
  try {
    const { error } = shopSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const shop = await shopService.createShopService(
      req.body,
      req.file
    );

    res.json(shop);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

// 📄 GET ONE
export const getShop = async (req, res) => {
  try {
    const shop = await shopService.getShopById(req.params.shopId);
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