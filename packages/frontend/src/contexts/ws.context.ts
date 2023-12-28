// export type AuthUser = {
//   id: string;
//   name: string;
//   picture: string;
// };

// export type Auth = {
//   login: (user: AuthUser) => void;
//   logout: () => void;
//   status: 'loggedOut' | 'loggedIn';
//   user?: AuthUser;
// };

// export const auth: Auth = {
//   status: 'loggedOut',
//   user: undefined,
//   login: (user: AuthUser) => {
//     auth.status = 'loggedIn';
//     auth.user = user;
//   },
//   logout: () => {
//     auth.status = 'loggedOut';
//     auth.user = undefined;
//   },
// };
