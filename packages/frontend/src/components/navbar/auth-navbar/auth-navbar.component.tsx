import { UserAvatar } from "@/components/ui/user-avatar/user-avatar";
import { type User } from "@auth0/auth0-react";
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
} from "../../ui/navigation-menu";
import { LogoutButton } from "./logout-button.component";

type Props = {
  user: User;
};

export const AuthNavbar = ({ user }: Props) => {
  return (
    <>
      <NavigationMenuItem>
        <div className="relative">
          <NavigationMenuTrigger>
            <div className="flex flex-row items-center justify-end gap-x-2">
              <UserAvatar
                userName={user.name ?? user.nickname ?? ""}
                userPictureUrl={user.picture}
              />
            </div>
          </NavigationMenuTrigger>

          <NavigationMenuContent className="w-full">
            <ul>
              <li>
                <LogoutButton />
              </li>
            </ul>
          </NavigationMenuContent>
        </div>
      </NavigationMenuItem>
    </>
  );
};
