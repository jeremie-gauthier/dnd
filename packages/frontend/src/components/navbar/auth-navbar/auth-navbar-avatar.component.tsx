import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";

type Props = {
  userName: string;
  userPictureUrl?: string;
};

export const AuthNavbarAvatar = ({ userName, userPictureUrl }: Props) => {
  const userNameInitial = userName[0].toLocaleUpperCase();

  return (
    <div className="flex flex-row items-center justify-end gap-x-2">
      <span className="text-slate-950 font-bold text-lg">{userName}</span>
      <Avatar>
        <AvatarImage src={userPictureUrl} />
        <AvatarFallback>{userNameInitial}</AvatarFallback>
      </Avatar>
    </div>
  );
};
