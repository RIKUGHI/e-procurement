import { cn } from "@/utils/common";
import { VariantProps, cva } from "class-variance-authority";
import { ButtonHTMLAttributes, forwardRef } from "react";

const buttonVariants = cva("text-sm font-semibold px-3 py-2 rounded-md", {
  variants: {
    appearance: {
      none: "",
      outlined: "border bg-white",
      solid: "text-white focus:outline-none focus:ring-2 focus:ring-offset-2",
    },
    variant: {
      none: "",
      primary: "",
      danger: "",
    },
    isDisabled: {
      false: "",
      true: "",
    },
  },
  compoundVariants: [
    /**
     * None configurations
     */
    {
      appearance: "none",
      variant: "primary",
      className: "text-blue-600",
    },
    {
      appearance: "none",
      variant: "danger",
      className: "text-red-600",
    },
    {
      appearance: "none",
      isDisabled: true,
      className: "text-black",
    },
    /**
     * Outlined configurations
     */
    {
      appearance: "outlined",
      variant: "none",
      className: "text-gray-600 border-gray-300",
    },
    {
      appearance: "outlined",
      variant: "primary",
      className: "text-blue-600 border-blue-300",
    },
    {
      appearance: "outlined",
      variant: "danger",
      className: "text-red-600 border-red-300",
    },
    {
      appearance: "outlined",
      variant: "none",
      isDisabled: false,
      className: "hover:bg-gray-50",
    },
    {
      appearance: "outlined",
      variant: "primary",
      isDisabled: false,
      className: "hover:bg-blue-50",
    },
    {
      appearance: "outlined",
      variant: "danger",
      isDisabled: false,
      className: "hover:bg-red-50",
    },
    {
      appearance: "outlined",
      isDisabled: true,
      className: "text-gray-600 border-gray-300",
    },
    /**
     * Solid configurations
     */
    {
      appearance: "solid",
      variant: "none",
      isDisabled: false,
      className: "bg-black hover:bg-gray-600 focus:ring-black",
    },
    {
      appearance: "solid",
      variant: "primary",
      isDisabled: false,
      className: "bg-blue-600 hover:bg-blue-500 focus:ring-blue-600",
    },
    {
      appearance: "solid",
      variant: "danger",
      isDisabled: false,
      className: "bg-red-600 hover:bg-red-500 focus:ring-red-600",
    },
    {
      appearance: "solid",
      isDisabled: true,
      className: "bg-gray-900",
    },
  ],
  defaultVariants: {
    appearance: "none",
    variant: "none",
    isDisabled: false,
  },
});

interface IButton
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    Omit<VariantProps<typeof buttonVariants>, "isDisabled"> {
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, IButton>(
  (
    {
      appearance,
      variant,
      loading = false,
      children,
      disabled = false,
      className,
      ...props
    },
    ref
  ) => {
    const isDisabled = loading || disabled;

    return (
      <button
        ref={ref}
        className={cn(
          buttonVariants({ appearance, variant, isDisabled, className }),
          isDisabled && "opacity-50"
        )}
        disabled={isDisabled}
        {...props}
      >
        {loading ? (
          <div className="flex justify-center">
            <svg
              className={cn("animate-spin h-5 w-5", {
                "text-gray-50": appearance === "solid",
              })}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
        ) : (
          children
        )}
      </button>
    );
  }
);

export default Button;
