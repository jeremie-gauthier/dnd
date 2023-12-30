interface User {
  id: string;
}

declare global {
  namespace Express {
    interface Request {
      user: Readonly<User>;
    }
  }
}

export default {};
