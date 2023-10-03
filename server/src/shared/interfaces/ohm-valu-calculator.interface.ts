import { TElectronicColorCode } from "../../db/models/electronic-color-code.model";
import { EColor } from "../enums/color.enum";

export interface IOhmValueCalculator {
  electronicColorCodes: { [key in EColor]?: Partial<TElectronicColorCode> };

  loadElectronicColorCodes: () => Promise<void>;

  /**
   * @param bandAColor The color of the first figure of component value band
   * @param bandBColor The color of the second significant figure band
   * @param bandCColor The color of the decimal multiplier band
   * @param bandDColor The color of the tolerance band
   */
  calculateOhmValue: (
    bandAColor: EColor,
    bandBColor: EColor,
    bandCColor: EColor,
    bandDColor: EColor
  ) => Promise<number>;
}
