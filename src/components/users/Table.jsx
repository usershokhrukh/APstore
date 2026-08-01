"use client";
import React, {useEffect} from "react";
import "./table.modules.scss";
import Image from "next/image";
import {useGetUsers} from "@/hooks/users/GetUsers";
import { errorCheck } from "@/utils/errorCheck";
import { useNotify } from "@/hooks/useNotify";
const Table = () => {
  const {data, error} = useGetUsers();
  const {notice} = useNotify();
  useEffect(() => {
    if (error?.message) {
      const errors = errorCheck([error?.message]);
      if (errors[1]) {
        notice(
          `Could not get users, try again later`,
          "error",
          3000,
          true,
        );
      }
    }
  }, [error]);
  
  return (
    <div className="table">
      <div className="table__top"></div>
      <table className="table__main">
        <thead className="table__head">
          <tr className="table__head-r">
            <th className="table__head-rth table__head-rth-min-width">
              <input className="table__head-input" type="checkbox" />
            </th>
            <th className="table__head-rth">Name</th>
            <th className="table__head-rth">Role</th>
            <th className="table__head-rth">Full name</th>
            <th className="table__head-rth">Email</th>
            <th className="table__head-rth">Phone</th>
            <th className="table__head-rth">Last login at</th>
            <th className="table__head-rth table__head-rth-center">Status</th>
            <th className="table__head-rth table__head-rth-center">Edit</th>
          </tr>
        </thead>
        <tbody className="table__body">
          <tr className="table__body-r">
            <td className="table__body-rtd table__body-rtd-min-width">
              <input className="table__body-input" type="checkbox" />
            </td>
            <td className="table__body-rtd">
              <Image
                className="table__body-img"
                height={30}
                width={30}
                src={""}
              />
              <p className="table__body-txt">Shoxrux</p>
            </td>
            <td className="table__body-rtd">User</td>
            <td className="table__body-rtd">Shoxrux Ashurov</td>
            <td className="table__body-rtd">asxurovsit@gmail.com</td>
            <td className="table__body-rtd">+998 99 000 79 53</td>
            <td className="table__body-rtd">2026-08-01T05:14:46.784Z</td>
            <td className="table__body-rtd table__body-rtd-center">Active</td>
            <td className="table__body-rtd table__body-rtd-center">
              <span className="table__body-span-svg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M6.41421 15.89L16.5563 5.74785L15.1421 4.33363L5 14.4758V15.89H6.41421ZM7.24264 17.89H3V13.6473L14.435 2.21231C14.8256 1.82179 15.4587 1.82179 15.8492 2.21231L18.6777 5.04074C19.0682 5.43126 19.0682 6.06443 18.6777 6.45495L7.24264 17.89ZM3 19.89H21V21.89H3V19.89Z"></path>
                </svg>
              </span>{" "}
              <span className="table__body-span-svg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M4 8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8ZM6 10V20H18V10H6ZM9 12H11V18H9V12ZM13 12H15V18H13V12ZM7 5V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V5H22V7H2V5H7ZM9 4V5H15V4H9Z"></path>
                </svg>
              </span>
            </td>
          </tr>
          <tr className="table__body-r">
            <td className="table__body-rtd table__body-rtd-min-width">
              <input className="table__body-input" type="checkbox" />
            </td>
            <td className="table__body-rtd">
              <Image
                className="table__body-img"
                height={30}
                width={30}
                src={""}
              />
              <p className="table__body-txt">Shoxrux</p>
            </td>
            <td className="table__body-rtd">User</td>
            <td className="table__body-rtd">Shoxrux Ashurov</td>
            <td className="table__body-rtd">asxurovsit@gmail.com</td>
            <td className="table__body-rtd">+998 99 000 79 53</td>
            <td className="table__body-rtd">2026-08-01T05:14:46.784Z</td>
            <td className="table__body-rtd table__body-rtd-center">Active</td>
            <td className="table__body-rtd table__body-rtd-center">
              <span className="table__body-span-svg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M6.41421 15.89L16.5563 5.74785L15.1421 4.33363L5 14.4758V15.89H6.41421ZM7.24264 17.89H3V13.6473L14.435 2.21231C14.8256 1.82179 15.4587 1.82179 15.8492 2.21231L18.6777 5.04074C19.0682 5.43126 19.0682 6.06443 18.6777 6.45495L7.24264 17.89ZM3 19.89H21V21.89H3V19.89Z"></path>
                </svg>
              </span>{" "}
              <span className="table__body-span-svg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M4 8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8ZM6 10V20H18V10H6ZM9 12H11V18H9V12ZM13 12H15V18H13V12ZM7 5V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V5H22V7H2V5H7ZM9 4V5H15V4H9Z"></path>
                </svg>
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Table;
