"use client";

import React, {useState} from "react";
import "./sidebar.modules.scss";
import Link from "next/link";
import Image from "next/image";
import {useRouter} from "next/navigation";
import axios from "axios";
import logo from "../../../public/images/sidebar/logo.png";
import {useNotify} from "@/hooks/useNotify";
const Sidebar = () => {
  const [drop, setDrop] = useState(false);
  const [dropCategory, setDropCategory] = useState(false);
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
            <button
              className="sidebar__btn"
              onClick={() => {
                router.replace(`/`);
              }}
            >
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
              <p className="sidebar__p">Dashboard</p>
            </button>
          </div>
          <div className="sidebar__dropdown">
            <button
              className="sidebar__btn sidebar__drop-btn"
              style={drop ? {color: "black", backgroundColor: "#fff"} : null}
              onClick={() => {
                setDrop(!drop);
                router.replace(`/products`);
              }}
            >
              <span className="sidebar__btn-box">
                <svg
                  className="sidebar__icon"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M4.5 7.65311V16.3469L12 20.689L19.5 16.3469V7.65311L12 3.311L4.5 7.65311ZM12 1L21.5 6.5V17.5L12 23L2.5 17.5V6.5L12 1ZM6.49896 9.97065L11 12.5765V17.625H13V12.5765L17.501 9.97066L16.499 8.2398L12 10.8445L7.50104 8.2398L6.49896 9.97065Z"></path>
                </svg>
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
                  View
                </Link>
                <Link className="sidebar__link" href="">
                  Edit
                </Link>
              </div>
            ) : null}
          </div>
          <div className="sidebar__dropdown">
            <button
              className="sidebar__btn sidebar__drop-btn"
              style={
                dropCategory ? {color: "black", backgroundColor: "#fff"} : null
              }
              onClick={() => {
                setDropCategory(!dropCategory);
                router.replace(`/categories`);
              }}
            >
              <span className="sidebar__btn-box">
                <svg
                  className="sidebar__icon"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M3 4C3 3.44772 3.44772 3 4 3H10C10.5523 3 11 3.44772 11 4V10C11 10.5523 10.5523 11 10 11H4C3.44772 11 3 10.5523 3 10V4ZM3 14C3 13.4477 3.44772 13 4 13H10C10.5523 13 11 13.4477 11 14V20C11 20.5523 10.5523 21 10 21H4C3.44772 21 3 20.5523 3 20V14ZM13 4C13 3.44772 13.4477 3 14 3H20C20.5523 3 21 3.44772 21 4V10C21 10.5523 20.5523 11 20 11H14C13.4477 11 13 10.5523 13 10V4ZM13 14C13 13.4477 13.4477 13 14 13H20C20.5523 13 21 13.4477 21 14V20C21 20.5523 20.5523 21 20 21H14C13.4477 21 13 20.5523 13 20V14ZM15 5V9H19V5H15ZM15 15V19H19V15H15ZM5 5V9H9V5H5ZM5 15V19H9V15H5Z"></path>
                </svg>
                <span>Categories</span>
              </span>
              {!dropCategory ? (
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
            {dropCategory ? (
              <div className="sidebar__drop">
                <Link className="sidebar__link" href="">
                  Create
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
