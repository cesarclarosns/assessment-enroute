"use client";

import {
  IElectronicColorCode,
  TColor,
} from "@/shared/interfaces/models/ElectronicColorCode.model";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";
import { TActionType } from "./ohm-value-calculator-reducer";
import { useOhmValueCalculatorContext } from "@/hooks/use-ohm-value-calculator-context";

export type TBandColor =
  | "bandAColor"
  | "bandBColor"
  | "bandCColor"
  | "bandDColor";
type TBandColors = {
  bandAColor: TColor[];
  bandBColor: TColor[];
  bandCColor: TColor[];
  bandDColor: TColor[];
};

export const BAND_COLORS: TBandColors = {
  bandAColor: [
    "Black",
    "Brown",
    "Red",
    "Orange",
    "Yellow",
    "Green",
    "Blue",
    "Violet",
    "Gray",
    "White",
  ],
  bandBColor: [
    "Black",
    "Brown",
    "Red",
    "Orange",
    "Yellow",
    "Green",
    "Blue",
    "Violet",
    "Gray",
    "White",
  ],
  bandCColor: [
    "Pink",
    "Silver",
    "Gold",
    "Black",
    "Brown",
    "Red",
    "Orange",
    "Yellow",
    "Green",
    "Blue",
    "Violet",
    "Gray",
    "White",
  ],
  bandDColor: [
    "None",
    "Silver",
    "Gold",
    "Brown",
    "Red",
    "Orange",
    "Yellow",
    "Green",
    "Blue",
    "Violet",
    "Gray",
  ],
};

const LightColors: TColor[] = [
  "None",
  "Silver",
  "Yellow",
  "White",
  "Gold",
  "Orange",
];

export const OhmValueCalculatorBandColorSelect = ({
  bandColor,
  actionType,
}: {
  bandColor: TBandColor;
  actionType: TActionType;
}) => {
  const { state, dispatch } = useOhmValueCalculatorContext();
  const [electronicColorCodes, setElectronicColorCodes] = useState<
    IElectronicColorCode[]
  >([]);
  const [label, setLabel] = useState("");

  useEffect(() => {
    setElectronicColorCodes(
      state.electronicColorCodes.filter((i) => {
        return BAND_COLORS[bandColor].includes(i.name);
      })
    );

    if (bandColor == "bandAColor") setLabel("Band A (1st Significant Digit)");
    if (bandColor == "bandBColor") setLabel("Band B (2nd Significant Digit)");
    if (bandColor == "bandCColor") setLabel("Band C (Multiplier)");
    if (bandColor == "bandDColor") setLabel("Band D (Tolerance)");
  }, [state.electronicColorCodes, bandColor]);

  const handleOnValueChange = (e: string) => {
    const electronicColorCode = electronicColorCodes.find((i) => i.name == e);
    dispatch({
      type: actionType,
      payload: {
        [bandColor]: electronicColorCode,
      },
    });
  };

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={bandColor}>{label}</Label>
      <Select onValueChange={(e) => handleOnValueChange(e)}>
        <SelectTrigger
          style={{
            ...(state[bandColor] && {
              backgroundColor: state[bandColor]?.colorHex,
              color: LightColors.includes(state[bandColor]?.name!)
                ? "black"
                : "white",
            }),
          }}
          aria-label={bandColor}
        >
          <SelectValue placeholder="Select a color" />
        </SelectTrigger>
        <SelectContent className="overflow-y-auto max-h-[15rem]">
          <SelectGroup>
            <SelectLabel>Color</SelectLabel>
            {electronicColorCodes.map((i) => {
              return (
                <SelectItem
                  key={i.name}
                  value={i.name}
                  style={{
                    backgroundColor: i.colorHex,
                    color: LightColors.includes(i.name) ? "black" : "white",
                  }}
                  aria-label={i.name}
                >
                  {i.name}&nbsp;
                  {(bandColor == "bandAColor" || bandColor == "bandBColor") && (
                    <span>({i.significantFigure})</span>
                  )}
                  {bandColor == "bandCColor" && (
                    <span>(x{`${i.multiplier.toExponential(1)}`})</span>
                  )}
                  {bandColor == "bandDColor" && (
                    <span>
                      (&plusmn;
                      {`${i.tolerancePercent}`})
                    </span>
                  )}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
