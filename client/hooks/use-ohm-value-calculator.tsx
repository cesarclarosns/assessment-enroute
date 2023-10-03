/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { AxiosError } from "axios";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useOhmValueCalculatorContext } from "./use-ohm-value-calculator-context";
import { useApi } from "./use-api";

export const useOhmValueCalculator = () => {
  const { api } = useApi();
  const { toast } = useToast();
  const { state, dispatch } = useOhmValueCalculatorContext();

  useEffect(() => {
    const getElectronicColorCodes = async () => {
      try {
        const response = await api.get(
          "/ohmvaluecalculator/electroniccolorcodes"
        );
        const electronicColorCodes = response.data;
        dispatch({
          type: "setElectronicColorCodes",
          payload: {
            electronicColorCodes,
          },
        });
      } catch (err) {
        console.log(err);
        toast({
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request",
          action: (
            <ToastAction onClick={getElectronicColorCodes} altText="Try again">
              Try again
            </ToastAction>
          ),
          variant: "destructive",
        });
      }
    };

    getElectronicColorCodes();
  }, []);

  useEffect(() => {
    const abortController = new AbortController();

    const handleSetResult = async () => {
      try {
        dispatch({
          type: "setLoadingResult",
          payload: { loadingResult: true },
        });

        const response = await api.post(
          "/ohmvaluecalculator",
          {
            bandAColor: state.bandAColor!.name,
            bandBColor: state.bandBColor!.name,
            bandCColor: state.bandCColor!.name,
            bandDColor: state.bandDColor!.name,
          },
          {
            signal: abortController.signal,
          }
        );
        const result = response.data.result;

        dispatch({
          type: "setResult",
          payload: {
            result,
          },
        });
        dispatch({
          type: "setLoadingResult",
          payload: { loadingResult: false },
        });
      } catch (err) {
        console.log(err);
        if (err instanceof AxiosError) {
          if (!err.config?.signal?.aborted) {
            toast({
              title: "Uh oh! Something went wrong.",
              description: "There was a problem with your request",
              action: (
                <ToastAction onClick={handleSetResult} altText="Try again">
                  Try again
                </ToastAction>
              ),
              variant: "destructive",
            });
          }
        } else {
          dispatch({
            type: "setLoadingResult",
            payload: { loadingResult: false },
          });
        }
      }
    };

    if (
      state.bandAColor?.name &&
      state.bandBColor?.name &&
      state.bandCColor?.name &&
      state.bandDColor?.name
    ) {
      handleSetResult();
    }

    return () => {
      abortController.abort();
    };
  }, [state.bandAColor, state.bandBColor, state.bandCColor, state.bandDColor]);
};
