import { useState, useCallback } from "react";
export const useStatus = () => {
  const [status, setStatus] = useState(null);

  const processStatus = useCallback((text, type) => {
    const newStatus = { text, type };
    setStatus(newStatus);

    if (typeof window !== "undefined") {
      localStorage.setItem("app_status", JSON.stringify(newStatus));
    }
  }, []);

  return { status, processStatus };
};
