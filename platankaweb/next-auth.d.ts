// module augmentation
import { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      first_name: string;
      last_name: string;
      permission: Permission;
      email: string;
      token: string;
    } & DefaultSession;
  }
  interface Permission {
    role: string;
    level: number;
  }
  interface User extends DefaultUser {
    permission: {
      role: string;
      level: number;
    };
    email: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    permission: {
      role: string;
      level: number;
    };
  }
}
