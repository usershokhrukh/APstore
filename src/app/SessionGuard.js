"use client";

import { useEffect} from "react";

export default function SessionGuard() {
  useEffect(() => {
    
    const first = sessionStorage.getItem("isFresh");
    if (!first) {
      const url = new URL(window.location.href);
      url.searchParams.set("fresh_session", "true");
      sessionStorage.setItem("isFresh", "true");
      window.location.href = url.toString();
    }
  }, []);

  return null;
}
