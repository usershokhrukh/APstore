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
import NotFound from "../not-found/NotFound";

const Table = () => {
  const [limit, setLimit] = useState({
    page: 1,
    limit: 4,
  });
  const [search, setSearch] = useState({
    username: "",
    limit: 4,
    page: 1,
  });
  const queryString = `?page=${limit?.page}&limit=${limit?.limit || 12}`;
  const {data, error, isPending} = useGetUsers(queryString);

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
  const [openSelect, setOpenSelect] = useState(false);

  const handleLimit = (i) => {
    setLimit({
      ...limit,
      limit: i,
    });
    setSearch({
      ...search,
      username: "",
      limit: i,
    });
    setOpenSelect(false);
  };

  const handleSearch = (e) => {
    setOpenSelect(false);
    if (!e.target.value.trim()) {
      setLimit({
        ...limit,
        limit: search?.limit,
        page: search?.page,
      });
    } else {
      const total = data?.meta?.total || limit?.limit;
      setLimit({
        ...limit,
        limit: total,
        page: 1,
      });
    }
    setSearch({
      ...search,
      username: e.target.value.trim(),
    });
  };

  useEffect(() => {
    if (!search?.username?.length) {
      setSearch({
        ...search,
        limit: limit?.limit,
        page: limit?.page,
      });
    }
  }, [limit]);
  const [metaList, setMetaList] = useState([]);

  const [meta, setMeta] = useState(null);
  useEffect(() => {
    if (data?.meta) {
      setMeta(data?.meta);
    }
  }, [data]);

  useEffect(() => {
    if (meta?.totalPages) {
      if (meta?.totalPages >= 3) {
        setMetaList([1, 2, 3]);
      } else if (meta?.totalPages == 2) {
        setMetaList([1, 2]);
      } else if (meta?.totalPages == 1) {
        setMetaList([1]);
      }
    }
  }, [meta]);
  const handleNextPage = () => {
    if (meta?.hasNextPage) {
      setLimit({
        ...limit,
        page: Number(limit?.page) + 1,
      });
    }
  };
  const handlePrevPage = () => {
    if (meta?.hasPrevPage) {
      setLimit({
        ...limit,
        page: Number(limit?.page) - 1,
      });
    }
  };

  const handlePage = (e) => {
    const n = e.target?.id || limit?.page;
    setLimit({
      ...limit,
      page: n,
    });
  };

  useEffect(() => {
    if (!data && !isPending) {
      notice("Could not get products, try later!", "error", 2000, false);
    }
  }, [data, isPending]);

  return (
    <div className="table">
      <div className="table__top">
        <div className="table__t-left">
          <input
            value={search?.username}
            onChange={handleSearch}
            placeholder="Search username"
            type="text"
            className="table__t-search"
          />
          <div className="table__t-select-box">
            <span
              onClick={() => setOpenSelect(!openSelect)}
              className="table__t-select"
            >
              <span className="table__t-select-number">
                {limit?.limit == data?.meta?.total ? "all" : limit?.limit}
              </span>

              <span className="table__t-select-span">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 15.0006L7.75732 10.758L9.17154 9.34375L12 12.1722L14.8284 9.34375L16.2426 10.758L12 15.0006Z"></path>
                </svg>
              </span>
            </span>
            <div
              className={`table__t-option-box ${openSelect ? "table__show-select" : null}`}
            >
              <span onClick={() => handleLimit(4)} className="table__t-option">
                4
              </span>
              <span onClick={() => handleLimit(8)} className="table__t-option">
                8
              </span>
              <span onClick={() => handleLimit(12)} className="table__t-option">
                12
              </span>
              <span onClick={() => handleLimit(16)} className="table__t-option">
                16
              </span>
              <span
                onClick={() => {
                  setLimit({
                    ...limit,
                    limit: data?.meta?.total,
                  });
                  setOpenSelect(false);
                }}
                className="table__t-option"
              >
                all
              </span>
            </div>
          </div>
        </div>
        <div className="table__t-pagination">
          <button
            className={`table__tpag-left-right table__tpag-left ${meta?.hasPrevPage ? "table__tpag-media" : "table__tpag-block"}`}
            onClick={handlePrevPage}
          >
            <span className="table__tpag-btnspan">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M11.8284 12.0005L14.6569 14.8289L13.2426 16.2431L9 12.0005L13.2426 7.75781L14.6569 9.17203L11.8284 12.0005Z"></path>
              </svg>
            </span>
            Prev
          </button>
          <div className="table__tpag-center">
            {metaList?.map((item) => (
              <span
              key={item}
                onClick={handlePage}
                id={`${item}`}
                className={`table__t-pag-nbers ${meta?.page == item ? "table__t-pag-active" : ""}`}
              >
                {item || "None"}
              </span>
            ))}
            {meta?.totalPages > 3 ? (
              <>
                <span className="table__t-pag-nbers-dot">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M4.5 10.5C3.675 10.5 3 11.175 3 12C3 12.825 3.675 13.5 4.5 13.5C5.325 13.5 6 12.825 6 12C6 11.175 5.325 10.5 4.5 10.5ZM19.5 10.5C18.675 10.5 18 11.175 18 12C18 12.825 18.675 13.5 19.5 13.5C20.325 13.5 21 12.825 21 12C21 11.175 20.325 10.5 19.5 10.5ZM12 10.5C11.175 10.5 10.5 11.175 10.5 12C10.5 12.825 11.175 13.5 12 13.5C12.825 13.5 13.5 12.825 13.5 12C13.5 11.175 12.825 10.5 12 10.5Z"></path>
                  </svg>
                </span>

                <span
                  onClick={handlePage}
                  id={`${meta?.totalPages}`}
                  className={`table__t-pag-nbers ${meta?.page == meta?.totalPages ? "table__t-pag-active" : ""}`}
                >
                  {meta?.totalPages || "None"}
                </span>
              </>
            ) : null}
          </div>
          <button
            className={`table__tpag-left-right table__tpag-right ${meta?.hasNextPage ? "table__tpag-media" : "table__tpag-block"}`}
            onClick={handleNextPage}
          >
            Next
            <span className="table__tpag-btnspan">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12.1717 12.0005L9.34326 9.17203L10.7575 7.75781L15.0001 12.0005L10.7575 16.2431L9.34326 14.8289L12.1717 12.0005Z"></path>
              </svg>
            </span>
          </button>
        </div>
      </div>
      {data?.items?.length ? (
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
              <th className="table__head-rth table__head-rth-center">More</th>
            </tr>
          </thead>
          <tbody className="table__body">
            {data?.items?.map(
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
                if (
                  username
                    .toLowerCase()
                    .includes(`${search?.username?.toLowerCase()}`)
                ) {
                  return (
                    <tr
                      key={id}
                      className="table__body-r table__body-r-animate"
                    >
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
                }
              },
            )}
          </tbody>
        </table>
      ) : !data && isPending ? (
        <TableLoading />
      ) : null}
    </div>
  );
};

export default Table;
