"use client";

import React, { useContext, useState } from "react";
import "./header.modules.scss";
import { StatusContext } from "@/context/StatusContext";
const Header = () => {
  const [status, setStatus] = useContext(StatusContext)  
  return (
    <div className="header">
      <div className="header__status">
        <span >{status.text}</span>
        <span className={`header__dot header__dot--${status.type}`} />
      </div>
    </div>
  );
};

export default Header;
