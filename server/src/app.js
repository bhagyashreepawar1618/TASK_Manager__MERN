import express from "express";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin:
      process.env.CORS_ORIGIN ||
      "http://localhost:5173" ||
      "https://task-manager-mern-zmil.vercel.app/",
    credentials: true,
  }),
);

app.use(
  express.json({
    limit: "10mb",
  }),
);

//config for express to understand browser encoder
app.use(
  express.urlencoded({
    extended: true,
    limit: "10mb",
  }),
);

import Taskrouter from "./routes/tasks.routes.js";

app.use("/api/v1", Taskrouter);

export default app;
