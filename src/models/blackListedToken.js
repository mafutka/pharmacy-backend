import mongoose from "mongoose";

const blacklistedTokenSchema = new mongoose.Schema({
  token: String,
  createdAt: { type: Date, default: Date.now, expires: "7d" } 
});

export const BlacklistedToken = mongoose.model(
  "BlacklistedToken",
  blacklistedTokenSchema
);