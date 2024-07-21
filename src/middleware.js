import { NextResponse } from "next/server";

export function middleware(request) {
  const path = request.nextUrl.pathname;
  const isPublicPath = path === "/signin" || path === "/signup";
  const token = request.cookies.get("token")?.value || "";

  if (token && isPublicPath)
    return NextResponse.redirect(new URL("/", request.url));

  if (!token && !isPublicPath)
    return NextResponse.redirect(new URL("/signin", request.url));
}

export const config = {
  matcher: ["/", "/signin", "/signup"],
};
