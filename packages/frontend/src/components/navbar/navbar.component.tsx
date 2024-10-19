import { useAuth0 } from "@auth0/auth0-react";
import { NavigationMenu, NavigationMenuList } from "../ui/navigation-menu";
import { AuthNavbar } from "./auth-navbar/auth-navbar.component";

export const Navbar = () => {
  const { isAuthenticated, user } = useAuth0();

  return (
    <NavigationMenu className="flex flex-row flex-1 max-w-6xl ml-auto justify-end p-4 pl-0">
      <NavigationMenuList>
        {isAuthenticated && user ? <AuthNavbar user={user} /> : null}
      </NavigationMenuList>
    </NavigationMenu>
  );
};
