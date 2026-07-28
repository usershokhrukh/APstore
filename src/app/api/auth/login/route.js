import {cookies} from "next/headers";

export async function POST(request) {
  try {
    const {accessToken, refreshToken} = await request.json();
    const cookieStore = await cookies();
    cookieStore.delete("access_token", {path: "/"});
    cookieStore.delete("refresh_token", {path: "/api/auth/refresh"});
    cookieStore.set("access_token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 900,
    });
    cookieStore.set("refresh_token", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/api/auth/refresh",
      maxAge: 900,
    });
    return Response.json({success: true});
  } catch (err) {
    return Response.json({error: "Failed to store credentials"}, {status: 500});
  }
}
