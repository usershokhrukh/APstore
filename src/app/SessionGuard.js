"use client";

import { useRouter } from "next/navigation";

export default function SessionGuard() {
  const router  = useRouter();
  const first = sessionStorage.getItem("isFresh");
  if (!first) {
    const url = new URL(window.location.href);
    url.searchParams.set("fresh_session", "true");
    sessionStorage.setItem("isFresh", "true")
    window.location.href = url.toString();
    // router.push("/?fresh_session=false")
  }
  return null;
}
