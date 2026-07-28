import {NextResponse} from "next/server";

export function middleware(request) {
  const token = request.cookies.get("access_token")?.value;
  const {pathname} = request.nextUrl;
  if (!token) {
    if (pathname === "/login") {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/login", request.url));
  } else if(pathname === "/login" && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
