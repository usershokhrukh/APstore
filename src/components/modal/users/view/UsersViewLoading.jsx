"use client"

import React from "react";
import "./view.modules.scss";

const UsersViewLoading = () => {
  return (
    <div className="view-modal__loading">
      <span className="view-modal__l-circle loading-box"></span>
      <div className="view-modal__l-box">
        <div className="view-modal__lb-left">
          <span className="view-modal__lb-boxes loading-box"></span>
          <span className="view-modal__lb-boxes loading-box"></span>
          <span className="view-modal__lb-boxes loading-box"></span>
          <span className="view-modal__lb-boxes loading-box"></span>
          <span className="view-modal__lb-boxes loading-box"></span>

        </div>
        <div className="view-modal__lb-right">
          <span className="view-modal__lb-boxes loading-box"></span>
          <span className="view-modal__lb-boxes loading-box"></span>
          <span className="view-modal__lb-boxes loading-box"></span>
          <span className="view-modal__lb-boxes loading-box"></span>
          <span className="view-modal__lb-boxes loading-box"></span>
        </div>
      </div>
    </div>
  );
};

export default UsersViewLoading;
