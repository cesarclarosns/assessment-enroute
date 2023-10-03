import { createContext, useReducer, Dispatch } from "react";
import {
  TState,
  reducer,
  initialState,
  TAction,
} from "./ohm-value-calculator-reducer";

export const OhmValueCalculatorContext = createContext<{
  state: TState | undefined;
  dispatch: Dispatch<TAction> | undefined;
}>({
  state: undefined,
  dispatch: undefined,
});

export const OhmValueCalculatorContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <OhmValueCalculatorContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </OhmValueCalculatorContext.Provider>
  );
};
