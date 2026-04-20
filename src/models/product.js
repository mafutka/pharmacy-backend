import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
    brand: {
    type: String,
    required: true,
  },

  stock: {
  type: Number,
  default: 0,
},

  price: {
    type: Number,
    required: true,
  },

  category: String,

    image: {
    type: String,
  },

  shopId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Shop",
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Product", productSchema);