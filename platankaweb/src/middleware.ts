import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(request: NextRequestWithAuth) {
    if (
      request.nextUrl.pathname.startsWith("/account") &&
      !request.nextauth.token
    ) {
      return NextResponse.redirect("/login");
    }

    if (
      request.nextUrl.pathname.startsWith("/dashboard") &&
      !request.nextauth.token
    ) {
      return NextResponse.rewrite(new URL("/denied", request.url));
    }

    if (
      request.nextUrl.pathname.startsWith("/dashboard") &&
      request.nextauth.token?.permission.role !== "admin"
    ) {
      return NextResponse.rewrite(new URL("/denied", request.url));
    }
    if (request.nextUrl.pathname === "/dashboard") {
      return NextResponse.redirect(
        new URL("/dashboard/posts", request.nextUrl)
      );
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);
export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/:path*",
    "/dashboard:path*",
    "/account:path*",
    "/account",
  ],
};
