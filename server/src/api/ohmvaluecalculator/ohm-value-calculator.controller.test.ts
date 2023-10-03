import request from "supertest";
import { app } from "..";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { electronicColorCodes } from "../../db/data";
import { ElectronicColorCode } from "../../db/models/electronic-color-code.model";
import { ohmValueCalculator } from "../../libs/ohm-value-calculator";
import { EColor } from "../../shared/enums/color.enum";

describe("OhmValueCalculatorController", () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());

    await Promise.all(
      electronicColorCodes.map(async (i) => {
        await ElectronicColorCode.create(i);
      })
    );

    await ohmValueCalculator.loadElectronicColorCodes();
  });
  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  describe("POST /", () => {
    describe("Given the body is invalid", () => {
      it("Should return a 400", async () => {
        const res = await request(app).post("/api/ohmvaluecalculator").send({
          bandAColor: EColor.BLACK,
          bandBColor: EColor.BLACK,
          bandCColor: EColor.BLACK,
          bandDColor: EColor.BLACK,
        });
        expect(res.statusCode).toBe(400);
      });
    });
    describe("Given the body is valid", () => {
      it("Should return a 200 and the result", async () => {
        const res = await request(app).post("/api/ohmvaluecalculator").send({
          bandAColor: EColor.BLACK,
          bandBColor: EColor.WHITE,
          bandCColor: EColor.WHITE,
          bandDColor: EColor.GOLD,
        });
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ result: 9_000_000_000 });
      });
    });
  });

  describe("GET /electroniccolorcodes", () => {
    it("Should return a 200 and the list of electronic color codes", async () => {
      const res = await request(app).get(
        "/api/ohmvaluecalculator/electroniccolorcodes"
      );
      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBeGreaterThan(1);
    });
  });
});
