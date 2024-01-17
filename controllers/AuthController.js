import prisma from "../DB/db.config";

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
  await prisma.user.create({
    data: {
      login: login,
      email: email,
      password: hashedPassword,
      full_name: full_name,
    },
  });
  return res.status(201).json({ message: "Registration successful!" });
};

export const login = async (req, res) => {
  const { login, password } = req.body;
  if (!login || !password) {
    return res.status(400).json({ message: "Missing parameters." });
  }
};
