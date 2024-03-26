import { PropsWithChildren, ReactHTMLElement } from "react";

const styleVariant: Readonly<Record<NonNullable<Props["variant"]>, string>> = {
  primary: "bg-amber-800 hover:bg-amber-700 text-white p-2",
  outlined:
    "border-[1px] border-amber-800 text-amber-800 p-[7px] hover:border-amber-700 hover:text-amber-700 hover:bg-amber-700 hover:bg-opacity-5",
};

type ReactButtonProps = ReactHTMLElement<HTMLButtonElement>["props"];

type Props = PropsWithChildren<{
  onClick?: ReactButtonProps["onClick"];
  type?: HTMLButtonElement["type"];
  disabled?: ReactButtonProps["disabled"];
  variant?: "primary" | "outlined";
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
      className={`${styleVariant[variant]} rounded font-medium text-sm ease-in-out duration-[250ms]`}
    >
      {children}
    </button>
  );
};
