import {cookies} from "next/headers";

export async function POST() {
  try {
    const cookieStore = await cookies();
    cookieStore.set("isFreshActivated", "true", {
      httpOnly: true,
    });
    return Response.json({success: true});
  } catch (error) {
    return Response.json({error: "Failed to store credentials"}, {status: 500});
  }
}
