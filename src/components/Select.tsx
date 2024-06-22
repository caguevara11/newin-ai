import { Select as AntSelect, SelectProps as AntSelectProps } from "antd";

const { Option } = AntSelect;

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends Omit<AntSelectProps<string>, "options"> {
  options: SelectOption[];
}

export const Select = ({ options, ...props }: SelectProps) => {
  return (
    <AntSelect {...props}>
      {options.map((option) => (
        <Option key={option.value} value={option.value}>
          {option.label}
        </Option>
      ))}
    </AntSelect>
  );
};
