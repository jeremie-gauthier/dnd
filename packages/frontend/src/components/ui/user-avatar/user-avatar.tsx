import { Avatar, AvatarFallback, AvatarImage } from "../avatar";

type Props = {
  userName: string;
  userPictureUrl?: string;
};

export const UserAvatar = ({ userName, userPictureUrl }: Props) => {
  const userNameInitial = userName[0].toLocaleUpperCase();

  return (
    <>
      <span className="text-slate-950 font-semibold text-md truncate">
        {userName}
      </span>
      <Avatar className="size-6">
        <AvatarImage src={userPictureUrl} />
        <AvatarFallback>{userNameInitial}</AvatarFallback>
      </Avatar>
    </>
  );
};
