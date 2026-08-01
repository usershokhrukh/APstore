"use client";

import React from "react";
import "./header.modules.scss";
import { useStatus } from "@/hooks/useStatus";
const Header = () => {
  const { status } = useStatus();
  return (
    <div className="header">
      <div className="header__status">
        <span>{status.text}</span>
        <span className={`header__dot header__dot--${status.type}`} />
      </div>
    </div>
  );
};

export default Header;
