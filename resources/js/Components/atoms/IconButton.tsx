import { cn } from "@/utils/common";
import { cva, VariantProps } from "class-variance-authority";
import { ButtonHTMLAttributes, FC, memo } from "react";
import { IconType } from "react-icons";

const iconVariants = cva("mx-auto", {
  variants: {
    variant: {
      blue: "text-blue-600",
      red: "text-red-600",
      green: "text-green-600",
    },
  },
});

interface IIconButton
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconVariants> {
  icon: IconType;
  isActive?: boolean;
}

const Icon: FC<IIconButton> = ({
  icon: Icon,
  isActive,
  variant,
  className,
  ...props
}) => {
  return (
    <button
      className={cn(
        "flex-auto sm:flex-none w-9 h-9 rounded-md shadow-md",
        className,
        isActive ? "bg-blue-50" : "bg-white"
      )}
      {...props}
    >
      <Icon
        size={20}
        className={cn(
          iconVariants({ variant }),
          props.disabled && "text-gray-400"
        )}
      />
    </button>
  );
};

export default memo(Icon);
