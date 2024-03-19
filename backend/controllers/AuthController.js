import prisma from "../DB/db.config.js";

import bcrypt from "bcrypt";
import dotenv from "dotenv";

import { sendEmail } from "../tools/sendEmail.js";
import { resetPasswordHTML } from "../public/emails/resetPasswordHTML.js";
import { generateRandomCode, jwtGenerator } from "../tools/auth.js";

dotenv.config();

export const register = async (req, res) => {
  const { email, password, full_name } = req.body;

  const login = full_name;

  if (!email || !password || !full_name) {
    return res.status(400).json({ message: "Missing parameters." });
  }

  const findUserByEmail = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (findUserByEmail) {
    return res
      .status(400)
      .json({ message: "Email already taken, please try another one." });
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
  const { email, password } = req.body;
  if (!email || !password) {
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

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid password." });
  }

  const token = jwtGenerator(user.id, user.email, user.full_name);
  res.cookie("token", token, { httpOnly: false, expiresIn: "2h" });
  return res.status(200).json({
    user: {
      id: user.id,
      login: user.login,
      email: user.email,
      full_name: user.full_name,
    },
    message: "Login successful!",
  });
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

  const resetCode = generateRandomCode();
  const resetCodeCrypted = await bcrypt.hash(resetCode.toString(), 10);

  await prisma.resetPasswordCodes.create({
    data: {
      userId: user.id,
      token: resetCodeCrypted,
      expirationTime: new Date(Date.now() + 60 * 60 * 1000), //* 1 hour
    },
  });

  await sendEmail(
    email,
    "🔒 Password Reset 🔒",
    resetPasswordHTML(user.full_name, resetCode)
  );

  return res.status(200).json({ message: "Reset link sent." });
};

export const confirmResetPassword = async (req, res) => {
  const { newPassword, code, email } = req.body;

  if (!newPassword || !code || !email) {
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

  const resetCode = await prisma.resetPasswordCodes.findFirst({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (!resetCode) {
    return res.status(404).json({ message: "Reset code not found." });
  }

  const isCodeValid = await bcrypt.compare(code, resetCode.token);

  if (!isCodeValid) {
    return res.status(401).json({ message: "Invalid reset code." });
  }

  if (resetCode.expirationTime < new Date()) {
    return res.status(401).json({ message: "Reset code expired." });
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      password: hashedPassword,
    },
  });

  await prisma.resetPasswordCodes.delete({
    where: {
      id: resetCode.id,
    },
  });

  return res.status(200).json({ message: "Password changed." });
};
