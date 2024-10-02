import { FC, InputHTMLAttributes, memo } from "react";
import { IInputWrapper, Input, InputWrapper } from "../atoms";

interface ITextInput
  extends IInputWrapper,
    Pick<
      InputHTMLAttributes<HTMLInputElement>,
      | "type"
      | "value"
      | "onChange"
      | "placeholder"
      | "disabled"
      | "defaultValue"
    > {}

const TextInput: FC<ITextInput> = ({
  label,
  error,
  required,
  className,
  type,
  value,
  placeholder,
  disabled,
  defaultValue,
  onChange,
}) => {
  return (
    <InputWrapper
      label={label}
      error={error}
      required={required}
      className={className}
    >
      <Input
        id={label.toLowerCase().replace(/\s+/g, "_")}
        variant={error ? "danger" : "primary"}
        type={type}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        defaultValue={defaultValue}
        onChange={onChange}
      />
    </InputWrapper>
  );
};

export default memo(TextInput);
