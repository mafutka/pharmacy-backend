import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./src/routes/authRoutes.js";
import shopRoutes from "./src/routes/shopRoutes.js"

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use("/api/user", authRoutes);
app.use("/api/shop", shopRoutes);
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).json({ message: err.message });
});

app.get("/", (req, res) => {
  res.send("API is working");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("mongo connected"))
  .catch((err) => console.log(err));

app.listen(PORT, () =>
  console.log(`server is working on port ${PORT}`)
);