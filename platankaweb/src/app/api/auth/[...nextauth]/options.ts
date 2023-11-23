import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { GoogleProfile } from "next-auth/providers/google";
import { LoginUser, NewUser, User } from "@/types/user";
import Get from "@/utilities/Get";
import Patch from "@/utilities/Patch";
import Post from "@/utilities/Post";

export const options: NextAuthOptions = {
  pages: {
    signIn: "/account/login",
    error: "/auth/error",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,

      async profile(profile: GoogleProfile): Promise<any> {
        const obj: User | null = await Get<User>({
          urlEnd: `Accounts/${profile.email}`,
        });

        if (obj != null) {
          await Patch(`Accounts/LoginByProviders/${obj.email}`);
          await Patch(`Accounts/Provider?email=${obj.email}&provider=GOOGLE`);
          return {
            first_name: obj?.first_Name,
            last_name: obj?.last_Name,
            permission: {
              role: obj.permission.role,
              level: obj.permission.level,
            },
            id: obj?._Id,
            email: obj?.email,
          };
        } else {
          const username = profile.name.split(" ");
          const tempdata: NewUser = {
            email: profile.email,
            first_Name: username[0],
            last_Name: username[1] ?? " ",
            password: "",
            confirmPassword: "",
            providers: ["GOOGLE"],
          };

          const link = "Accounts/CreateUser?addastemp=false";
          const res = await Post<NewUser>({
            link: link,
            data: tempdata,
            returnData: true,
          });

          const newObj: User = res?.data;

          if (!newObj) return null;
          return {
            id: newObj?._Id,
            first_name: newObj?.first_Name,
            last_name: newObj?.last_Name,
            email: newObj?.email,
            permission: {
              role: newObj?.permission.role,
              level: newObj?.permission.level,
            },
          };
        }
      },
    }),

    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          type: "email",
        },
        password: {
          type: "password",
        },
      },
      async authorize(credentials: any): Promise<any> {
        if (!credentials.email || !credentials.password) return null;
        const user: LoginUser = {
          email: credentials?.email,
          password: credentials?.password,
        };

        const obj = await Post<LoginUser>({
          link: "Accounts/Login",
          data: user,
        });

        const { error, data: acc }: { error: boolean; data: User } = obj;

        if (!error && acc) {
          return {
            id: acc?._Id,
            email: acc?.email,
            first_name: acc?.first_Name,
            last_name: acc?.last_Name,
            permission: {
              role: acc?.permission.role,
              level: acc?.permission.level,
            },
          };
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const u = user as unknown as any;
        return {
          ...token,
          id: u.id,
          permission: {
            role: u.permission.role.toLowerCase(),
            level: u.permission.level,
          },
          email: u.email,
          first_name: u.first_name,
          last_name: u.last_name,
        };
      }
      return token;
    },
    session: ({ session, token }): any => {
      session.user = token as any;
      // session.expires = "xD";
      return session;
    },
    async signIn({ user, account, profile }): Promise<any> {
      // if (account?.provider === "google") {
      //   return user;
      // }
      return true;
    },
  },
};
