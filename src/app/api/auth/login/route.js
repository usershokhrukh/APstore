import { cookies } from "next/headers";

export async function POST(request) {
  try {
    const {accessToken, refreshToken} = await request.json();
    const cookieStore = await cookies();
    cookieStore.set("access_token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 15 * 60
    })
    cookieStore.set("refresh_token", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/api/auth/refresh",
      maxAge: 7 * 24 * 60 * 60,
    })    
    return Response.json({success: true})
  } catch (err) {
    return Response.json({error: "Failed to store credentials"}, {status: 500});
  }
}
