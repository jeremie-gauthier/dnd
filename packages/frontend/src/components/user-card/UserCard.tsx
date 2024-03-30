import { useUser } from "../../hooks/api/user/use-user";

type Props = {
  userId: string;
  size?: "xs" | "md";
};

const sizes: Readonly<Record<NonNullable<Props["size"]>, string>> = {
  xs: "w-6",
  md: "w-32",
};

export const UserCard = ({ userId, size = "md" }: Props) => {
  const { data: user, isLoading } = useUser(userId);

  if (isLoading) {
    return <>User profile is loading</>;
  }

  return (
    <>
      <img src={user?.avatarUrl} alt="" className={sizes[size]} />
      <p className="font-medium truncate">{user?.username}</p>
    </>
  );
};
