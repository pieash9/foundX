import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const user = {
    name: "pieash",
    token: "dwadaw",
    role: "USER",
  };

  //   const user = undefined;

  if (user?.name) {
    return NextResponse.next();
  } else {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: ["/profile", "/admin"],
};
