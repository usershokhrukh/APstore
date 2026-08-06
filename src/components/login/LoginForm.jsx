"use client";
import React, {useEffect, useRef, useState} from "react";
import "./login.modules.scss";
import Image from "next/image";
import {PostLogin} from "@/hooks/login/PostLogin";
import SendNotification, {useNotify} from "@/hooks/useNotify";
import {useRouter} from "next/navigation";
import axios from "axios";
import loginBgImg from "../../../public/images/login/background-login.jpg";

const LoginForm = () => {
  const [input, setInput] = useState({
    username: "",
    password: "",
  });
  const {notice} = useNotify();
  const [remember, setRemember] = useState(false);
  const [passShow, setPassShow] = useState(false);
  const {mutate, data, error} = PostLogin();
  const router = useRouter();
  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const inputUsername = useRef(null);
  const inputPassword = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.password && !input.username) {
      return notice("Fill all inputs", "error", 2000, false);
    }
    if (!input.password && input.username) {
      inputPassword?.current?.focus();
      return notice("Filling password is necessary!", "info", 2000, false);
    } else if (input.password && !input.username) {
      inputUsername?.current?.focus();
      return notice("Filling username is necessary!", "info", 2000, false);
    }
    notice("Pending...", "info", "infinite", false);
    mutate(input);
  };

  useEffect(() => {
    if (error?.message) {
      notice(`${error?.message}`, "error", 3000, false);
    }
  }, [error]);

  const handleTokens = async ({accessToken, refreshToken}) => {
    try {
      notice("Page loading...", "info", "infinite", false)
      const cookieResponse = await axios.post("/api/auth/login", {
        accessToken,
        refreshToken,
        remember,
      });
      const cookieActive = await axios.post("/api/cookieactive");
      if (cookieResponse?.data?.success && cookieActive?.data?.success) {
        router.refresh();
      } else {
        notice(
          `${cookieResponse?.data?.error} & ${cookieActive?.data?.error}`,
          "error",
          "infinite",
          true,
        );
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (data) {
      if (data?.data?.user?.role === "admin") {
        notice("Admin has found!", "success", 2000, true);
        const {accessToken, refreshToken} = data?.data;
        handleTokens({accessToken, refreshToken});
      } else {
        notice("Could not find the admin!", "error", 5000, true);
      }
    }
  }, [data]);

  return (
    <div className="login">
      <span className="login__fix-span">
        <Image
          src={loginBgImg}
          alt="Login Background"
          fill
          priority
          className="login__bg"
        />
      </span>

      <form onSubmit={handleSubmit} className="login__form">
        <h1 className="login__title">Login</h1>
        <div className="login__form-box">
          <input
            ref={inputUsername}
            onChange={handleChange}
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
            ref={inputPassword}
            onChange={handleChange}
            type={`${passShow ? "text" : "password"}`}
            id="password"
            name="password"
            placeholder="Password"
            className="login__inputs"
          />
          <label
            onClick={() => {
              setPassShow(!passShow);
            }}
            htmlFor="password"
            className="login__label"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M19 10H20C20.5523 10 21 10.4477 21 11V21C21 21.5523 20.5523 22 20 22H4C3.44772 22 3 21.5523 3 21V11C3 10.4477 3.44772 10 4 10H5V9C5 5.13401 8.13401 2 12 2C15.866 2 19 5.13401 19 9V10ZM17 10V9C17 6.23858 14.7614 4 12 4C9.23858 4 7 6.23858 7 9V10H17ZM11 14V18H13V14H11Z"></path>
            </svg>
          </label>
        </div>
        <div className="login__box">
          <input
            checked={remember}
            onClick={() => {
              setRemember(!remember);
            }}
            type="checkbox"
            className="login__check"
          />
          <p className="login__subtext">Remember me</p>
        </div>
        <button type="submit" className="login__submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
