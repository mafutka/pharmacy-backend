import mongoose from "mongoose";
import bcrypt from "bcrypt";

const shopSchema = new mongoose.Schema({
  name: String,
  owner: String,
  email: { type: String, unique: true },
  phone: String,
  address: String,
  city: String,
  zip: String,

  hasDelivery: {
    type: String,
    enum: ["yes", "no"],
    default: "no",
  },

  image: String,

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
}, { timestamps: true });
shopSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 10);
});
export default mongoose.model("Shop", shopSchema);