import axios from "axios";
import {cookies} from "next/headers";

export async function POST() {
  const cookieStore = await cookies();
  const currentRefreshToken = cookieStore.get("refresh_token")?.value;
  console.log(cookieStore.get("refresh_token"));
  

  if (!currentRefreshToken) {
    return Response.json({error: "Session non-existent"}, {status: 401});
  }

  try {
    const backendResponse = await axios.post(
      "https://api.magnateshop.uz/api/v1/auth/refresh",
      {refreshToken: currentRefreshToken},
    );
    if (backendResponse?.data?.statusCode == 400) {
      return Response.json({error: "Failed to get token!"}, {status: 400});
    } else {
      const data = await backendResponse.data;
      cookieStore.delete("access_token", {path: "/"});
      cookieStore.delete("refresh_token", {path: "/api/auth/refresh"});
      cookieStore.set("access_token", data.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 900,
      });

      cookieStore.set("refresh_token", data.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/api/auth/refresh",
        maxAge: 900,
      });

      return Response.json({success: true, accessToken: data.accessToken});
    }
  } catch (err) {    
    cookieStore.delete("access_token", {path: "/"});
    cookieStore.delete("refresh_token", {path: "/api/auth/refresh"});
    
    return Response.json({error: "Invalid session credentials"}, {status: 401});
  }
}
