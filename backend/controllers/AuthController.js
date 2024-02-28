import prisma from "../DB/db.config.js";

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

import { sendEmail } from "../tools/sendEmail.js";
import { resetPasswordHTML } from "../public/emails/resetPasswordHTML.js";

dotenv.config();

export const jwtGenerator = (id, email, login) => {
  return jwt.sign(
    { id: id, email: email, login: login },
    process.env.SECRET_KEY,
    {
      expiresIn: "2h",
    }
  );
};

export const register = async (req, res) => {
  const { login, email, password, full_name } = req.body;

  if (!login || !email || !password || !full_name) {
    return res.status(400).json({ message: "Missing parameters." });
  }

  // ? I think it would be better to validate this on the frontend
  // ? but anyway i leave it here
  //   if (!/^[a-zA-Z0-9_,.\-]{1,20}$/.test(login)) {
  //     return res.status(400).send({
  //       status: 400,
  //       message:
  //         "Login is invalid. It must be 1 to 20 characters long and do not conatin spaces, symbols(except [,.-_]).",
  //     });
  //   }

  const findUserByEmail = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  const findUserByLogin = await prisma.user.findUnique({
    where: {
      login: login,
    },
  });

  if (findUserByEmail) {
    return res
      .status(400)
      .json({ message: "Email already taken, please try another one." });
  }
  if (findUserByLogin) {
    return res
      .status(400)
      .json({ message: "Login already taken, please try another one." });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      login: login,
      email: email,
      password: hashedPassword,
      full_name: full_name,
    },
  });

  const calendar = await prisma.calendar.create({
    data: {
      name: user.email,
      color: "#00BFFF",
      description: "Default calendar for user",
      isMain: true,
    },
  });

  await prisma.userCalendars.create({
    data: {
      userId: user.id,
      calendarId: calendar.id,
      role: "ADMIN",
      isConfirmed: true,
    },
  });

  return res.status(201).json({ message: "Registration successful!" });
};

export const login = async (req, res) => {
  const { login, password } = req.body;
  if (!login || !password) {
    return res.status(400).json({ message: "Missing parameters." });
  }
  const user = await prisma.user.findUnique({
    where: {
      login: login,
    },
  });

  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid password." });
  }

  const token = jwtGenerator(user.id, user.email, user.login);
  res.cookie("token", token, { httpOnly: true, expiresIn: "2h" });
  return res.status(200).json({ message: "Login successful!" });
};

export const logout = async (req, res) => {
  res.clearCookie("token");
  return res.status(200).json({ message: "Logout successful!" });
};

export const resetPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Missing parameters." });
  }

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }

  const secret = process.env.SECRET_KEY + user.password;
  const payload = {
    email: user.email,
    id: user.id,
  };
  const token = await jwt.sign(payload, secret, { expiresIn: "1h" });

  const link = `http://${process.env.HOST}:${process.env.PORT}/api/auth/reset-password/${user.id}/${token}`;
  // const message = `Here is your <a href="${link}">link to reset password</a>, remember it is valid for 1 hour and can be used only once.`;
  // await sendEmail(email, "Password Reset", message);
  await sendEmail(
    email,
    "🔒 Password Reset 🔒",
    resetPasswordHTML(user.full_name, link)
  );
  return res.status(200).json({ message: "Email sent." });
};

export const confirmResetPassword = async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;

  if (!id || !token || !password) {
    return res.status(400).json({ message: "Missing parameters." });
  }

  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });

  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }

  const secret = process.env.SECRET_KEY + user.password;
  try {
    const payload = jwt.verify(token, secret);
    if (payload.id !== user.id) {
      return res.status(401).json({ message: "Unauthorized." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: hashedPassword,
      },
    });
    return res.status(200).json({ message: "Password changed." });
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized." });
  }
};