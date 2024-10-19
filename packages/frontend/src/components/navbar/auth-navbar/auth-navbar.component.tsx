import { type User } from "@auth0/auth0-react";
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
} from "../../ui/navigation-menu";
import { AuthNavbarAvatar } from "./auth-navbar-avatar.component";
import { LogoutButton } from "./logout-button.component";

type Props = {
  user: User;
};

export const AuthNavbar = ({ user }: Props) => {
  return (
    <>
      <NavigationMenuItem>
        <NavigationMenuTrigger>
          <AuthNavbarAvatar
            userName={user.name ?? user.nickname ?? ""}
            userPictureUrl={user.picture}
          />
        </NavigationMenuTrigger>

        <NavigationMenuContent className="w-full">
          <ul>
            <li>
              <LogoutButton />
            </li>
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
    </>
  );
};
