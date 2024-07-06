import React from "react";
import { cn } from "@/lib/utils";

interface NumberInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  prependSymbol?: boolean;
  symbol: string;
}

const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  ({ prependSymbol = false, symbol, className, ...props }, ref) => {
    const Symbol = () => (
      <div className="bg-gray-200 text-black text-sm p-2 rounded-l-md border border-input">
        {symbol}
      </div>
    );
    return (
      <div className="flex items-center">
        {prependSymbol && <Symbol />}
        <input
          type="number"
          className={cn(
            "w-full border border-input rounded-r-md p-2 disabled:cursor-not-allowed disabled:opacity-50 text-sm focus:outline-none focus:border-input",
            className
          )
          }
          ref={ref}
          {...props}
        />
        {!prependSymbol && <Symbol />}
      </div>
    );
  }
);
NumberInput.displayName = "NumberInput";
export default NumberInput;