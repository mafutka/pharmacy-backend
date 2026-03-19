import { registerUser, loginUser } from "../services/authService.js"
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