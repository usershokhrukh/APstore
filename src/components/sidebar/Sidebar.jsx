"use client";

import React, { useState } from "react";
import "./sidebar.modules.scss";
import Link from "next/link";

const Sidebar = () => {
  const [drop, setDrop] = useState(false);
  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <div className="sidebar__word">
          <p className="sidebar__title">APstore</p>
        </div>
        <div className="sidebar__text">
          <Link href="#" className="sidebar__p">Product</Link>
          <div className="sidebar__dropdown">
            <button className="sidebar__btn" onClick={() => setDrop(!drop)}>
              Nimadir
              {!drop ? (
                <span className="sidebar__span"><svg 
                width={25}
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M11.9999 10.8284L7.0502 15.7782L5.63599 14.364L11.9999 8L18.3639 14.364L16.9497 15.7782L11.9999 10.8284Z"></path></svg></span>
              ) : (
                <span className="sidebar__span"><svg 
                width={25}
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z"></path></svg></span>
              )}
            </button>
            {drop ? (
              <div className="sidebar__drop">
                <Link className="sidebar__link" href="">nimadir</Link>
                <Link className="sidebar__link" href="">nimadir</Link>
                <Link className="sidebar__link" href="">nimadir</Link>
                <Link className="sidebar__link" href="">nimadir</Link>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <div className="sidebar__bottom">Something</div>
    </div>
  );
};
export default Sidebar;
