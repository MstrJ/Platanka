import nextAuth from "next-auth";
import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(request: NextRequestWithAuth) {
    // console.log(request.nextUrl.pathname);
    // console.log(request.nextauth.token);
    // console.log("request Role:", request.nextauth.token?.role);

    // if (request.nextUrl.pathname.startsWith("/account")) {
    //   return NextResponse.redirect("/login");
    // }

    if (
      request.nextUrl.pathname.startsWith("/dashboard") &&
      request.nextauth.token?.role !== "admin"
    ) {
      return NextResponse.rewrite(new URL("/denied", request.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);
export const config = {
  matcher: ["/dashboard", "/account", "/account/profile"],
};
