import {
  Schema,
  model,
  InferSchemaType,
  HydratedDocument,
  FilterQuery,
  QueryOptions,
  Document,
} from "mongoose";

const electronicColorCodeSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    code: { type: String, required: false },
    ral: { type: Number, required: false },
    colorHex: { type: String, required: true },
    significantFigure: { type: Number, required: false },
    multiplier: { type: Number, required: false },
    tolerancePercent: { type: Number, required: false },
    toleranceLetter: { type: String, required: false },
    temperatureCoefficient: { type: Number, required: false },
    temperatureLetter: { type: String, required: false },
  },
  {
    strict: false,
  }
);

export type TElectronicColorCode = HydratedDocument<
  InferSchemaType<typeof electronicColorCodeSchema>
>;
export type TElectronicColorCodeFilterQuery = FilterQuery<TElectronicColorCode>;
export type TElectronicColorCodeQueryOptions =
  QueryOptions<TElectronicColorCode>;
export const ElectronicColorCode = model(
  "ElectronicColorCode",
  electronicColorCodeSchema,
  "electronicColorCodes"
);
