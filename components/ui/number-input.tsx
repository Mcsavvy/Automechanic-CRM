import React from "react";
import { cn } from "@/lib/utils";

interface NumberInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  prependSymbol?: boolean;
  symbol: string;
  onValueChange?: (value: number) => void;
}

const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  ({ prependSymbol = false, symbol, className, ...props }, ref) => {
    props.onValueChange = props.onValueChange || (() => {});
  
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
      let value = parseFloat(e.target.value);
      if (isNaN(value)) {
        value = 0;
      }
      if (props.max && value > (props.max as number)) {
        value = props.max as number;
      }
      if (props.min && value < (props.min as number)) {
        value = props.min as number;
      }
      props.onValueChange!(value);
    }
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
          onChange={props.onChange || handleChange}
        />
        {!prependSymbol && <Symbol />}
      </div>
    );
  }
);
NumberInput.displayName = "NumberInput";
export default NumberInput;