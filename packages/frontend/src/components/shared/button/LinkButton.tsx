import { Link } from "@tanstack/react-router";
import { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  to: string;
}>;

export const LinkButton = ({ children, to }: Props) => {
  return (
    <Link to={to} className="bg-amber-800 text-white p-2 rounded">
      {children}
    </Link>
  );
};
