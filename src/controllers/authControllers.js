import { registerUser, loginUser } from "../services/authService.js"
import { BlacklistedToken } from "../models/blackListedToken.js";
import {User} from "../models/user.js"  
import jwt from "jsonwebtoken"

export const register = async (req, res, next) => {
    try {
        const user = await registerUser(req.body);
        res.status(201).json({
      message: "User created",
      user,
    })
    } catch (err) {
next(err)
    }
}
export const login = async (req, res, next) => {
  try {
    const user = await loginUser(req.body);

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token });
  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res, next) => {
  try {
    const header = req.headers.authorization;
    const token = header.split("")[1];

    await BlacklistedToken.create({ token });

    res.json({ message: "Logged out successfully" });
  } catch (err) {
    next(err);
  }
};

export const getUserInfo = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("name email");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    next(err);
  }
};