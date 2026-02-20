import Koa from 'koa';
import Router from '@koa/router';
import dotenv from "dotenv";
import taskRouter from "./routes/tasks";
import usersRouter from "./routes/users";
import { bodyParser } from "@koa/bodyparser";
import { dbClient } from "./lib/db";
import cors from '@koa/cors';


dotenv.config();
dbClient();
const app = new Koa();
const router = new Router();


app.use(bodyParser());
app.use(
  cors({
    origin: process.env.FRONTEND_DOMAIN,
  }),
);

app.use(router.routes()).use(router.allowedMethods());
app.use(taskRouter.routes()).use(taskRouter.allowedMethods());
app.use(usersRouter.routes()).use(usersRouter.allowedMethods());


app.listen(process.env.BACKEND_PORT, () => {
  console.log(`Server running on ${process.env.BACKEND_DOMAIN}:${process.env.BACKEND_PORT}`);
});