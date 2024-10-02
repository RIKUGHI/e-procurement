import { cn } from "@/utils/common";
import { VariantProps, cva } from "class-variance-authority";
import { InputHTMLAttributes, forwardRef } from "react";

const inputVariants = cva(
  "block w-full h-9 outline-none rounded-md border-2 focus:border-blue-600 transition text-gray-900",
  {
    variants: {
      variant: {
        primary: "border-transparent",
        danger: "border-red-600",
      },
      appearance: {
        "non-icon": "px-2 bg-gray-100",
        icon: "pl-2 pr-9 shadow-md bg-white",
      },
    },
    defaultVariants: {
      variant: "primary",
      appearance: "non-icon",
    },
  }
);

interface IInput
  extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

const Input = forwardRef<HTMLInputElement, IInput>(
  ({ variant, appearance, disabled, className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          inputVariants({ variant, appearance }),
          disabled && "bg-gray-200",
          className
        )}
        disabled={disabled}
        {...props}
      />
    );
  }
);

export default Input;
