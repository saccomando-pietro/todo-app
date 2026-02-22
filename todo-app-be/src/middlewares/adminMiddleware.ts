import { Context, Next } from "koa";
import UsersDAO from "../dao/users.dao";

const usersDAO = new UsersDAO();

export const requireAdmin = async (ctx: Context, next: Next) => {
  const { id } = ctx.state.user;
  const user = await usersDAO.findById(id);

  if (!user || user.role !== "admin") {
    ctx.status = 403;
    ctx.body = { error: "Accesso negato: solo gli admin possono eseguire questa operazione" };
    return;
  }

  await next();
};