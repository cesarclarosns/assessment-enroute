"use client";

import * as React from "react";
import { OhmValueCalculatorBandColorSelect } from "./ohm-value-calculator-band-color-select";
import { OhmValueCalculatorDiagram } from "./ohm-value-calculator-diagram";
import { OhmValueCalculatorResult } from "./ohm-value-calculator-result";
import { useOhmValueCalculator } from "@/hooks/use-ohm-value-calculator";

export const OhmValueCalculator = () => {
  useOhmValueCalculator();

  return (
    <>
      <main className="flex flex-col gap-10 py-20 px-5">
        <div>
          <p className="font-bold">4 Band Resistor</p>
        </div>
        <div className="h-[150px]">
          <OhmValueCalculatorDiagram></OhmValueCalculatorDiagram>
        </div>
        <div className="flex flex-col gap-5 pt-10 pb-5">
          <OhmValueCalculatorBandColorSelect
            bandColor="bandAColor"
            actionType="setBandAColor"
          ></OhmValueCalculatorBandColorSelect>
          <OhmValueCalculatorBandColorSelect
            bandColor="bandBColor"
            actionType="setBandBColor"
          ></OhmValueCalculatorBandColorSelect>
          <OhmValueCalculatorBandColorSelect
            bandColor="bandCColor"
            actionType="setBandCColor"
          ></OhmValueCalculatorBandColorSelect>
          <OhmValueCalculatorBandColorSelect
            bandColor="bandDColor"
            actionType="setBandDColor"
          ></OhmValueCalculatorBandColorSelect>
        </div>
        <OhmValueCalculatorResult></OhmValueCalculatorResult>
      </main>
    </>
  );
};
