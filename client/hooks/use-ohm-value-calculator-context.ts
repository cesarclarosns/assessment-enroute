import { OhmValueCalculatorContext } from "@/components/ohm-value-calculator/ohm-value-calculator-context";
import { useContext } from "react";

export const useOhmValueCalculatorContext = () => {
  const { state, dispatch } = useContext(OhmValueCalculatorContext);

  if (dispatch === undefined || state === undefined) {
    throw "useOhmValueCalculatorContext muse be used inside a OhmValueCalculatorContextProvider!";
  }

  return { state, dispatch };
};
