import {NextResponse} from "next/server";

export function middleware(request) {
  const token = request.cookies.get("access_token")?.value;
  const {pathname} = request.nextUrl;

  if (pathname === "/login") {
    if (token) return NextResponse.redirect(new URL("/dashboard", request.url));
    return NextResponse.next();
  }

  const isProtectedRoute =  pathname.startsWith("/dashboard");
  if (!token && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (pathname === "/" && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
