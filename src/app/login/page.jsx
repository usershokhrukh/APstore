"use client"

import React from "react";
import "./login.modules.scss";
import Image from "next/image";

const Login = () => {
  return (
    <div className="login">
      <span className="login__fix-span">
        <Image
          src={"/images/login/background-login.jpg"}
          className="login__bg"
          fill
          alt="Failed image"
        />
      </span>

      <form className="login__form">
        <h1 className="login__title">Login</h1>
        <div className="login__form-box">
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            className="login__inputs"
          />
          <label htmlFor="username" className="login__label">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M20 22H4V20C4 17.2386 6.23858 15 9 15H15C17.7614 15 20 17.2386 20 20V22ZM12 13C8.68629 13 6 10.3137 6 7C6 3.68629 8.68629 1 12 1C15.3137 1 18 3.68629 18 7C18 10.3137 15.3137 13 12 13Z"></path>
            </svg>
          </label>
        </div>
        <div className="login__form-box">
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            className="login__inputs"
          />
          <label htmlFor="password" className="login__label">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M19 10H20C20.5523 10 21 10.4477 21 11V21C21 21.5523 20.5523 22 20 22H4C3.44772 22 3 21.5523 3 21V11C3 10.4477 3.44772 10 4 10H5V9C5 5.13401 8.13401 2 12 2C15.866 2 19 5.13401 19 9V10ZM17 10V9C17 6.23858 14.7614 4 12 4C9.23858 4 7 6.23858 7 9V10H17ZM11 14V18H13V14H11Z"></path></svg>
          </label>
        </div>
        <div className="login__box">
          <input type="checkbox" className="login__check" />
          <p className="login__subtext">Remember me</p>
        </div>
        <button className="login__submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
