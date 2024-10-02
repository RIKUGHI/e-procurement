import { cn } from "@/utils/common";
import { FC, PropsWithChildren } from "react";

export interface IInputWrapper {
  label: string;
  error?: null | string;
  required?: boolean;
  className?: string;
}

const InputWrapper: FC<PropsWithChildren<IInputWrapper>> = ({
  children,
  label,
  error,
  required,
  className = "sm:col-span-3",
}) => {
  return (
    <div className={cn(className, error && "animate-shacking")}>
      <label
        htmlFor={label.toLowerCase().replace(/\s+/g, "_")}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
        {required && <span className="text-red-600">*</span>}
      </label>
      <div className="mt-2">
        {children}
        {error && (
          <span className="text-xs text-red-600" aria-live="assertive">
            {error}
          </span>
        )}
      </div>
    </div>
  );
};

export default InputWrapper;
