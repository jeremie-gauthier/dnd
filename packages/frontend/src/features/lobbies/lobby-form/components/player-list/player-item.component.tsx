import { Icon } from "@/components/icon/Icon";
import { UserAvatar } from "@/components/ui/user-avatar/user-avatar";
import { UserAvatarSkeleton } from "@/components/ui/user-avatar/user-avatar-skeleton";
import { cn } from "@lib/utils";
import { useUser } from "./use-user";

type Props = {
  player: {
    userId: string;
    heroesSelected: Array<string>;
    isReady: boolean;
    isHost: boolean;
  };
};

export const PlayerItem = ({ player }: Props) => {
  const { data: user } = useUser(player.userId);

  return (
    <li key={player.userId} className="flex flex-row items-center gap-4">
      <div
        className={cn("size-2 rounded-full", {
          "bg-green-500": player.isReady,
          "bg-red-500": !player.isReady,
        })}
      />
      <div className="flex flex-row-reverse items-center gap-x-2 max-w-32">
        {user ? (
          <UserAvatar
            userName={user.username}
            userPictureUrl={user.avatarUrl}
          />
        ) : (
          <UserAvatarSkeleton />
        )}
      </div>
      {player.isHost ? (
        <Icon icon="crown" size="xlarge" className="fill-yellow-400" />
      ) : null}
    </li>
  );
};
