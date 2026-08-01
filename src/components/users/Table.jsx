"use client";
import React from "react";
import "./table.modules.scss";
import Image from "next/image";
const Table = () => {
  return (
    <div className="table">
      <div className="table__top"></div>
      <table className="table__main">
        <thead>
          <tr>
            <th>
              <input type="checkbox" />
            </th>
            <th>Name</th>
            <th>Role</th>
            <th>Full name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Last login at</th>
            <th>Status</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input type="checkbox" />
            </td>
            <td>
              <Image height={30} width={30} src={""} /> <p>Shoxrux</p>
            </td>
            <td>User</td>
            <td>Shoxrux Ashurov</td>
            <td>asxurovsit@gmail.com</td>
            <td>+998 99 000 79 53</td>
            <td>2026-08-01T05:14:46.784Z</td>
            <td>Active</td>
            <td>
              <span></span> <span></span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Table;
