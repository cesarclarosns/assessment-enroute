import express from "express";
import { ohmValueCalculatorController } from "./ohmvaluecalculator/ohm-value-calculator.controller";
import { healthController } from "./health/health.controller";

export const apiRouter = express();

apiRouter.use("/health", healthController.router);
apiRouter.use("/ohmvaluecalculator", ohmValueCalculatorController.router);
