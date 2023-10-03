import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import "@/setupTests";
import { OhmValueCalculator } from "./ohm-value-calculator";
import { OhmValueCalculatorContextProvider } from "./ohm-value-calculator-context";
import {
  BAND_COLORS,
  TBandColor,
} from "./ohm-value-calculator-band-color-select";
import { TColor } from "@/shared/interfaces/models/ElectronicColorCode.model";

describe("OhmValueCalculator", () => {
  describe("Render", () => {
    it("Should render 4 comboboxs with options", async () => {
      render(
        <OhmValueCalculatorContextProvider>
          <OhmValueCalculator></OhmValueCalculator>
        </OhmValueCalculatorContextProvider>
      );
      const user = userEvent.setup();

      const comboboxs = screen.getAllByRole("combobox");
      expect(comboboxs.length).toBe(4);

      const combobox = comboboxs[0];
      await user.click(combobox);

      const options = screen.getAllByRole("option");
      expect(options.length).toBeGreaterThan(1);
    });

    it("Should render valid options for bandAColor", async () => {
      render(
        <OhmValueCalculatorContextProvider>
          <OhmValueCalculator></OhmValueCalculator>
        </OhmValueCalculatorContextProvider>
      );
      const user = userEvent.setup();

      const combobox = screen.getByRole("combobox", { name: "bandAColor" });
      await user.click(combobox);

      BAND_COLORS.bandAColor.forEach((color) => {
        const regex = new RegExp(color, "i");
        expect(screen.getByRole("option", { name: regex })).toBeInTheDocument();
      });
    });
  });

  describe("Behavior", () => {
    it("Should display a result when all the colors for the color bands are selected", async () => {
      // Select the colors
      render(
        <OhmValueCalculatorContextProvider>
          <OhmValueCalculator></OhmValueCalculator>
        </OhmValueCalculatorContextProvider>
      );
      const user = userEvent.setup();

      const bands: [TBandColor, TColor][] = [
        ["bandAColor", "Black"],
        ["bandBColor", "Black"],
        ["bandCColor", "Black"],
        ["bandDColor", "None"],
      ];

      for (const [band, color] of bands) {
        // console.log({ band, color });
        const combobox = screen.getByRole("combobox", { name: band });
        // console.log("combobox:", combobox.outerHTML);
        await user.click(combobox);
        const regex = new RegExp(color, "i");
        await user.click(screen.getByRole("option", { name: regex }));
      }

      waitFor(() => {
        const result = screen.getByLabelText("result");
        expect(result.innerHTML).toHaveTextContent("0.0");
      });
    });
  });
});
