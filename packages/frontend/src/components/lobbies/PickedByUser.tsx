import { useUser } from "../../hooks/api/user/use-user";

type Props = {
  userId: string;
};

export const PickedByUser = ({ userId }: Props) => {
  const { data: user, isLoading } = useUser(userId);

  if (!user || isLoading) {
    return <p>User is loading</p>;
  }

  return (
    <>
      <img src={user.avatarUrl} alt="" className="w-6" />
      <p className="truncate">{user.username}</p>
    </>
  );
};
