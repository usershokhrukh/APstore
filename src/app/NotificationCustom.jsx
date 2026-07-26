"use client";

import React, {useEffect, useRef, useState} from "react";
import {Providers} from "./provides";
import {ErrorContext} from "@/context/ErrorContext";
const NotificationCustom = ({children}) => {
  const [error, setError] = useState({
    text: "",
  });

  const [errorClose, setErrorClose] = useState(false);
  const [noticeSVG, setNoticeSVG] = useState(
    <svg
      className="error__span-error"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11 11V17H13V11H11ZM11 7V9H13V7H11Z"></path>
    </svg>,
  );
  const errorTimerRef = useRef(null);

  useEffect(() => {
    if (error.text?.trim().length) {
      setErrorClose(true);
      if (errorTimerRef.current) {
        clearTimeout(errorTimerRef.current);
      }
      errorTimerRef.current = setTimeout(() => {
        setErrorClose(null);
      }, 5000);
    } else if (errorClose != false) {
      setErrorClose(null);
    }
  }, [error]);

  useEffect(() => {
    return () => {
      if (errorTimerRef.current) clearTimeout(errorTimerRef.current);
    };
  }, []);
  return (
    <ErrorContext.Provider value={[setError, setNoticeSVG]}>
      <Providers>
        <span
          className={`error__span-wrap ${errorClose ? "animate-notify" : errorClose == false ? "error__none" : "animate-notify-close"}`}
        >
          <span className="error__span">
            {noticeSVG}
            <span className="error__span-text">{error.text}</span>
          </span>
        </span>
        {children}
      </Providers>
    </ErrorContext.Provider>
  );
};

export default NotificationCustom;
