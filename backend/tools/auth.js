import jwt from "jsonwebtoken";

export const jwtGenerator = (id, email, login) => {
  return jwt.sign(
    { id: id, email: email, login: login },
    process.env.SECRET_KEY,
    {
      expiresIn: "2h",
    }
  );
};

export const generateRandomCode = () => {
  return Math.floor(100000 + Math.random() * 900000);
};
