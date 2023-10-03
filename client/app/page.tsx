"use client";

import { OhmValueCalculator } from "@/components/ohm-value-calculator/ohm-value-calculator";
import { OhmValueCalculatorContextProvider } from "@/components/ohm-value-calculator/ohm-value-calculator-context";

export default function Home() {
  return (
    <div className="flex flex-col gap-5 justify-center items-center">
      <div>
        <OhmValueCalculatorContextProvider>
          <OhmValueCalculator></OhmValueCalculator>
        </OhmValueCalculatorContextProvider>
      </div>
    </div>
  );
}
