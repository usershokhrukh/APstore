import { StatusContext } from "@/context/StatusContext";
import React, { useContext } from "react";

export const useStatus = () => {
  const context = useContext(StatusContext);
  const [status, setStatus] = context;
  const processStatus = (text, type) => {
    const newStatus = { text, type };
    setStatus(newStatus);

    if (typeof window !== "undefined") {
      localStorage.setItem("app_status", JSON.stringify(newStatus));
    }
  };
  return {
    status,
    processStatus,
  };
};
