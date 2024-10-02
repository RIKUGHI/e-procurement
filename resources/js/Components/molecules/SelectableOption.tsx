import { forwardRef, useImperativeHandle, useRef } from "react";
import Select, { Props, SelectInstance, SingleValue } from "react-select";
import { IInputWrapper, InputWrapper } from "../atoms";

export interface ISelectableInputRef {
  clearValue: () => void;
}

export interface IOptions<T = any> {
  value: string;
  label: string;
  data?: T;
}

interface ISelectableOption<TData = any>
  extends Omit<IInputWrapper, "className">,
    Omit<Props<IOptions, false, any>, "defaultValue" | "onChange"> {
  wrapperClassName?: string;
  options: IOptions<TData>[];
  defaultValue?: string;
  onChange?: (v: SingleValue<IOptions<TData>>) => void;
}

const SelectableOption = forwardRef<ISelectableInputRef, ISelectableOption>(
  (
    {
      label,
      error,
      required,
      wrapperClassName,
      options,
      defaultValue,
      onChange,
      ...props
    },
    ref
  ) => {
    const selectRef = useRef<SelectInstance<IOptions>>(null);

    useImperativeHandle(ref, () => ({
      clearValue: () => {
        if (!selectRef.current) return;
        if (!selectRef.current.hasValue()) return;

        selectRef.current.clearValue();
      },
    }));

    const getDefaultValue = (): IOptions | undefined => {
      if (!defaultValue) return undefined;

      const index = options.findIndex((o) => o.value === defaultValue);

      return index === -1
        ? { value: defaultValue, label: defaultValue }
        : options[index];
    };

    return (
      <InputWrapper
        label={label}
        error={error}
        required={required}
        className={wrapperClassName}
      >
        <Select
          ref={selectRef}
          options={options}
          onChange={onChange}
          {...props}
          defaultValue={getDefaultValue()}
          styles={{
            control: (base, props) => ({
              ...base,
              height: "36px",
              borderRadius: "6px",
              background: props.isDisabled ? "#e5e7eb" : "#f3f4f6",
              border: `2px solid ${
                props.isFocused ? "#2563eb" : error ? "#dc2626" : "white"
              }`,
              transitionDuration: "150ms",
              boxShadow: "none",
              ":hover": {
                border: `2px solid ${
                  props.isFocused ? "#2563eb" : error ? "#dc2626" : "white"
                }`,
              },
            }),
            input: (styles) => ({
              ...styles,
              color: "#111827",
              "input:focus": {
                boxShadow: "none",
              },
            }),
            option: (styles, state) => ({
              ...styles,
              color: state.isSelected ? "white" : "#111827",
              background: state.isSelected
                ? "#2563eb"
                : state.isFocused
                ? "#dbeafe"
                : "white",
              opacity: state.isDisabled ? 0.5 : 1,
              ":active": {
                background: state.isDisabled ? "white" : "#93c5fd",
              },
            }),
          }}
        />
      </InputWrapper>
    );
  }
);

export default SelectableOption;
