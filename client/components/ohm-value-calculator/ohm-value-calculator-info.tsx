import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

export const OhmValueCalculatorInfo = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>{children}</PopoverTrigger>
        <PopoverContent className="w-80">
          <div>
            <span>
              Use this calculator to find out the ohm value and tolerance based
              on resistor color codes.
            </span>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
