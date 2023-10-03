export type TColor =
  | "None"
  | "Pink"
  | "Silver"
  | "Gold"
  | "Black"
  | "Brown"
  | "Red"
  | "Orange"
  | "Yellow"
  | "Green"
  | "Blue"
  | "Violet"
  | "Gray"
  | "White";

export interface IElectronicColorCode {
  _id: string;
  name: TColor;
  code: string;
  multiplier: number;
  tolerancePercent: string;
  colorHex: string;
  significantFigure: number;
}
