import Router from "@koa/router";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UsersDAO from "../dao/users.dao";
import { IUsers } from "../models/users";

const router = new Router({ prefix: "/api/auth" });
const usersDAO = new UsersDAO();

router.post("/register", async (ctx) => {
  const { username, email, password } = ctx.request.body as IUsers;

  if (!username || !email || !password) {
    ctx.status = 400;
    ctx.body = { error: "Tutti i campi sono obbligatori" };
    return;
  }

  const existingUser = await usersDAO.findByEmail(email);
  if (existingUser) {
    ctx.status = 409;
    ctx.body = { error: "Email già in uso" };
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await usersDAO.create({
    username,
    email,
    password: hashedPassword,
  });

  const token = jwt.sign(
    { id: newUser._id, email: newUser.email },
    process.env.JWT_SECRET as string,
    { expiresIn: "1d" },
  );

  ctx.status = 201;
  ctx.body = {
    message: "Utente registrato con successo",
    token,
    user: { id: newUser._id, username: newUser.username, email: newUser.email },
  };
});

router.post("/login", async (ctx) => {
  const { email, password } = ctx.request.body as Pick<
    IUsers,
    "email" | "password"
  >;

  if (!email || !password) {
    ctx.status = 400;
    ctx.body = { error: "Email e password sono obbligatorie" };
    return;
  }

  const user = await usersDAO.findByEmail(email);
  if (!user) {
    ctx.status = 401;
    ctx.body = { error: "Credenziali non valide" };
    return;
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    ctx.status = 401;
    ctx.body = { error: "Credenziali non valide" };
    return;
  }

  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET as string,
    { expiresIn: "1d" },
  );

  ctx.status = 200;
  ctx.body = {
    message: "Login effettuato con successo",
    token,
    user: { id: user._id, username: user.username, email: user.email },
  };
});

export default router;
