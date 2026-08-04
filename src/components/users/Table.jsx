"use client";
import React, {useContext, useEffect, useState} from "react";
import "./table.modules.scss";
import {useGetUsers} from "@/hooks/users/GetUsers";
import {errorCheck} from "@/utils/errorCheck";
import {useNotify} from "@/hooks/useNotify";
import Link from "next/link";
import {ModalContext} from "@/context/ModalContext";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import UsersModalCheck from "../modal/users/UsersModalCheck";
import TableLoading from "./TableLoading";

const Table = () => {
  const [limit, setLimit] = useState({
    page: 1,
    limit: 12
  })
  const queryString = `?page=${limit?.page}&limit=${limit?.limit}`
  const {data, error, isPending} = useGetUsers(queryString);
  // const data = null;
  // const error = null;
  // const isPending= null
  // const queryClient = useQueryClient();
  // useEffect(() => {
  //   queryClient.removeQueries({queryKey: ["users"]})
  // }, [])
  // console.log(data);
  
  const {notice} = useNotify();
  const [items, setItems] = useState([]);
  const router = useRouter();
  const pathname = usePathname();
  
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
  
  const {setComp, setClose} = useContext(ModalContext);
  const searchParams = useSearchParams();
  const [key, setKey] = useState(null);

  const openModal = (key, id) => {
    if (!key || !id)
      return notice("Something went wrong!", "error", "infinite", true);
    setKey(key);
    // const params = new URLSearchParams(searchParams.toString());
    // router.push(`?${params.toString()}`, {scroll: false});
    setComp(<UsersModalCheck />);
  };

  useEffect(() => {
    if (searchParams.size > 0 && key) {
      if (searchParams.get(key)) {
        setClose(true);
      } else {
        notice("Could not get data!", "error", "infinite", true);
      }
      setKey(null);
    }
  }, [searchParams, key]);

  return (
    <div className="table">
      <div className="table__top"></div>
      {
        data?.items?.length ? <table className="table__main">
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
            <th className="table__head-rth table__head-rth-center">More</th>
          </tr>
        </thead>
        <tbody className="table__body">
          {
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
                    <td className="table__body-rtd">{phone}</td>
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
                      <Link
                        href={{
                          pathname: `/`,
                          query: {user_view: id},
                        }}
                        scroll={false}
                        className="table__body-link"
                        onClick={() => openModal("user_view", id)}
                      >
                        <span className="table__body-span-svg">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M12.0003 3C17.3924 3 21.8784 6.87976 22.8189 12C21.8784 17.1202 17.3924 21 12.0003 21C6.60812 21 2.12215 17.1202 1.18164 12C2.12215 6.87976 6.60812 3 12.0003 3ZM12.0003 19C16.2359 19 19.8603 16.052 20.7777 12C19.8603 7.94803 16.2359 5 12.0003 5C7.7646 5 4.14022 7.94803 3.22278 12C4.14022 16.052 7.7646 19 12.0003 19ZM12.0003 16.5C9.51498 16.5 7.50026 14.4853 7.50026 12C7.50026 9.51472 9.51498 7.5 12.0003 7.5C14.4855 7.5 16.5003 9.51472 16.5003 12C16.5003 14.4853 14.4855 16.5 12.0003 16.5ZM12.0003 14.5C13.381 14.5 14.5003 13.3807 14.5003 12C14.5003 10.6193 13.381 9.5 12.0003 9.5C10.6196 9.5 9.50026 10.6193 9.50026 12C9.50026 13.3807 10.6196 14.5 12.0003 14.5Z"></path>
                          </svg>
                        </span>
                      </Link>
                    </td>
                  </tr>
                );
              },
            )
          }
        </tbody>
      </table> : !data && !isPending ? notice("Could not get products, try later!", "error", 2000, false) : <TableLoading/>
      }
      
    </div>
  );
};

export default Table;
