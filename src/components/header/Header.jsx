"use client";

import React from "react";
import "./header.modules.scss";
import { useStatus } from "@/hooks/useStatus";
const Header = () => {
  const { status } = useStatus();
  return (
    <div className="header">
      <div className="header__status">
        <span className={`header__dot header__dot--${status.type}`} />
        <span>{status.text}</span>
      </div>
    </div>
  );
};

export default Header;