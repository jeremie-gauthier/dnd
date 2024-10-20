import { Skeleton } from "../skeleton";

export const UserAvatarSkeleton = () => {
  return (
    <>
      <Skeleton className="h-4 w-24" />
      <Skeleton className="rounded-full size-6" />
    </>
  );
};
