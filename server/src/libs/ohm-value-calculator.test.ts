import supertest from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { OhmValueCalculator } from "./ohm-value-calculator";
import { electronicColorCodes } from "../db/data";
import { ElectronicColorCode } from "../db/models/electronic-color-code.model";
import { EColor } from "../shared/enums/color.enum";
import { ZodError } from "zod";

describe("OhmValueCalculator", () => {
  let ohmValueCalculator: OhmValueCalculator;

  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());

    await Promise.all(
      electronicColorCodes.map(async (i) => {
        await ElectronicColorCode.create(i);
      })
    );

    ohmValueCalculator = new OhmValueCalculator();
    await ohmValueCalculator.loadElectronicColorCodes();
  });
  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  describe("loadElectronicColorCodes", () => {
    describe("Given the data is loaded", () => {
      it("Should have data loaded", () => {
        expect(
          Object.values(ohmValueCalculator.electronicColorCodes).length
        ).toBeGreaterThan(0);
      });
    });
  });

  describe("calculateOhmValue", () => {
    describe("Given the inputs are correct", () => {
      it("Should return 9.9", async () => {
        const result = await ohmValueCalculator.calculateOhmValue(
          EColor.WHITE,
          EColor.WHITE,
          EColor.GOLD,
          EColor.GOLD
        );
        expect(result).toBe(9.9);
      });

      it("Should return 9_000_000_000", async () => {
        const result = await ohmValueCalculator.calculateOhmValue(
          EColor.BLACK,
          EColor.WHITE,
          EColor.WHITE,
          EColor.GOLD
        );
        expect(result).toBe(9_000_000_000);
      });
    });

    describe("Given the inputs are invalid", () => {
      it("Should throw ZodError", async () => {
        expect(() =>
          ohmValueCalculator.calculateOhmValue(
            EColor.BLACK,
            EColor.BLACK,
            EColor.BLACK,
            EColor.BLACK
          )
        ).rejects.toThrow(ZodError);
      });
    });
  });
});
