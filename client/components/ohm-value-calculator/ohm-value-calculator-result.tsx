import { Label } from "@radix-ui/react-label";
import { Icons } from "../ui/icons";
import { useOhmValueCalculatorContext } from "@/hooks/use-ohm-value-calculator-context";

export const OhmValueCalculatorResult = () => {
  const { state } = useOhmValueCalculatorContext();

  return (
    <div>
      <Label>
        <div className="flex gap-4">
          Resistance value{" "}
          {state.loadingResult && (
            <>
              <Icons.spinner className="h-4 w-4 animate-spin"></Icons.spinner>
            </>
          )}
        </div>
      </Label>
      {state.bandAColor &&
      state.bandBColor &&
      state.bandCColor &&
      state.bandDColor ? (
        <div aria-label={"result"}>
          <p>
            {`${state.result.toExponential(1)}`}
            <span>&#8486;</span>
            <span>&nbsp;&nbsp;</span>
            <span>&plusmn;</span>
            {`${state.bandDColor?.tolerancePercent}`}
          </p>
        </div>
      ) : (
        <span>Select the colors...</span>
      )}
    </div>
  );
};
