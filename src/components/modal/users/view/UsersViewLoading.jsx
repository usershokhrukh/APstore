import React from "react";
import "./view.modules.scss";

const UsersViewLoading = () => {
  return (
    <div className="view-modal__loading">
      <span className="view-modal__l-circle view-modal__l-animate"></span>
      <div className="view-modal__l-box">
        <div className="view-modal__lb-left">
          <span className="view-modal__lb-boxes view-modal__l-animate"></span>
          <span className="view-modal__lb-boxes view-modal__l-animate"></span>
          <span className="view-modal__lb-boxes view-modal__l-animate"></span>
          <span className="view-modal__lb-boxes view-modal__l-animate"></span>
          <span className="view-modal__lb-boxes view-modal__l-animate"></span>

        </div>
        <div className="view-modal__lb-right">
          <span className="view-modal__lb-boxes view-modal__l-animate"></span>
          <span className="view-modal__lb-boxes view-modal__l-animate"></span>
          <span className="view-modal__lb-boxes view-modal__l-animate"></span>
          <span className="view-modal__lb-boxes view-modal__l-animate"></span>
          <span className="view-modal__lb-boxes view-modal__l-animate"></span>
        </div>
      </div>
    </div>
  );
};

export default UsersViewLoading;
