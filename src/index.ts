import { Hono } from 'hono';
import { cors } from 'hono/cors';
import linkRouter from './app/links/link';
import { env } from './config/config';
const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.use(cors());

app.route("/link", linkRouter);

app.notFound((c) => {
  return c.text("Custom 404 Message", 404);
});

const port = env.PORT || 3000;

export default {
  port,
  fetch: app.fetch,
};
