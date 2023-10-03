import { calculate4BandsSchema } from "../api/ohmvaluecalculator/ohm-value-calculator.schemas";
import {
  ElectronicColorCode,
  TElectronicColorCode,
} from "../db/models/electronic-color-code.model";
import { EColor } from "../shared/enums/color.enum";
import { IOhmValueCalculator } from "../shared/interfaces/ohm-valu-calculator.interface";
import { timeout } from "./utils";

export class OhmValueCalculator implements IOhmValueCalculator {
  electronicColorCodes: { [key in EColor]?: Partial<TElectronicColorCode> } =
    {};

  constructor() {}

  async loadElectronicColorCodes() {
    try {
      const electronicColorCodes = await ElectronicColorCode.find();
      electronicColorCodes.forEach((i) => {
        this.electronicColorCodes[i.name as EColor] = i;
      });
    } catch (err) {
      console.log(err);
    }
  }

  async calculateOhmValue(
    bandAColor: EColor,
    bandBColor: EColor,
    bandCColor: EColor,
    bandDColor: EColor
  ): Promise<number> {
    await calculate4BandsSchema.parseAsync({
      bandAColor,
      bandBColor,
      bandCColor,
      bandDColor,
    });

    if (!Object.keys(this.electronicColorCodes).length) {
      await this.loadElectronicColorCodes();
    }
    const a = this.electronicColorCodes[bandAColor]!.significantFigure!;
    const b = this.electronicColorCodes[bandBColor]!.significantFigure!;
    const c = this.electronicColorCodes[bandCColor]!.multiplier!;
    const d = this.electronicColorCodes[bandDColor]!.tolerancePercent!;

    return Number(`${a}${b}`) * c;
  }
}

export const ohmValueCalculator = new OhmValueCalculator();
