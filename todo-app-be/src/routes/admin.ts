import Router from "@koa/router";
import TasksDAO from "../dao/tasks.dao";
import UsersDAO from "../dao/users.dao";
import { requireAdmin } from "../middlewares/adminMiddleware";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = new Router({ prefix: "/api/admin" });
const usersDAO = new UsersDAO();
const tasksDAO = new TasksDAO();

router.use(authMiddleware, requireAdmin);

router.get("/users", async (ctx) => {
  const users = await usersDAO.findAll();
  ctx.status = 200;
  ctx.body = { users };
});

router.delete("/users/:id", async (ctx) => {
  const deleted = await usersDAO.deleteById(ctx.params.id);
  if (!deleted) {
    ctx.status = 404;
    ctx.body = { error: "Utente non trovato" };
    return;
  }
  ctx.status = 200;
  ctx.body = { message: "Utente eliminato con successo" };
});

router.get("/tasks", async (ctx) => {
  const tasks = await tasksDAO.findAll();
  ctx.status = 200;
  ctx.body = { tasks };
});

router.delete("/tasks/:id", async (ctx) => {
  const deleted = await tasksDAO.deleteById(ctx.params.id);
  if (!deleted) {
    ctx.status = 404;
    ctx.body = { error: "Task non trovata" };
    return;
  }
  ctx.status = 200;
  ctx.body = { message: "Task eliminata con successo" };
});

export default router;
