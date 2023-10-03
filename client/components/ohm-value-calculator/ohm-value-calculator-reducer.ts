import { IElectronicColorCode } from "@/shared/interfaces/models/ElectronicColorCode.model";

export type TActionType =
  | "setElectronicColorCodes"
  | "setBandAColor"
  | "setBandBColor"
  | "setBandCColor"
  | "setBandDColor"
  | "setResult"
  | "setLoadingResult";

export type TAction = {
  type: TActionType;
  payload: Partial<TState>;
};

export type TState = {
  electronicColorCodes: IElectronicColorCode[];
  bandAColor: IElectronicColorCode | null;
  bandBColor: IElectronicColorCode | null;
  bandCColor: IElectronicColorCode | null;
  bandDColor: IElectronicColorCode | null;
  result: number;
  loadingResult: boolean;
};

export const initialState: TState = {
  electronicColorCodes: [],
  bandAColor: null,
  bandBColor: null,
  bandCColor: null,
  bandDColor: null,
  result: 0,
  loadingResult: false,
};

export const reducer = (state: TState, action: TAction): TState => {
  switch (action.type) {
    case "setElectronicColorCodes":
      return {
        ...state,
        electronicColorCodes: action.payload.electronicColorCodes!,
      };
    case "setBandAColor":
      return { ...state, bandAColor: action.payload.bandAColor! };
    case "setBandBColor":
      return { ...state, bandBColor: action.payload.bandBColor! };
    case "setBandCColor":
      return { ...state, bandCColor: action.payload.bandCColor! };
    case "setBandDColor":
      return { ...state, bandDColor: action.payload.bandDColor! };
    case "setResult":
      return { ...state, result: action.payload.result! };
    case "setLoadingResult":
      return { ...state, loadingResult: action.payload.loadingResult! };
    default:
      return state;
  }
};
