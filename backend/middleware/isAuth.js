import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export const isAuth = async (req, res, next) => {
  const token = req.cookies.token;

  try {
    const user = jwt.verify(token, process.env.SECRET_KEY);
    console.log('\nIsAuth');
    console.log(token + " " + user);
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized." });
  }
};
