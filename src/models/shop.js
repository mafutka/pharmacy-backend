import mongoose from "mongoose";
import bcrypt from "bcrypt";

const shopSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  owner: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  phone: {
    type: String,
    required: true,
  },

  address: {
    type: String,
    required: true,
  },

  city: {
    type: String,
    required: true,
  },

  zip: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  hasDelivery: {
    type: String,
    enum: ["yes", "no"],
    default: "no",
  },

  image: {
    type: String, // URL логотипа
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});
shopSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});
export default mongoose.model("Shop", shopSchema);