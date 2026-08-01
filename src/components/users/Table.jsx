"use client";
import React, {useEffect, useState} from "react";
import "./table.modules.scss";
import {useGetUsers} from "@/hooks/users/GetUsers";
import {errorCheck} from "@/utils/errorCheck";
import {useNotify} from "@/hooks/useNotify";
import UsersModalDelete from "../modal/UsersModalDelete";
import GlobalModal from "../modal/GlobalModal";

const Table = () => {
  const {data, error, isPending, refetch} = useGetUsers();
  const {notice} = useNotify();
  const [items, setItems] = useState([]);
  useEffect(() => {
    if (data?.items) {
      const formattedItems = data.items.map((user) => ({
        id: user.id,
        checked: false,
      }));
      setItems(formattedItems);
    }
  }, [data]);

  const isAllChecked = items.length > 0 && items.every((item) => item.checked);

  const handleGlobalChange = (e) => {
    const targetChecked = e.target.checked;
    const updatedItems = items.map((item) => ({
      ...item,
      checked: targetChecked,
    }));
    setItems(updatedItems);
  };

  const handleIndividualChanges = (id) => {
    const updatedItems = items.map((item) => {
      if (item.id === id) {
        return {...item, checked: !item.checked};
      }
      return item;
    });
    setItems(updatedItems);
  };
  useEffect(() => {
    if (error?.message) {
      const errors = errorCheck([error?.message]);
      if (errors[1]) {
        notice(`Could not get users, try again later`, "error", 5000, true);
      }
    }
  }, [error]);

  const avatarDefault =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4EqrNcj9a_lNfv2gnqBCgXpM8sKQ5sHWJO0fTYCffMA&s=10";

  return (
    <div className="table">
      <div className="table__top"></div>
      <table className="table__main">
        <thead className="table__head">
          <tr className="table__head-r">
            <th className="table__head-rth table__head-rth-min-width">
              <input
                checked={isAllChecked}
                onChange={handleGlobalChange}
                className="table__head-input"
                type="checkbox"
              />
            </th>
            <th className="table__head-rth">Name</th>
            <th className="table__head-rth">Role</th>
            <th className="table__head-rth">Full name</th>
            <th className="table__head-rth">Email</th>
            <th className="table__head-rth">Phone</th>
            <th className="table__head-rth">Last login at</th>
            <th className="table__head-rth table__head-rth-center">Status</th>
            <th className="table__head-rth table__head-rth-center">Actions</th>
          </tr>
        </thead>
        <tbody className="table__body">
          {data?.items?.length ? (
            data?.items?.map(
              (
                {
                  id,
                  username,
                  email,
                  fullName,
                  phone,
                  avatar,
                  role,
                  isActive,
                  lastLoginAt,
                },
                index,
              ) => {
                const currentItem = items.find((item) => item.id === id);
                const isChecked = currentItem ? currentItem.checked : false;
                return (
                  <tr key={id} className="table__body-r table__body-r-animate">
                    <td className="table__body-rtd table__body-rtd-min-width">
                      <input
                        checked={isChecked}
                        onChange={() => handleIndividualChanges(id)}
                        className="table__body-input"
                        type="checkbox"
                      />
                    </td>
                    <td className="table__body-rtd">
                      <img
                        width={30}
                        height={30}
                        className="table__body-img"
                        src={avatar || avatarDefault}
                        alt=""
                      />
                      <p className="table__body-txt">{username}</p>
                    </td>
                    <td className="table__body-rtd">{role}</td>
                    <td className="table__body-rtd">{fullName}</td>
                    <td className="table__body-rtd">{email}</td>
                    <td className="table__body-rtd">{phone}]</td>
                    <td className="table__body-rtd">
                      {lastLoginAt || "Not logged yet"}
                    </td>
                    <td className="table__body-rtd table__body-rtd-center">
                      {isActive ? (
                        <span
                          className={`table__body-status table__body-status-active`}
                        >
                          Active
                        </span>
                      ) : (
                        <span
                          className={`table__body-status table__body-status-inactive`}
                        >
                          Inactive
                        </span>
                      )}
                    </td>
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
                );
              },
            )
          ) : data == undefined && !isPending ? (
            <span></span>
          ) : null}
        </tbody>
      </table>
      
      {/* <GlobalModal comp={<UsersModalDelete/>}/> */}
    </div>
  );
};

export default Table;
