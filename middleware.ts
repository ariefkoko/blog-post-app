import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/posts")) {
    const token = request.cookies.get("gorest_token");

    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
}
