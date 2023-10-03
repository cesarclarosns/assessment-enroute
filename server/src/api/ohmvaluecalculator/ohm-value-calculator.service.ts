import { ohmValueCalculator } from "../../libs/ohm-value-calculator";
import {
  ElectronicColorCode,
  TElectronicColorCode,
} from "../../db/models/electronic-color-code.model";
import { EColor } from "../../shared/enums/color.enum";
import { calculate4BandsSchema } from "./ohm-value-calculator.schemas";

class OhmValueCalculatorService {
  async calculate(bands: {
    bandAColor: EColor;
    bandBColor: EColor;
    bandCColor: EColor;
    bandDColor: EColor;
  }): Promise<number> {
    return await ohmValueCalculator.calculateOhmValue(
      bands.bandAColor,
      bands.bandBColor,
      bands.bandCColor,
      bands.bandDColor
    );
  }

  async getElectronicColorCodes(): Promise<Partial<TElectronicColorCode[]>> {
    const electricColorCodes = await ElectronicColorCode.find({}).sort({
      name: 1,
    });
    return electricColorCodes!;
  }
}

export const ohmValueCalculatorService = new OhmValueCalculatorService();
