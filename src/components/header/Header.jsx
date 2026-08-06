"use client";

import React, { useContext, useState } from "react";
import "./header.modules.scss";
import { StatusContext } from "@/context/StatusContext";
import { usePathname } from "next/navigation";
const Header = () => {
  const [status, setStatus] = useContext(StatusContext)  
  const pathname = usePathname();
  return (
    <div className="header">
      <div className="header__path">
        <p className="header__title">{pathname == "/products"? ("Product"): pathname=="/"? ("Dashboard"):("Categories")}</p>
      </div>
      <div className="header__status">
        <span >{status.text}</span>
        <span className={`header__dot header__dot--${status.type}`} />
      </div>
    </div>
  );
};

export default Header;
