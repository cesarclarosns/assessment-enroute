import express from "express";
import { apiRouter } from "./router";
import { corsMiddleware } from "./middlewares/cors.middleware";
import { loggerMiddleware } from "./middlewares/logger.middleware";

export const app = express();

app.use(express.json());
app.use(loggerMiddleware());
app.use(corsMiddleware());

app.use("/api", apiRouter);
