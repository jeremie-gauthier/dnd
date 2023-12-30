import { Route as rootRoute } from "./routes/__root"
import { Route as WsRoute } from "./routes/ws"
import { Route as ProfileRoute } from "./routes/profile"
import { Route as MenuRoute } from "./routes/menu"
import { Route as LoginRoute } from "./routes/login"

declare module "@tanstack/react-router" {
  interface FileRoutesByPath {
    "/login": {
      parentRoute: typeof rootRoute
    }
    "/menu": {
      parentRoute: typeof rootRoute
    }
    "/profile": {
      parentRoute: typeof rootRoute
    }
    "/ws": {
      parentRoute: typeof rootRoute
    }
  }
}

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

Object.assign(WsRoute.options, {
  path: "/ws",
  getParentRoute: () => rootRoute,
})

export const routeTree = rootRoute.addChildren([
  LoginRoute,
  MenuRoute,
  ProfileRoute,
  WsRoute,
])
