"use client";

import React from "react";
import "./modal.modules.scss";
import {usePathname, useRouter, useSearchParams} from "next/navigation";

const GlobalModal = ({comp, setClose}) => {
  const route = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const clearSearch = () => {
    const params = new URLSearchParams(searchParams);
    const keys = Array.from(params.keys());

    keys.forEach((key) => {
      params.delete(key);
    });
    route.replace(`${pathname}?${params.toString()}`, {scroll: false});
  };
  return (
    <div className="global-modal">
      <div className="global-modal__box">
        {comp}
        <span
          onClick={() => {
            // route.push(pathname, {scroll: false});
            clearSearch();
            setClose(false);
          }}
          className="global-modal__close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 10.5858L9.17157 7.75736L7.75736 9.17157L10.5858 12L7.75736 14.8284L9.17157 16.2426L12 13.4142L14.8284 16.2426L16.2426 14.8284L13.4142 12L16.2426 9.17157L14.8284 7.75736L12 10.5858Z"></path>
          </svg>
        </span>
      </div>
    </div>
  );
};

export default GlobalModal;
