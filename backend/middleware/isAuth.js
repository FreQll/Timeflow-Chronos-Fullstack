import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export const isAuth = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return next();
  }

  try {
    const user = jwt.verify(token, process.env.SECRET_KEY);
    next();
  } catch (error) {
    res.clearCookie("token");
    return res.status(401).json({ message: "Token expired." });
  }
};
