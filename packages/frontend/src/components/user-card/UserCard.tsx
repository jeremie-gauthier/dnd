import { useUser } from "../../hooks/api/user/use-user";

type Props = {
  userId: string;
};

export const UserCard = ({ userId }: Props) => {
  const { data: user, isLoading } = useUser(userId);

  if (isLoading) {
    return <>User profile is loading</>;
  }

  return (
    <>
      <img src={user?.avatarUrl} alt="" className="w-32" />
      <p className="font-medium truncate">{user?.username}</p>
    </>
  );
};
