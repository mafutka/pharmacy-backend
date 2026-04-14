import Shop from "../models/shop.js";
import { shopSchema } from "../validation/shopValidation.js";

export const createShop = async (req, res) => {
  try {
    const { error } = shopSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    
    const logoUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const shop = new Shop({
      ...req.body,
      image: logoUrl,
    });

    await shop.save();

    res.json(shop);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};