import { cn } from "@/utils/common";
import { FC, InputHTMLAttributes, memo, useRef } from "react";
import { IconType } from "react-icons";
import { Input } from "../atoms";

interface ISimpleFormSearch
  extends Pick<
    InputHTMLAttributes<HTMLInputElement>,
    "placeholder" | "defaultValue"
  > {
  containerClassName?: string;
  cleanUpAfterSubmit?: boolean;
  icon: IconType;
  onSearch: (v: string) => void;
}

const SimpleFormSearch: FC<ISimpleFormSearch> = ({
  containerClassName,
  cleanUpAfterSubmit,
  icon: Icon,
  onSearch,
  ...props
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form
      className={cn(
        "relative flex justify-between items-center",
        containerClassName
      )}
      onSubmit={(e) => {
        e.preventDefault();
        if (onSearch && inputRef.current) onSearch(inputRef.current.value);
        if (cleanUpAfterSubmit && inputRef.current) inputRef.current.value = "";
      }}
    >
      <Input ref={inputRef} appearance="icon" {...props} />
      <button className="absolute right-2">
        <Icon size={20} className="text-blue-600" />
      </button>
    </form>
  );
};

export default memo(SimpleFormSearch);
