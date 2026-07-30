import { StatusContext } from "@/context/StatusContext";
import React, { useContext } from "react";

export const useStatus = () => {
  const [status, setStatus] = useContext(StatusContext);
  const processStatus = (text, type) => {
    setStatus({ text, type });
  };

  return {
    status,
    processStatus,
  };
};
