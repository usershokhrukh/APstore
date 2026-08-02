import {cookies} from "next/headers";
import {NextResponse} from "next/server";

export async function middleware(request) {
  const cookieStore = await cookies();
  const token = request.cookies.get("access_token")?.value;
  const remember = request.cookies.get("remember")?.value;
  const isFreshActivated = request.cookies.get("isFreshActivated")?.value;
  const {pathname, searchParams} = request.nextUrl;
  const isFreshSession = searchParams.get("fresh_session");
  const hasFreshSession = searchParams.has("fresh_session");
  if (isFreshActivated && !isFreshSession) {
    if (!token) {
      if (pathname.startsWith("/login")) {
        if (searchParams.size > 0 && hasFreshSession) {
          request.nextUrl.searchParams.delete("fresh_session");
          return NextResponse.redirect(request.nextUrl);
        }
        return NextResponse.next();
      }
      return NextResponse.redirect(new URL("/login", request.url));
    } else if (pathname.startsWith("/login") && token) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    if (searchParams.size > 0 && hasFreshSession) {
      request.nextUrl.searchParams.delete("fresh_session");
      return NextResponse.redirect(request.nextUrl);
    }
    return NextResponse.next();
  } else {
    cookieStore.delete("isFreshActivated");
    if (remember === "true") {
      cookieStore.set("isFreshActivated", "true", {
        httpOnly: true,
      });
      if (!token) {
        if (pathname.startsWith("/login")) {
          if (searchParams.size > 0 && hasFreshSession) {
            request.nextUrl.searchParams.delete("fresh_session");
            return NextResponse.redirect(request.nextUrl);
          }
          return NextResponse.next();
        }
        return NextResponse.redirect(new URL("/login", request.url));
      } else if (pathname.startsWith("/login") && token) {
        return NextResponse.redirect(new URL("/", request.url));
      }
      if (searchParams.size > 0 && hasFreshSession) {
        request.nextUrl.searchParams.delete("fresh_session");
        return NextResponse.redirect(request.nextUrl);
      }
      return NextResponse.next();
    } else {
      if (pathname.startsWith("/login")) {
        if (searchParams.size > 0 && hasFreshSession) {
          request.nextUrl.searchParams.delete("fresh_session");
          return NextResponse.redirect(request.nextUrl);
        }
        return NextResponse.next();
      }
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|fonts|images|favicon.ico).*)"],
};
