import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(request: NextRequestWithAuth) {
    // if (request.nextUrl.pathname.startsWith("/account")) {
    //   return NextResponse.redirect("/login");
    // }

    if (
      request.nextUrl.pathname.startsWith("/dashboard") &&
      request.nextauth.token?.permission.role !== "admin"
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
  matcher: ["/dashboard", "/account:path*", "/account"],
};
