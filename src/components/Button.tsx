import { Button as AntButton, ButtonProps as AntButtonProps } from "antd";

export type ButtonProps = AntButtonProps;

export const Button = ({ children, ...props }: ButtonProps) => {
  return <AntButton {...props}>{children}</AntButton>;
};
