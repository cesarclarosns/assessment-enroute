"use client";

import React from "react";
import { useOhmValueCalculatorContext } from "@/hooks/use-ohm-value-calculator-context";

interface IOhmValueCalculatorDiagramProps
  extends React.SVGAttributes<HTMLOrSVGElement> {}

export const OhmValueCalculatorDiagram = ({
  ...props
}: IOhmValueCalculatorDiagramProps) => {
  const { state } = useOhmValueCalculatorContext();

  return (
    <>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 447 86"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M370.5 38.5H443C444.933 38.5 446.5 40.067 446.5 42V44C446.5 45.933 444.933 47.5 443 47.5H370.5V38.5Z"
          fill="#D9D9D9"
          stroke="black"
        />
        <path
          d="M4 38.5H80.5V47.5H4C2.067 47.5 0.5 45.933 0.5 44V42C0.5 40.067 2.067 38.5 4 38.5Z"
          fill="#D9D9D9"
          stroke="black"
        />
        {/* tube */}
        <path
          d="M135.858 4.36659L136.002 4.5H136.198H313.802H313.998L314.142 4.36659C316.729 1.96661 320.193 0.5 324 0.5H356C364.008 0.5 370.5 6.99187 370.5 15V71C370.5 79.0081 364.008 85.5 356 85.5H324C320.193 85.5 316.729 84.0334 314.142 81.6334L313.998 81.5H313.802H136.198H136.002L135.858 81.6334C133.271 84.0334 129.807 85.5 126 85.5H94C85.9919 85.5 79.5 79.0081 79.5 71V15C79.5 6.99187 85.9919 0.5 94 0.5H126C129.807 0.5 133.271 1.96661 135.858 4.36659Z"
          fill="#E7E1D8"
          stroke="black"
        />
        {/* bandAColor */}
        <path
          d="M136.5 4.5H158.5V81.5H136.5V4.5Z"
          fill={state.bandAColor?.colorHex}
          stroke="black"
        />
        {/* bandBColor */}
        <rect
          x="180.5"
          y="4.5"
          width="22"
          height="77"
          fill={state.bandBColor?.colorHex}
          stroke="black"
        />
        {/* bandCColor */}
        <rect
          x="225.5"
          y="4.5"
          width="22"
          height="77"
          fill={state.bandCColor?.colorHex}
          stroke="black"
        />
        {/* bandDColor */}
        <rect
          x="291.5"
          y="4.5"
          width="22"
          height="77"
          fill={state.bandDColor?.colorHex}
          stroke="black"
        />
      </svg>
    </>
  );
};
