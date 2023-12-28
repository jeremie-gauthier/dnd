import { Route as rootRoute } from "./routes/__root"
import { Route as ProfileRoute } from "./routes/profile"
import { Route as MenuRoute } from "./routes/menu"
import { Route as LoginRoute } from "./routes/login"
import { Route as WsRoute } from "./routes/_ws"

declare module "@tanstack/react-router" {
  interface FileRoutesByPath {
    "/_ws": {
      parentRoute: typeof rootRoute
    }
    "/login": {
      parentRoute: typeof rootRoute
    }
    "/menu": {
      parentRoute: typeof rootRoute
    }
    "/profile": {
      parentRoute: typeof rootRoute
    }
  }
}

Object.assign(WsRoute.options, {
  id: "/ws",
  getParentRoute: () => rootRoute,
})

Object.assign(LoginRoute.options, {
  path: "/login",
  getParentRoute: () => rootRoute,
})

Object.assign(MenuRoute.options, {
  path: "/menu",
  getParentRoute: () => rootRoute,
})

Object.assign(ProfileRoute.options, {
  path: "/profile",
  getParentRoute: () => rootRoute,
})

export const routeTree = rootRoute.addChildren([
  WsRoute,
  LoginRoute,
  MenuRoute,
  ProfileRoute,
])
