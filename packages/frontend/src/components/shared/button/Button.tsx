import { PropsWithChildren, ReactHTMLElement } from "react";

type ReactButtonProps = ReactHTMLElement<HTMLButtonElement>["props"];

type Props = PropsWithChildren<{
  onClick?: ReactButtonProps["onClick"];
  type: HTMLButtonElement["type"];
  disabled: ReactButtonProps["disabled"];
}>;

export const Button = ({
  children,
  type = "button",
  onClick,
  disabled,
}: Props) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="bg-amber-800 text-white p-2 rounded"
    >
      {children}
    </button>
  );
};
