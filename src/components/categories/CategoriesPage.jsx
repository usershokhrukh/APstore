"use client";

import {useGetCategories} from "@/hooks/categories/GetCategories";
import React, {useContext, useEffect, useState} from "react";
import "./categories.modules.scss";
import {useNotify} from "@/hooks/useNotify";
import Link from "next/link";
import TableLoading from "../users/TableLoading";
import {ModalContext} from "@/context/ModalContext";
import CategoriesDeleteModal from "../modal/categories/delete/CategoriesDeleteModal";
import CategoriesModalEdit from "../modal/categories/edit/CategoriesModalEdit";
import CategoriesModalNew from "../modal/categories/new/CategoriesModalNew";

const CategoriesPage = () => {
  const {data, error, isPending} = useGetCategories();
  const {notice} = useNotify();
  const [search, setSearch] = useState("");
  useEffect(() => {
    if (error?.message) {
      notice(
        `Could not get categories, please try later!`,
        "error",
        3000,
        false,
      );
    } else if (!data && !isPending) {
      notice(
        `Could not get categories, please try later!`,
        "error",
        3000,
        false,
      );
    }
  }, [data, error, isPending]);

  const {setClose, setComp} = useContext(ModalContext);

  const openModal = (key, id) => {
    if ((!key || !id) && !(key === "categories_new"))
      return notice("Something went wrong!", "error", "infinite", true);
    if (key === "categories_edit") {
      setComp(<CategoriesModalEdit id={id} />);
      return setClose(true);
    } else if (key === "categories_delete") {
      setComp(<CategoriesDeleteModal id={id} />);
      return setClose(true);
    } else if (key === "categories_new") {
      setComp(<CategoriesModalNew/>)
      return setClose(true);
    }
    return notice("Something went wrong!", "error", "infinite", true);
  };
  return (
    <div className="categories">
      <div className="categories__top">
        <h2 className="categories__title">Categories</h2>
      </div>
      <div className="categories__top-form">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value.trim())}
          placeholder="Search name"
          className="categories__search-input"
          type="text"
        />
        <button onClick={() => openModal("categories_new")} className="categories__add-button">Add category</button>
      </div>
      {data?.length ? (
        <table className="table__main">
          <thead className="table__head">
            <tr className="table__head-r">
              <th className="table__head-rth">Name</th>
              <th className="table__head-rth">Slug</th>
              <th className="table__head-rth">Products</th>
              <th className="table__head-rth">Description</th>
              <th className="table__head-rth table__head-rth-center">More</th>
            </tr>
          </thead>
          <tbody className="table__body">
            {data?.map(
              ({name, id, slug, description, image, productsCount}, index) => {
                if (name.toLowerCase().includes(`${search?.toLowerCase()}`)) {
                  return (
                    <tr
                      key={id}
                      className="table__body-r table__body-r-animate"
                    >
                      <td className="table__body-rtd">
                        {image ? (
                          <img
                            width={30}
                            height={30}
                            className="table__body-img"
                            src={image}
                            alt=""
                          />
                        ) : (
                          <span className="categories__items-procount-span">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <path d="M4.5 7.65311V16.3469L12 20.689L19.5 16.3469V7.65311L12 3.311L4.5 7.65311ZM12 1L21.5 6.5V17.5L12 23L2.5 17.5V6.5L12 1ZM6.49896 9.97065L11 12.5765V17.625H13V12.5765L17.501 9.97066L16.499 8.2398L12 10.8445L7.50104 8.2398L6.49896 9.97065Z"></path>
                            </svg>
                          </span>
                        )}

                        <p className="table__body-txt">{name}</p>
                      </td>
                      <td className="table__body-rtd">{slug}</td>
                      <td className="table__body-rtd ">
                        <span className="table__body-rtd-countspan">
                          {productsCount}
                        </span>
                      </td>
                      <td className="table__body-rtd">{description}</td>
                      <td className="table__body-rtd table__body-rtd-center">
                        <Link
                          href={"#"}
                          onClick={() => openModal("categories_edit", id)}
                          scroll={false}
                          className="table__body-link"
                        >
                          <span className="table__body-span-svg">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <path d="M6.41421 15.89L16.5563 5.74785L15.1421 4.33363L5 14.4758V15.89H6.41421ZM7.24264 17.89H3V13.6473L14.435 2.21231C14.8256 1.82179 15.4587 1.82179 15.8492 2.21231L18.6777 5.04074C19.0682 5.43126 19.0682 6.06443 18.6777 6.45495L7.24264 17.89ZM3 19.89H21V21.89H3V19.89Z"></path>
                            </svg>
                          </span>
                        </Link>
                        <Link
                          href={"#"}
                          scroll={false}
                          className="table__body-link"
                          onClick={() => openModal("categories_delete", id)}
                        >
                          <span className="table__body-span-svg">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 11H11V17H9V11ZM13 11H15V17H13V11ZM9 4V6H15V4H9Z"></path>
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
      ) : !data && !isPending ? (
        <p>There is nothing to do</p>
      ) : (
        <TableLoading />
      )}
    </div>
  );
};

export default CategoriesPage;
