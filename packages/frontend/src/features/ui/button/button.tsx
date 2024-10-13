import clsx from "clsx";
import { PropsWithChildren, ReactHTMLElement } from "react";

const styleVariant: Readonly<Record<NonNullable<Props["variant"]>, string>> = {
  primary: "bg-primary-600 hover:bg-primary-900 text-white p-2",
  outlined:
    "border-[1px] border-primary-600 text-primary-600 p-[7px] hover:border-primary-900 hover:text-primary-900 hover:bg-primary-900 hover:bg-opacity-5",
  darkPrimary:
    "bg-primary-200 text-primary-900 hover:bg-primary-600 hover:text-white p-2",
  darkOutlined:
    "border-[1px] border-primary-200 text-primary-200 p-[7px] hover:border-primary-900 hover:text-primary-900 hover:bg-primary-200",
};

const styleVariantDisabled: Readonly<
  Record<NonNullable<Props["variant"]>, string>
> = {
  primary: "bg-black bg-opacity-10 text-black/25 p-2",
  darkPrimary: "bg-white bg-opacity-10 text-white/25 p-2",
  outlined: "border-[1px] border-black/10 text-black/25 p-[7px]",
  darkOutlined: "border-[1px] border-white/10 text-white/25 p-[7px]",
};

type ReactButtonProps = ReactHTMLElement<HTMLButtonElement>["props"];

type Props = PropsWithChildren<{
  onClick?: ReactButtonProps["onClick"];
  type?: HTMLButtonElement["type"];
  disabled?: ReactButtonProps["disabled"];
  variant?: "primary" | "outlined" | "darkOutlined" | "darkPrimary";
}>;

export const Button = ({
  children,
  type = "button",
  onClick,
  disabled,
  variant = "primary",
}: Props) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        "rounded font-medium text-sm ease-in-out duration-200 group",
        disabled ? styleVariantDisabled[variant] : styleVariant[variant],
      )}
    >
      {children}
    </button>
  );
};
