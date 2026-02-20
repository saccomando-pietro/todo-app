import Router from "@koa/router";
import TasksDAO from "../dao/tasks.dao";
import { authMiddleware } from "../middlewares/authMiddleware";
import { ITasks } from "../models/tasks";

const router = new Router({ prefix: "/api/tasks" });
const tasksDAO = new TasksDAO();
router.use(authMiddleware);

router.get("/", async (ctx) => {
  const userId = ctx.state.user.id;
  const tasks = await tasksDAO.getByUserId(userId);
  if (!tasks) {
    ctx.status = 404;
    ctx.body = { error: "Tasks not found" };
  }

  ctx.body = tasks;
  ctx.status = 200;
});

router.post("/", async (ctx) => {
  let newTask = ctx.request.body as ITasks;

  if (!newTask) {
    ctx.status = 400;
    ctx.body = { error: "Title and description are required" };
    return;
  }

  newTask = {
    ...newTask,
    createdAt: new Date(),
    updatedAt: new Date(),
    completed: false,
    userId: ctx.state.user.id,
  };

  const createdTask = await tasksDAO.create(newTask);

  ctx.status = 201;
  ctx.body = createdTask;
});

router.get("/:id", async (ctx) => {
  const task = await tasksDAO.getById(ctx.params.id);
  if (!task) {
    ctx.status = 404;
    ctx.body = { error: "Task not found" };
    return;
  }

  ctx.status = 200;
  ctx.body = task;
});

router.patch("/:id", async (ctx) => {
  const { completed } = ctx.request.body as Partial<ITasks>;

  if (typeof completed !== "boolean") {
    ctx.status = 400;
    ctx.body = { error: "Field 'completed' must be a boolean" };
    return;
  }

  const updatedTask = await tasksDAO.updateCompleted(ctx.params.id, completed);

  if (!updatedTask) {
    ctx.status = 404;
    ctx.body = { error: "Task not found" };
    return;
  }

  ctx.status = 200;
  ctx.body = updatedTask;
});

export default router;
