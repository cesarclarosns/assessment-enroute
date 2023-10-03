import { RequestHandler, Router } from "express";
import { ohmValueCalculatorService } from "./ohm-value-calculator.service";
import { ZodError } from "zod";

class OhmValueCalculatorController {
  router = Router();

  constructor() {
    this.router.post("/", this.calculate());
    this.router.get("/electroniccolorcodes", this.getElectronicColorCodes());
  }

  calculate(): RequestHandler {
    return async (req, res) => {
      try {
        const result = await ohmValueCalculatorService.calculate(req.body);
        res.send({
          result,
        });
      } catch (err) {
        if (err instanceof ZodError) {
          res.status(400).send(err);
        } else {
          res.status(500).send(err);
        }
      }
    };
  }

  getElectronicColorCodes(): RequestHandler {
    return async (req, res) => {
      try {
        const electronicColorCodes =
          await ohmValueCalculatorService.getElectronicColorCodes();
        res.send(electronicColorCodes);
      } catch (err) {
        res.status(500).send(err);
      }
    };
  }
}

export const ohmValueCalculatorController = new OhmValueCalculatorController();
