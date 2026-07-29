"use client";

import React, { useState } from "react";
import "./sidebar.modules.scss";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import logo from "../../../public/images/sidebar/logo.png";
import { useNotify } from "@/hooks/useNotify";
const Sidebar = () => {
  const [drop, setDrop] = useState(false);
  const router = useRouter();
  const {notice} = useNotify();
  const LogOut = async () => {
    await axios.post("/api/auth/logout");
    notice("Successfully logged out!", "success", 2000, false);
    router.replace("/login");
  };
  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <div className="sidebar__word">
          <Image src={logo} alt="logo" className="sidebar__img" />
          <p className="sidebar__title">APstore</p>
        </div>
        <div className="sidebar__box">
          <p className="sidebar__p3">MAIN MENU</p>
        </div>
        <div className="sidebar__text">
          <div className="sidebar__disp">
            <button className="sidebar__btn">
              <span>
                <svg
                  className="sidebar__icon"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M21 20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V9.48907C3 9.18048 3.14247 8.88917 3.38606 8.69972L11.3861 2.47749C11.7472 2.19663 12.2528 2.19663 12.6139 2.47749L20.6139 8.69972C20.8575 8.88917 21 9.18048 21 9.48907V20ZM19 19V9.97815L12 4.53371L5 9.97815V19H19Z"></path>
                </svg>
              </span>
              <Link href="#" className="sidebar__p">
                Dashboard
              </Link>
            </button>
          </div>
          <div className="sidebar__dropdown">
            <button
              className="sidebar__btn sidebar__drop-btn"
              style={drop ? { color: "black", backgroundColor: "#fff" } : null}
              onClick={() => setDrop(!drop)}
            >
              <span className="sidebar__btn-box">
                {/* <span className="sidebar__disp"> */}
                <svg
                  className="sidebar__icon"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M21 11.6458V21C21 21.5523 20.5523 22 20 22H4C3.44772 22 3 21.5523 3 21V11.6458C2.37764 10.9407 2 10.0144 2 9V3C2 2.44772 2.44772 2 3 2H21C21.5523 2 22 2.44772 22 3V9C22 10.0144 21.6224 10.9407 21 11.6458ZM19 12.874C18.6804 12.9562 18.3453 13 18 13C16.8053 13 15.7329 12.4762 15 11.6458C14.2671 12.4762 13.1947 13 12 13C10.8053 13 9.73294 12.4762 9 11.6458C8.26706 12.4762 7.19469 13 6 13C5.6547 13 5.31962 12.9562 5 12.874V20H19V12.874ZM14 9C14 8.44772 14.4477 8 15 8C15.5523 8 16 8.44772 16 9C16 10.1046 16.8954 11 18 11C19.1046 11 20 10.1046 20 9V4H4V9C4 10.1046 4.89543 11 6 11C7.10457 11 8 10.1046 8 9C8 8.44772 8.44772 8 9 8C9.55228 8 10 8.44772 10 9C10 10.1046 10.8954 11 12 11C13.1046 11 14 10.1046 14 9Z"></path>
                </svg>
                {/* </span> */}
                <span>Products</span>
              </span>
              {!drop ? (
                <span className="sidebar__span">
                  <svg
                    width={25}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M11.9999 10.8284L7.0502 15.7782L5.63599 14.364L11.9999 8L18.3639 14.364L16.9497 15.7782L11.9999 10.8284Z"></path>
                  </svg>
                </span>
              ) : (
                <span className="sidebar__span">
                  <svg
                    width={25}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z"></path>
                  </svg>
                </span>
              )}
            </button>
            {drop ? (
              <div className="sidebar__drop">
                <Link className="sidebar__link" href="">
                  Create
                </Link>
                <Link className="sidebar__link" href="">
                  Delete
                </Link>
                <Link className="sidebar__link" href="">
                  View
                </Link>
                <Link className="sidebar__link" href="">
                  Edit
                </Link>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <div className="sidebar__bottom">
        <button className="sidebar__logOut" onClick={LogOut}>
          <svg
            className="sidebar__icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M4 18H6V20H18V4H6V6H4V3C4 2.44772 4.44772 2 5 2H19C19.5523 2 20 2.44772 20 3V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V18ZM6 11H13V13H6V16L1 12L6 8V11Z"></path>
          </svg>
          Log Out
        </button>
      </div>
    </div>
  );
};
export default Sidebar;
