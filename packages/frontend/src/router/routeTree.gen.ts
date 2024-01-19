import { Route as rootRoute } from './routes/__root'
import { Route as ProfileImport } from './routes/profile'
import { Route as MenuImport } from './routes/menu'
import { Route as LoginImport } from './routes/login'
import { Route as WsImport } from './routes/_ws'
import { Route as WsMenuMultiplayerImport } from './routes/_ws.menu-multiplayer'
import { Route as WsLobbiesImport } from './routes/_ws.lobbies'
import { Route as WsCreateLobbyImport } from './routes/_ws.create-lobby'
import { Route as WsLobbyLobbyIdImport } from './routes/_ws.lobby.$lobbyId'

const ProfileRoute = ProfileImport.update({
  path: '/profile',
  getParentRoute: () => rootRoute,
} as any)

const MenuRoute = MenuImport.update({
  path: '/menu',
  getParentRoute: () => rootRoute,
} as any)

const LoginRoute = LoginImport.update({
  path: '/login',
  getParentRoute: () => rootRoute,
} as any)

const WsRoute = WsImport.update({
  id: '/_ws',
  getParentRoute: () => rootRoute,
} as any)

const WsMenuMultiplayerRoute = WsMenuMultiplayerImport.update({
  path: '/menu-multiplayer',
  getParentRoute: () => WsRoute,
} as any)

const WsLobbiesRoute = WsLobbiesImport.update({
  path: '/lobbies',
  getParentRoute: () => WsRoute,
} as any)

const WsCreateLobbyRoute = WsCreateLobbyImport.update({
  path: '/create-lobby',
  getParentRoute: () => WsRoute,
} as any)

const WsLobbyLobbyIdRoute = WsLobbyLobbyIdImport.update({
  path: '/lobby/$lobbyId',
  getParentRoute: () => WsRoute,
} as any)
declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_ws': {
      preLoaderRoute: typeof WsImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      preLoaderRoute: typeof LoginImport
      parentRoute: typeof rootRoute
    }
    '/menu': {
      preLoaderRoute: typeof MenuImport
      parentRoute: typeof rootRoute
    }
    '/profile': {
      preLoaderRoute: typeof ProfileImport
      parentRoute: typeof rootRoute
    }
    '/_ws/create-lobby': {
      preLoaderRoute: typeof WsCreateLobbyImport
      parentRoute: typeof WsImport
    }
    '/_ws/lobbies': {
      preLoaderRoute: typeof WsLobbiesImport
      parentRoute: typeof WsImport
    }
    '/_ws/menu-multiplayer': {
      preLoaderRoute: typeof WsMenuMultiplayerImport
      parentRoute: typeof WsImport
    }
    '/_ws/lobby/$lobbyId': {
      preLoaderRoute: typeof WsLobbyLobbyIdImport
      parentRoute: typeof WsImport
    }
  }
}
export const routeTree = rootRoute.addChildren([
  WsRoute.addChildren([
    WsCreateLobbyRoute,
    WsLobbiesRoute,
    WsMenuMultiplayerRoute,
    WsLobbyLobbyIdRoute,
  ]),
  LoginRoute,
  MenuRoute,
  ProfileRoute,
])
